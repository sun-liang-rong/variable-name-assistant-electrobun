/**
 * ECDICT → dict-source 转换脚本
 *
 * 读取 ECDICT CSV，提取中文→英文映射，输出为 dict-source-ecdict.json
 * 与现有字典去重后可合并到 20,000+ 条
 *
 * 用法：bun run scripts/ecdict-to-dict.ts
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const projectRoot = process.cwd();
const ecdictPath = join(projectRoot, "scripts", "ecdict.csv");
const outputPath = join(projectRoot, "scripts", "dict-source-ecdict.json");
const currentDictPath = join(projectRoot, "src", "mainview", "utils", "dict.ts");

// 读取现有字典 key 用于去重
function readCurrentKeys(): Set<string> {
  const content = readFileSync(currentDictPath, "utf-8");
  const keys = new Set<string>();
  const regex = /"([^"]+)"\s*:\s*"/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    keys.add(m[1]);
  }
  return keys;
}

// 解析 ECDICT CSV（大字段兼容）
function parseECDICT(): Array<{ word: string; translation: string }> {
  const csv = readFileSync(ecdictPath, "utf-8");
  const lines = csv.split("\n");
  const entries: Array<{ word: string; translation: string }> = [];

  // 跳过 header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // 简单 CSV 解析（处理引号内的逗号和换行）
    const parts: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const ch = line[j];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        parts.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
    parts.push(current);

    if (parts.length < 4) continue;

    const word = parts[0].trim().toLowerCase();
    const translation = parts[3].trim();

    if (word && translation) {
      entries.push({ word, translation });
    }
  }

  return entries;
}

// 从中文翻译中提取第一个纯中文词条
function extractChinese(translation: string): string | null {
  // ECDICT 格式: "n. 中文释义1\n中文释义2\n..."
  const lines = translation.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // 去掉词性前缀 "n. " "v. " "adj. " 等
    const cleaned = trimmed.replace(/^[a-z]+\.\s*/, "").trim();

    // 去掉网络释义标记
    const noNetwork = cleaned.replace(/^\[网络\]\s*/, "").trim();

    // 提取中文部分（去掉英文解释、分号分隔的多个含义，取第一个）
    // 只保留包含中文字符的片段
    const segments = noNetwork.split(/[;；,，]/);
    for (const seg of segments) {
      const s = seg.trim();
      // 检查是否包含中文字符
      if (/[一-鿿]/.test(s)) {
        // 去掉括号内的英文
        const chinese = s.replace(/\([^)]*\)/g, "").trim();
        // 只保留纯中文（允许少量标点）
        const pureChinese = chinese.replace(/[^u4e00-鿿　-〿＀-￯]/g, "");
        if (pureChinese.length >= 1 && pureChinese.length <= 12) {
          return pureChinese;
        }
      }
    }
  }

  return null;
}

// 英文单词转 camelCase 变量名
function toCamelCase(word: string): string {
  // 处理缩写
  const specialAbbrevs: Record<string, string> = {
    "html": "html",
    "css": "css",
    "js": "js",
    "json": "json",
    "xml": "xml",
    "sql": "sql",
    "api": "api",
    "url": "url",
    "http": "http",
    "https": "https",
    "ui": "ui",
    "ux": "ux",
    "id": "id",
    "ip": "ip",
    "pc": "pc",
    "ai": "ai",
    "vr": "vr",
    "ar": "ar",
    "db": "db",
    "os": "os",
    "it": "it",
    "cd": "cd",
    "dvd": "dvd",
    "tv": "tv",
    "gps": "gps",
    "cpu": "cpu",
    "gpu": "gpu",
    "ram": "ram",
    "rom": "rom",
    "ssd": "ssd",
    "usb": "usb",
    "wifi": "wifi",
    "led": "led",
    "lcd": "lcd",
    "pdf": "pdf",
    "gif": "gif",
    "png": "png",
    "jpg": "jpg",
    "svg": "svg",
    "csv": "csv",
    "ftp": "ftp",
    "ssh": "ssh",
    "dns": "dns",
    "tcp": "tcp",
    "udp": "udp",
    "ssl": "ssl",
    "tls": "tls",
    "jwt": "jwt",
    "oauth": "oauth",
    "crud": "crud",
    "regex": "regex",
    "devops": "devops",
    "cdn": "cdn",
    "iot": "iot",
    "saas": "saas",
    "paas": "paas",
    "iaas": "iaas",
    "cli": "cli",
    "gui": "gui",
    "sdk": "sdk",
    "npm": "npm",
    "pip": "pip",
    "vue": "vue",
    "react": "react",
    "node": "node",
    "java": "java",
    "ruby": "ruby",
    "php": "php",
    "perl": "perl",
    "rust": "rust",
    "dart": "dart",
    "go": "go",
    "swift": "swift",
    "kotlin": "kotlin",
    "scala": "scala",
    "groovy": "groovy",
    "linux": "linux",
    "macos": "macOS",
    "android": "android",
    "ios": "iOS",
    "windows": "windows",
    "docker": "docker",
    "kubernetes": "kubernetes",
    "k8s": "k8s",
    "redis": "redis",
    "mongo": "mongo",
    "mysql": "mysql",
    "postgres": "postgres",
    "sqlite": "sqlite",
    "elasticsearch": "elasticsearch",
    "kafka": "kafka",
    "rabbitmq": "rabbitMQ",
    "nginx": "nginx",
    "apache": "apache",
    "tomcat": "tomcat",
  };

  const lower = word.toLowerCase();
  if (specialAbbrevs[lower]) return specialAbbrevs[lower];

  // 分割单词
  const parts = word.split(/[-_\s]+/);
  if (parts.length === 1) {
    // 单个单词：首字母小写
    return parts[0].charAt(0).toLowerCase() + parts[0].slice(1).toLowerCase();
  }

  // 多个单词：camelCase
  return parts
    .map((p, i) => {
      const lower = p.toLowerCase();
      if (i === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}

// 检查是否为有效的 JS 标识符
function isValidIdentifier(s: string): boolean {
  return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(s) && s.length >= 1 && s.length <= 60;
}

// 主函数
function main() {
  // 目标：从 557K 中精选 ~12K 高质量条目
  const TARGET_ENTRIES = 12000;

  console.log("📖 读取现有字典...");
  const existingKeys = readCurrentKeys();
  console.log(`   现有词条: ${existingKeys.size}`);

  console.log("\n📖 读取 ECDICT...");
  const entries = parseECDICT();
  console.log(`   ECDICT 条目: ${entries.length}`);

  console.log("\n🔄 转换并筛选中...");
  const candidates: Array<{ zh: string; en: string; score: number }> = [];
  let skippedEmpty = 0;
  let skippedDuplicate = 0;
  let skippedInvalid = 0;

  for (const { word, translation } of entries) {
    // 提取中文
    const chinese = extractChinese(translation);
    if (!chinese) {
      skippedEmpty++;
      continue;
    }

    // 去重：跳过已在现有字典中的
    if (existingKeys.has(chinese)) {
      skippedDuplicate++;
      continue;
    }

    // 转换英文为 camelCase
    const english = toCamelCase(word);
    if (!isValidIdentifier(english)) {
      skippedInvalid++;
      continue;
    }

    // 评分：优先选择适合做变量名的词条
    let score = 0;

    // 中文长度 1-4 字最佳
    if (chinese.length === 1) score += 3;
    else if (chinese.length === 2) score += 5;
    else if (chinese.length === 3) score += 4;
    else if (chinese.length === 4) score += 3;
    else if (chinese.length <= 6) score += 2;
    else score += 1;

    // 英文长度 2-15 字最佳
    if (english.length >= 2 && english.length <= 15) score += 3;
    else if (english.length <= 25) score += 1;

    // 常见词根加分
    const commonRoots = [
      "get", "set", "add", "remove", "delete", "create", "update",
      "find", "search", "sort", "filter", "list", "show", "hide",
      "open", "close", "start", "stop", "run", "play", "pause",
      "save", "load", "send", "receive", "push", "pull", "fetch",
      "check", "valid", "parse", "format", "convert", "transform",
      "build", "compile", "deploy", "debug", "test", "log", "trace",
      "user", "admin", "config", "setting", "option", "pref",
      "data", "info", "detail", "summary", "report", "stat",
      "time", "date", "year", "month", "day", "hour", "min",
      "name", "title", "label", "text", "content", "message",
      "image", "photo", "video", "audio", "file", "folder",
      "page", "view", "screen", "panel", "dialog", "modal",
      "form", "input", "output", "button", "link", "tab",
      "list", "table", "grid", "tree", "map", "chart",
      "color", "size", "width", "height", "margin", "padding",
      "top", "bottom", "left", "right", "center", "middle",
      "first", "last", "next", "prev", "main", "sub",
      "key", "value", "type", "mode", "state", "status",
      "error", "warn", "info", "debug", "fatal",
      "max", "min", "avg", "sum", "count", "total",
      "id", "code", "num", "no", "seq", "index",
    ];
    for (const root of commonRoots) {
      if (english.toLowerCase().includes(root)) {
        score += 2;
        break;
      }
    }

    // 纯中文（不含英文混合）
    if (/^[一-鿿]+$/.test(chinese)) score += 2;

    candidates.push({ zh: chinese, en: english, score });
  }

  // 按分数排序，取前 TARGET_ENTRIES 条
  candidates.sort((a, b) => b.score - a.score);
  const selected = candidates.slice(0, TARGET_ENTRIES);

  const result: Record<string, string> = {};
  for (const { zh, en } of selected) {
    result[zh] = en;
  }

  console.log(`\n📈 转换统计:`);
  console.log(`   候选词条: ${candidates.length}`);
  console.log(`   精选入库: ${Object.keys(result).length} 条`);
  console.log(`   跳过(无中文): ${skippedEmpty}`);
  console.log(`   跳过(已存在): ${skippedDuplicate}`);
  console.log(`   跳过(无效标识符): ${skippedInvalid}`);

  // 写入 JSON
  writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf-8");
  console.log(`\n✅ 输出: ${outputPath}`);
  console.log(`   共 ${Object.keys(result).length} 条新词条`);
}

main();
