export interface DictEntry {
  zh: string;
  en: string;
  category: "noun" | "verb" | "status" | "ui" | "business" | "tech" | "action";
}

export type Dictionary = DictEntry[];

// 从大型词库导入
import { LARGE_DICTIONARY } from "./large-dictionary";
import { SAMPLE_DICTIONARY } from "./sample-dictionary";

export const DEFAULT_DICTIONARY: Dictionary = [
  ...LARGE_DICTIONARY,
  ...SAMPLE_DICTIONARY,
];

// 虚词列表（过滤用）
export const STOP_WORDS = new Set([
  "的", "了", "和", "与", "及", "之", "在", "是", "有", "不",
  "这", "那", "我", "你", "他", "她", "它", "们", "被", "把",
  "给", "让", "用", "对", "从", "到", "也", "就", "都", "而",
  "且", "但", "或", "如果", "虽然", "因为", "所以", "可以",
  "要", "会", "能", "着", "过", "地", "得", "吗", "吧", "啊",
  "呢", "哦", "嗯", "哈", "呀", "啦", "么", "什么", "怎么",
  "这个", "那个", "一个", "一些", "所有", "每个", "任何",
]);

// 构建索引（按中文长度降序，用于最大匹配）
export function buildDictIndex(dict: Dictionary): Map<string, string> {
  const index = new Map<string, string>();
  for (const entry of dict) {
    index.set(entry.zh, entry.en);
  }
  return index;
}
