/**
 * 使用nodejieba的专业中文分词模块
 * 替代原有的简单分词逻辑
 */

import { type Dictionary, buildDictIndex } from "./dictionary";

export interface Token {
  zh: string;
  en: string | null;
  matched: boolean;
  source: "dict" | "pinyin" | "none";
}

// 动态导入nodejieba（因为它可能在某些环境下不可用）
let nodejieba: any = null;

async function getNodejieba() {
  if (!nodejieba) {
    try {
      nodejieba = require("nodejieba");
    } catch (error) {
      console.warn("nodejieba not available, falling back to simple tokenizer");
      return null;
    }
  }
  return nodejieba;
}

/**
 * 使用nodejieba进行中文分词
 */
export async function jiebaCut(text: string): Promise<string[]> {
  const jieba = await getNodejieba();
  if (!jieba) {
    // 降级到简单分词
    return simpleCut(text);
  }

  try {
    return jieba.cut(text);
  } catch (error) {
    console.error("jieba cut error:", error);
    return simpleCut(text);
  }
}

/**
 * 简单分词（降级方案）
 */
function simpleCut(text: string): string[] {
  const tokens: string[] = [];
  let current = "";

  for (const char of text) {
    if (/[一-鿿]/.test(char)) {
      // 中文字符
      current += char;
    } else if (/[a-zA-Z0-9]/.test(char)) {
      // 英文或数字
      current += char;
    } else {
      // 标点或空格
      if (current) {
        tokens.push(current);
        current = "";
      }
      if (/\S/.test(char)) {
        tokens.push(char);
      }
    }
  }

  if (current) {
    tokens.push(current);
  }

  return tokens;
}

/**
 * 智能分词：结合nodejieba和词典匹配
 */
export async function tokenize(text: string, dict: Dictionary): Promise<Token[]> {
  const dictIndex = buildDictIndex(dict);
  const tokens: Token[] = [];

  // 使用nodejieba分词
  const words = await jiebaCut(text.trim());

  for (const word of words) {
    // 跳过空格和标点
    if (/^[\s\p{P}]$/u.test(word)) {
      continue;
    }

    // 英文或数字
    if (/^[a-zA-Z0-9]+$/.test(word)) {
      tokens.push({
        zh: word,
        en: word.toLowerCase(),
        matched: true,
        source: "dict",
      });
      continue;
    }

    // 中文：先查词典
    const dictEn = dictIndex.get(word);
    if (dictEn) {
      tokens.push({
        zh: word,
        en: dictEn,
        matched: true,
        source: "dict",
      });
      continue;
    }

    // 中文：尝试拼音转换
    const pinyinEn = await pinyinToEnglish(word);
    if (pinyinEn) {
      tokens.push({
        zh: word,
        en: pinyinEn,
        matched: true,
        source: "pinyin",
      });
      continue;
    }

    // 未匹配
    tokens.push({
      zh: word,
      en: null,
      matched: false,
      source: "none",
    });
  }

  return tokens;
}

/**
 * 拼音转换（简化版，主要依赖词典）
 */
async function pinyinToEnglish(text: string): Promise<string | null> {
  // 这里可以集成拼音库进行转换
  // 但考虑到性能，我们主要依赖词典匹配
  // 拼音转换只作为最后的降级方案

  // 简单的拼音映射（常用字）
  const pinyinMap: Record<string, string> = {
    "的": "of",
    "了": "le",
    "和": "and",
    "是": "is",
    "有": "have",
    "在": "at",
    "我": "i",
    "你": "you",
    "他": "he",
    "她": "she",
    "它": "it",
    "们": "we",
    "这": "this",
    "那": "that",
    "一个": "a",
    "不": "not",
    "都": "all",
    "也": "also",
    "就": "just",
    "把": "ba",
    "被": "bei",
    "给": "give",
    "让": "let",
    "用": "use",
    "对": "to",
    "从": "from",
    "到": "to",
    "和": "and",
    "与": "and",
    "及": "and",
    "之": "of",
    "在": "at",
    "中": "in",
    "上": "up",
    "下": "down",
    "大": "big",
    "小": "small",
    "多": "many",
    "少": "few",
    "好": "good",
    "坏": "bad",
    "新": "new",
    "旧": "old",
    "快": "fast",
    "慢": "slow",
    "高": "high",
    "低": "low",
    "长": "long",
    "短": "short",
    "宽": "wide",
    "窄": "narrow",
    "厚": "thick",
    "薄": "thin",
    "重": "heavy",
    "轻": "light",
    "热": "hot",
    "冷": "cold",
    "干": "dry",
    "湿": "wet",
    "硬": "hard",
    "软": "soft",
    "深": "deep",
    "浅": "shallow",
    "远": "far",
    "近": "near",
    "早": "early",
    "晚": "late",
    "开始": "start",
    "结束": "end",
    "打开": "open",
    "关闭": "close",
    "上": "up",
    "下": "down",
    "左": "left",
    "右": "right",
    "前": "front",
    "后": "back",
    "东": "east",
    "西": "west",
    "南": "south",
    "北": "north",
    "春": "spring",
    "夏": "summer",
    "秋": "autumn",
    "冬": "winter",
    "年": "year",
    "月": "month",
    "日": "day",
    "时": "hour",
    "分": "minute",
    "秒": "second",
    "天": "day",
    "地": "earth",
    "人": "person",
    "物": "thing",
    "事": "thing",
    "心": "heart",
    "手": "hand",
    "脚": "foot",
    "头": "head",
    "眼": "eye",
    "耳": "ear",
    "鼻": "nose",
    "口": "mouth",
    "舌": "tongue",
    "牙": "tooth",
    "发": "hair",
    "脸": "face",
    "身": "body",
    "血": "blood",
    "肉": "meat",
    "骨": "bone",
    "皮": "skin",
    "毛": "hair",
    "汗": "sweat",
    "泪": "tear",
    "水": "water",
    "火": "fire",
    "土": "earth",
    "金": "gold",
    "木": "wood",
    "石": "stone",
    "山": "mountain",
    "河": "river",
    "海": "sea",
    "湖": "lake",
    "江": "river",
    "溪": "stream",
    "雨": "rain",
    "雪": "snow",
    "风": "wind",
    "云": "cloud",
    "雷": "thunder",
    "电": "electricity",
    "光": "light",
    "影": "shadow",
    "声": "sound",
    "音": "sound",
    "色": "color",
    "香": "fragrant",
    "臭": "smelly",
    "甜": "sweet",
    "苦": "bitter",
    "辣": "spicy",
    "酸": "sour",
    "咸": "salty",
    "淡": "light",
    "生": "life",
    "死": "death",
    "老": "old",
    "少": "young",
    "男": "male",
    "女": "female",
    "父": "father",
    "母": "mother",
    "子": "son",
    "女": "daughter",
    "兄": "brother",
    "弟": "brother",
    "姐": "sister",
    "妹": "sister",
    "夫": "husband",
    "妻": "wife",
    "王": "king",
    "臣": "minister",
    "民": "people",
    "兵": "soldier",
    "将": "general",
    "帅": "handsome",
    "官": "official",
    "商": "merchant",
    "农": "farmer",
    "工": "worker",
    "学": "learn",
    "教": "teach",
    "读": "read",
    "写": "write",
    "画": "draw",
    "唱": "sing",
    "跳": "dance",
    "跑": "run",
    "走": "walk",
    "站": "stand",
    "坐": "sit",
    "躺": "lie",
    "睡": "sleep",
    "醒": "wake",
    "吃": "eat",
    "喝": "drink",
    "吸": "suck",
    "呼": "breathe",
    "吐": "spit",
    "吞": "swallow",
    "咬": "bite",
    "嚼": "chew",
    "舔": "lick",
    "闻": "smell",
    "看": "see",
    "听": "hear",
    "说": "speak",
    "问": "ask",
    "答": "answer",
    "叫": "call",
    "喊": "shout",
    "哭": "cry",
    "笑": "laugh",
    "怒": "angry",
    "喜": "happy",
    "哀": "sad",
    "乐": "happy",
    "爱": "love",
    "恨": "hate",
    "怕": "fear",
    "惊": "surprise",
    "怒": "angry",
    "悲": "sad",
    "欢": "happy",
    "苦": "bitter",
    "甜": "sweet",
    "辣": "spicy",
    "酸": "sour",
    "咸": "salty",
    "淡": "light",
    "热": "hot",
    "冷": "cold",
    "温": "warm",
    "凉": "cool",
    "干": "dry",
    "湿": "wet",
    "硬": "hard",
    "软": "soft",
    "强": "strong",
    "弱": "weak",
    "快": "fast",
    "慢": "slow",
    "急": "urgent",
    "缓": "slow",
    "忙": "busy",
    "闲": "idle",
    "难": "difficult",
    "易": "easy",
    "真": "true",
    "假": "false",
    "对": "right",
    "错": "wrong",
    "是": "yes",
    "非": "no",
    "有": "have",
    "无": "without",
    "空": "empty",
    "满": "full",
    "新": "new",
    "旧": "old",
    "生": "life",
    "死": "death",
    "始": "begin",
    "终": "end",
    "来": "come",
    "去": "go",
    "出": "out",
    "入": "in",
    "进": "enter",
    "退": "retreat",
    "升": "rise",
    "降": "fall",
    "加": "add",
    "减": "subtract",
    "乘": "multiply",
    "除": "divide",
    "大": "big",
    "小": "small",
    "多": "many",
    "少": "few",
    "长": "long",
    "短": "short",
    "宽": "wide",
    "窄": "narrow",
    "厚": "thick",
    "薄": "thin",
    "高": "high",
    "低": "low",
    "深": "deep",
    "浅": "shallow",
    "远": "far",
    "近": "near",
    "早": "early",
    "晚": "late",
    "快": "fast",
    "慢": "slow",
    "急": "urgent",
    "缓": "slow",
    "忙": "busy",
    "闲": "idle",
    "难": "difficult",
    "易": "easy",
    "真": "true",
    "假": "false",
    "对": "right",
    "错": "wrong",
    "是": "yes",
    "非": "no",
    "有": "have",
    "无": "without",
    "空": "empty",
    "满": "full",
  };

  // 单字直接查表
  if (text.length === 1) {
    return pinyinMap[text] || null;
  }

  // 多字：尝试逐字转换
  const chars = text.split("");
  const results: string[] = [];
  for (const char of chars) {
    const en = pinyinMap[char];
    if (en) {
      results.push(en);
    } else {
      return null; // 有一个字无法转换，返回null
    }
  }

  return results.join("");
}

/**
 * 过滤虚词
 */
export function filterStopWords(tokens: Token[]): Token[] {
  const stopWords = new Set([
    "的", "了", "和", "与", "及", "之", "在", "是", "有", "不",
    "这", "那", "我", "你", "他", "她", "它", "们", "被", "把",
    "给", "让", "用", "对", "从", "到", "也", "就", "都", "而",
    "且", "但", "或", "如果", "虽然", "因为", "所以", "可以",
    "要", "会", "能", "着", "过", "地", "得", "吗", "吧", "啊",
    "呢", "哦", "嗯", "哈", "呀", "啦", "么", "什么", "怎么",
    "这个", "那个", "一个", "一些", "所有", "每个", "任何",
  ]);

  return tokens.filter(
    (t) => !stopWords.has(t.zh) && t.zh.trim().length > 0
  );
}

/**
 * 完整的分词流程：分词 → 过滤虚词
 */
export async function segment(text: string, dict: Dictionary): Promise<Token[]> {
  const tokens = await tokenize(text, dict);
  return filterStopWords(tokens);
}
