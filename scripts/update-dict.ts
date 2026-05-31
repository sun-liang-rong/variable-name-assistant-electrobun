/**
 * 字典维护脚本
 *
 * 功能：
 * 1. 自动扫描 scripts/dict-source-*.json 批量导入新词条
 * 2. 自动去重（中文 key 相同则覆盖）
 * 3. 自动生成排序后的 dict.ts
 *
 * 用法：
 *   bun run scripts/update-dict.ts              # 合并 source → dict.ts
 *   bun run scripts/update-dict.ts --check      # 仅检查重复，不写入
 *   bun run scripts/update-dict.ts --stats      # 显示字典统计
 *
 * 源文件格式 (scripts/dict-source-*.json):
 * {
 *   "中文词": "englishWord",
 *   "购物车": "shoppingCart",
 *   ...
 * }
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";

const projectRoot = process.cwd();
const dictPath = join(projectRoot, "src/mainview/utils/dict.ts");
const scriptsDir = join(projectRoot, "scripts");

// ===== 解析命令行参数 =====
const args = process.argv.slice(2);
const checkOnly = args.includes("--check");
const showStats = args.includes("--stats");

// ===== 读取现有字典 =====
function readCurrentDict(): Record<string, string> {
  const content = readFileSync(dictPath, "utf-8");

  // 提取 DICT 对象内容（在 export const DICT: Record<string, string> = { 和 }; 之间）
  const dictMatch = content.match(
    /export const DICT: Record<string, string> = \{([\s\S]*?)\};/
  );
  if (!dictMatch) {
    console.error("❌ 无法解析 dict.ts 中的 DICT 对象");
    process.exit(1);
  }

  const dictBody = dictMatch[1];
  const entries: Record<string, string> = {};

  // 匹配 "中文": "english" 格式的条目
  const entryRegex = /"([^"]+)"\s*:\s*"([^"]+)"/g;
  let match;
  while ((match = entryRegex.exec(dictBody)) !== null) {
    entries[match[1]] = match[2];
  }

  return entries;
}

// ===== 读取 STOP_WORDS =====
function readStopWords(): string[] {
  const content = readFileSync(dictPath, "utf-8");
  const stopMatch = content.match(
    /export const STOP_WORDS = new Set\(\[([\s\S]*?)\]\);/
  );
  if (!stopMatch) return [];

  const body = stopMatch[1];
  const words: string[] = [];
  const wordRegex = /"([^"]+)"/g;
  let match;
  while ((match = wordRegex.exec(body)) !== null) {
    words.push(match[1]);
  }
  return words;
}

// ===== 读取所有源文件（自动扫描 dict-source-*.json）=====
function readAllSources(): [string, Record<string, string>][] {
  const sources: [string, Record<string, string>][] = [];

  if (!existsSync(scriptsDir)) return sources;

  const files = readdirSync(scriptsDir).filter(
    (f) => f.startsWith("dict-source-") && f.endsWith(".json")
  ).sort();

  for (const file of files) {
    const filePath = join(scriptsDir, file);
    try {
      const content = readFileSync(filePath, "utf-8");
      const entries = JSON.parse(content);
      const count = Object.keys(entries).length;
      if (count > 0) {
        sources.push([file, entries]);
      }
    } catch (e: any) {
      console.error(`❌ 解析 ${file} 失败:`, e.message);
    }
  }

  return sources;
}

// ===== 验证英文翻译格式 =====
function isValidCamelCase(value: string): boolean {
  // 允许: camelCase, PascalCase, snake_case, 单词, 缩写
  return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value);
}

// ===== 主流程 =====
function main() {
  console.log("📖 读取现有字典...");
  const currentDict = readCurrentDict();
  const stopWords = readStopWords();
  const currentSize = Object.keys(currentDict).length;
  console.log(`   当前词条数: ${currentSize}`);

  if (showStats) {
    // 按 key 长度统计
    const byLength: Record<number, number> = {};
    for (const key of Object.keys(currentDict)) {
      const len = key.length;
      byLength[len] = (byLength[len] || 0) + 1;
    }
    console.log("\n📊 按词条长度统计:");
    for (const [len, count] of Object.entries(byLength).sort(
      ([a], [b]) => Number(a) - Number(b)
    )) {
      console.log(`   ${len}字: ${count} 词条`);
    }
    console.log(`\n   停用词数: ${stopWords.length}`);
    return;
  }

  // 读取所有源文件（自动扫描 dict-source-*.json）
  console.log("\n📥 读取源文件...");
  const sources = readAllSources();

  if (sources.length === 0) {
    console.log("   未找到源文件。请创建 scripts/dict-source-*.json 文件:");
    console.log('   例如: scripts/dict-source-web.json');
    console.log("\n   JSON 格式:");
    console.log('   { "购物车": "shoppingCart", "收藏夹": "favorites" }');
    return;
  }

  console.log(`   找到 ${sources.length} 个源文件:`);
  for (const [name, entries] of sources) {
    console.log(`   - ${name}: ${Object.keys(entries).length} 条`);
  }

  // 合并所有新词条（以现有字典为基础）
  const merged: Record<string, string> = { ...currentDict };
  let totalNew = 0;
  let totalOverride = 0;
  let totalInvalid = 0;

  for (const [sourceName, entries] of sources) {
    console.log(`   从 ${sourceName} 读取 ${Object.keys(entries).length} 条`);

    for (const [zh, en] of Object.entries(entries)) {
      // 跳过空值
      if (!zh || !en) continue;

      // 验证英文格式
      if (!isValidCamelCase(en)) {
        console.warn(
          `   ⚠️  跳过无效词条: "${zh}" → "${en}" (英文只能包含字母、数字、下划线)`
        );
        totalInvalid++;
        continue;
      }

      // 检查是否重复
      if (currentDict[zh]) {
        if (currentDict[zh] !== en) {
          console.log(
            `   🔄 覆盖: "${zh}" → "${currentDict[zh]}" 变更为 "${en}"`
          );
        }
        totalOverride++;
      } else {
        totalNew++;
      }

      merged[zh] = en;
    }
  }

  console.log(`\n📈 变更统计:`);
  console.log(`   新增: ${totalNew} 条`);
  console.log(`   覆盖: ${totalOverride} 条`);
  console.log(`   跳过(无效): ${totalInvalid} 条`);
  console.log(`   合并后总词条: ${Object.keys(merged).length} 条`);

  if (checkOnly) {
    console.log("\n✅ 检查完成 (--check 模式，未写入)");
    return;
  }

  // 写入 dict.ts
  console.log("\n✏️  生成 dict.ts...");

  // 按 key 长度排序（长的在前，用于注释），然后按字母序
  const sortedEntries = Object.entries(merged).sort(([a], [b]) => {
    if (a.length !== b.length) return b.length - a.length;
    return a.localeCompare(b, "zh-CN");
  });

  // 按长度分组输出
  const groups: Record<number, [string, string][]> = {};
  for (const entry of sortedEntries) {
    const len = entry[0].length;
    if (!groups[len]) groups[len] = [];
    groups[len].push(entry);
  }

  let dictBody = "";
  const lengths = Object.keys(groups)
    .map(Number)
    .sort((a, b) => a - b);

  for (const len of lengths) {
    const entries = groups[len];
    // 按中文拼音/字母排序
    entries.sort(([a], [b]) => a.localeCompare(b, "zh-CN"));

    if (dictBody) dictBody += "\n";
    for (const [zh, en] of entries) {
      dictBody += `  "${zh}": "${en}",\n`;
    }
  }

  const newContent = `/**
 * 中英文变量命名字典
 * 零外部依赖，纯本地字典
 * 总词条数: ${Object.keys(merged).length}
 */

// 虚词列表（分词时过滤）
export const STOP_WORDS = new Set([
  ${stopWords.map((w) => `"${w}"`).join(", ")}
]);

// 中英文映射表（按key长度降序排列，用于前向最大匹配）
export const DICT: Record<string, string> = {
${dictBody}
};

// 按key长度降序排列的键列表（用于前向最大匹配）
export const SORTED_KEYS = Object.keys(DICT).sort((a, b) => b.length - a.length);

// 字典大小统计
export const DICT_SIZE = Object.keys(DICT).length;
`;

  writeFileSync(dictPath, newContent, "utf-8");
  console.log(`\n✅ dict.ts 已更新！共 ${Object.keys(merged).length} 条词条`);

  // 提示清理源文件
  console.log("\n💡 提示: 合并完成后可删除源文件中的已导入词条");
}

main();
