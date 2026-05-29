/**
 * ECDICT词典转换脚本
 * 将ECDICT的CSV格式转换为我们的JSON格式
 *
 * 使用方法：
 * 1. 下载ECDICT: https://github.com/skywind3000/ECDICT/releases
 * 2. 将ecdict.csv或stardict.csv放到scripts/dict-source/目录
 * 3. 运行: bun run scripts/convert-ecdict.ts
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

interface ECDICTEntry {
  word: string;
  phonetic: string;
  definition: string;
  translation: string;
  exchange: string;
}

interface OurDictEntry {
  zh: string;
  en: string;
  category: "noun" | "verb" | "status" | "ui" | "business" | "tech" | "action";
}

/**
 * 解析ECDICT的translation字段
 * 格式: "中文释义1\n中文释义2\n..."
 */
function parseTranslation(translation: string): string[] {
  if (!translation) return [];

  // 按换行符分割
  const lines = translation.split("\n").map(line => line.trim()).filter(line => line.length > 0);

  // 提取中文释义（去掉词性标注）
  const meanings: string[] = [];
  for (const line of lines) {
    // 格式: "n. 中文释义" 或 "中文释义"
    const match = line.match(/^(?:[a-z]+\.\s*)?(.+)$/);
    if (match) {
      meanings.push(match[1].trim());
    }
  }

  return meanings;
}

/**
 * 判断词性
 */
function detectCategory(word: string, translation: string): OurDictEntry["category"] {
  const lowerWord = word.toLowerCase();
  const lowerTranslation = translation.toLowerCase();

  // 动词
  if (lowerTranslation.includes("使") || lowerTranslation.includes("做") ||
      lowerTranslation.includes("进行") || lowerTranslation.includes("执行") ||
      lowerWord.endsWith("ize") || lowerWord.endsWith("ify") ||
      lowerWord.endsWith("ate") || lowerWord.endsWith("en")) {
    return "verb";
  }

  // 状态词
  if (lowerTranslation.includes("状态") || lowerTranslation.includes("的") ||
      lowerWord.endsWith("ing") || lowerWord.endsWith("ed") ||
      lowerWord.endsWith("ful") || lowerWord.endsWith("less") ||
      lowerWord.endsWith("ous") || lowerWord.endsWith("ive")) {
    return "status";
  }

  // 默认为名词
  return "noun";
}

/**
 * 转换ECDICT到我们的格式
 */
function convertECDICT(inputFile: string, outputFile: string) {
  console.log(`Reading ${inputFile}...`);
  const content = readFileSync(inputFile, "utf-8");
  const lines = content.split("\n");

  console.log(`Total lines: ${lines.length}`);

  const entries: OurDictEntry[] = [];
  const seen = new Set<string>();

  // 跳过标题行
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // 解析CSV（简单处理，假设没有逗号在引号内）
    const parts = line.split(",");
    if (parts.length < 5) continue;

    const word = parts[0].trim();
    const translation = parts[4].trim();

    if (!word || !translation) continue;

    // 提取中文释义
    const meanings = parseTranslation(translation);

    if (meanings.length === 0) continue;

    // 取第一个释义作为主要翻译
    const mainMeaning = meanings[0];

    // 去重
    const key = `${word.toLowerCase()}_${mainMeaning}`;
    if (seen.has(key)) continue;
    seen.add(key);

    // 判断词性
    const category = detectCategory(word, mainMeaning);

    entries.push({
      zh: mainMeaning,
      en: word.toLowerCase(),
      category,
    });

    // 进度显示
    if (i % 10000 === 0) {
      console.log(`Processed ${i} lines...`);
    }
  }

  console.log(`Converted ${entries.length} entries`);

  // 写入文件
  const output = `/**
 * ECDICT转换后的词典
 * 自动生成，请勿手动编辑
 * 词汇量: ${entries.length}
 */

export interface DictEntry {
  zh: string;
  en: string;
  category: "noun" | "verb" | "status" | "ui" | "business" | "tech" | "action";
}

export type Dictionary = DictEntry[];

export const ECDICT_CONVERTED: Dictionary = ${JSON.stringify(entries, null, 2)};
`;

  writeFileSync(outputFile, output, "utf-8");
  console.log(`Output written to ${outputFile}`);
}

// 主函数
const inputFile = join(__dirname, "dict-source", "ecdict.csv");
const outputFile = join(__dirname, "..", "src", "mainview", "utils", "ecdict-converted.ts");

try {
  convertECDICT(inputFile, outputFile);
} catch (error) {
  console.error("Error:", error);
  console.log("\n请先下载ECDICT词典文件:");
  console.log("1. 访问: https://github.com/skywind3000/ECDICT/releases");
  console.log("2. 下载 ecdict.csv 或 stardict.csv");
  console.log("3. 放到 scripts/dict-source/ 目录");
}
