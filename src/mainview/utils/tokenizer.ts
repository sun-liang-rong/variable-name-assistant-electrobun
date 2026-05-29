import { pinyin } from "pinyin-pro";
import { type Dictionary, STOP_WORDS, buildDictIndex } from "./dictionary";
import { PINYIN_TO_ENGLISH, PINYIN_PHRASE_TO_ENGLISH } from "./pinyin-map";

export interface Token {
  zh: string;
  en: string | null;
  matched: boolean;
  source: "dict" | "pinyin" | "none";
}

/**
 * 将单个汉字或词组通过拼音转换为英文
 * 改进：优先匹配词组，再匹配单字，支持上下文感知
 */
function pinyinToEnglish(text: string): string | null {
  // 1. 先尝试完整词组匹配（最精准）
  const fullPinyin = pinyin(text, { toneType: "none", type: "array" }).join("");
  const phraseMatch = PINYIN_PHRASE_TO_ENGLISH[fullPinyin];
  if (phraseMatch) return phraseMatch;

  // 2. 尝试单词匹配（单个字）
  if (text.length === 1) {
    const singlePinyin = pinyin(text, { toneType: "none", type: "array" })[0];
    const singleMatch = PINYIN_TO_ENGLISH[singlePinyin];
    if (singleMatch) return singleMatch;
  }

  // 3. 多字词：尝试拆分成多个词组匹配
  if (text.length > 1) {
    // 尝试2字词组匹配
    if (text.length === 2) {
      const twoCharPinyin = pinyin(text, { toneType: "none", type: "array" }).join("");
      const twoCharMatch = PINYIN_PHRASE_TO_ENGLISH[twoCharPinyin];
      if (twoCharMatch) return twoCharMatch;
    }

    // 尝试3字词组匹配
    if (text.length === 3) {
      const threeCharPinyin = pinyin(text, { toneType: "none", type: "array" }).join("");
      const threeCharMatch = PINYIN_PHRASE_TO_ENGLISH[threeCharPinyin];
      if (threeCharMatch) return threeCharMatch;
    }

    // 4. 逐字查拼音映射，组合（最后手段）
    const chars = text.split("");
    const pinyinArr = pinyin(text, { toneType: "none", type: "array" });
    const parts: string[] = [];
    let allMatched = true;

    for (let i = 0; i < chars.length; i++) {
      const py = pinyinArr[i];
      const en = PINYIN_TO_ENGLISH[py];
      if (en) {
        parts.push(en);
      } else {
        allMatched = false;
        break;
      }
    }

    if (allMatched && parts.length > 0) {
      return parts.join("");
    }
  }

  return null;
}

/**
 * 智能分词：尝试多种分词策略，选择最佳结果
 */
function smartTokenize(text: string, dictIndex: Map<string, string>): Token[] {
  // 策略1: 正向最大匹配
  const forwardResult = forwardMaxMatch(text, dictIndex);

  // 策略2: 反向最大匹配
  const backwardResult = backwardMaxMatch(text, dictIndex);

  // 选择更好的结果（匹配词数更多、单字更少）
  return selectBetterResult(forwardResult, backwardResult);
}

/**
 * 正向最大匹配
 */
function forwardMaxMatch(text: string, dictIndex: Map<string, string>): Token[] {
  const tokens: Token[] = [];
  let remaining = text.trim();

  // 按词长度降序排列词典中的词
  const sortedKeys = Array.from(dictIndex.keys()).sort((a, b) => b.length - a.length);

  while (remaining.length > 0) {
    // 跳过空格和标点
    if (/^[\s\p{P}]/u.test(remaining)) {
      remaining = remaining.slice(1);
      continue;
    }

    let matched = false;

    // 尝试最长匹配
    for (const key of sortedKeys) {
      if (remaining.startsWith(key)) {
        tokens.push({
          zh: key,
          en: dictIndex.get(key)!,
          matched: true,
          source: "dict",
        });
        remaining = remaining.slice(key.length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      // 未匹配的字符
      const char = remaining[0];
      if (/[一-鿿]/.test(char)) {
        // 中文字符：先查词典，再用拼音兜底
        const dictEn = dictIndex.get(char);
        if (dictEn) {
          tokens.push({
            zh: char,
            en: dictEn,
            matched: true,
            source: "dict",
          });
        } else {
          // 拼音兜底：尝试取连续的中文字符组成词
          let chineseWord = "";
          let i = 0;
          while (i < remaining.length && /[一-鿿]/.test(remaining[i])) {
            chineseWord += remaining[i];
            i++;
          }

          // 尝试整个词的拼音匹配
          const pyEn = pinyinToEnglish(chineseWord);
          if (pyEn) {
            tokens.push({
              zh: chineseWord,
              en: pyEn,
              matched: true,
              source: "pinyin",
            });
            remaining = remaining.slice(chineseWord.length);
            continue;
          }

          // 尝试单字拼音匹配
          const singlePyEn = pinyinToEnglish(char);
          tokens.push({
            zh: char,
            en: singlePyEn,
            matched: !!singlePyEn,
            source: singlePyEn ? "pinyin" : "none",
          });
        }
        remaining = remaining.slice(1);
      } else if (/[a-zA-Z0-9]/.test(char)) {
        // 英文或数字，直接作为 token
        let word = "";
        let i = 0;
        while (i < remaining.length && /[a-zA-Z0-9]/.test(remaining[i])) {
          word += remaining[i];
          i++;
        }
        tokens.push({
          zh: word,
          en: word.toLowerCase(),
          matched: true,
          source: "dict",
        });
        remaining = remaining.slice(i);
        continue;
      } else {
        remaining = remaining.slice(1);
      }
    }
  }

  return tokens;
}

/**
 * 反向最大匹配
 */
function backwardMaxMatch(text: string, dictIndex: Map<string, string>): Token[] {
  const tokens: Token[] = [];
  let remaining = text.trim();

  // 按词长度降序排列词典中的词
  const sortedKeys = Array.from(dictIndex.keys()).sort((a, b) => b.length - a.length);

  while (remaining.length > 0) {
    // 跳过空格和标点
    if (/[\s\p{P}]$/u.test(remaining)) {
      remaining = remaining.slice(0, -1);
      continue;
    }

    let matched = false;

    // 尝试最长匹配（从末尾开始）
    for (const key of sortedKeys) {
      if (remaining.endsWith(key)) {
        tokens.unshift({
          zh: key,
          en: dictIndex.get(key)!,
          matched: true,
          source: "dict",
        });
        remaining = remaining.slice(0, -key.length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      // 未匹配的字符
      const char = remaining[remaining.length - 1];
      if (/[一-鿿]/.test(char)) {
        // 中文字符：先查词典，再用拼音兜底
        const dictEn = dictIndex.get(char);
        if (dictEn) {
          tokens.unshift({
            zh: char,
            en: dictEn,
            matched: true,
            source: "dict",
          });
        } else {
          // 拼音兜底：尝试取连续的中文字符组成词
          let chineseWord = "";
          let i = remaining.length - 1;
          while (i >= 0 && /[一-鿿]/.test(remaining[i])) {
            chineseWord = remaining[i] + chineseWord;
            i--;
          }

          // 尝试整个词的拼音匹配
          const pyEn = pinyinToEnglish(chineseWord);
          if (pyEn) {
            tokens.unshift({
              zh: chineseWord,
              en: pyEn,
              matched: true,
              source: "pinyin",
            });
            remaining = remaining.slice(0, -chineseWord.length);
            continue;
          }

          // 尝试单字拼音匹配
          const singlePyEn = pinyinToEnglish(char);
          tokens.unshift({
            zh: char,
            en: singlePyEn,
            matched: !!singlePyEn,
            source: singlePyEn ? "pinyin" : "none",
          });
        }
        remaining = remaining.slice(0, -1);
      } else if (/[a-zA-Z0-9]/.test(char)) {
        // 英文或数字，直接作为 token
        let word = "";
        let i = remaining.length - 1;
        while (i >= 0 && /[a-zA-Z0-9]/.test(remaining[i])) {
          word = remaining[i] + word;
          i--;
        }
        tokens.unshift({
          zh: word,
          en: word.toLowerCase(),
          matched: true,
          source: "dict",
        });
        remaining = remaining.slice(0, -word.length);
        continue;
      } else {
        remaining = remaining.slice(0, -1);
      }
    }
  }

  return tokens;
}

/**
 * 选择更好的分词结果
 * 标准：匹配词数更多、单字更少、拼音匹配更少
 */
function selectBetterResult(forward: Token[], backward: Token[]): Token[] {
  // 计算分数
  const forwardScore = calculateScore(forward);
  const backwardScore = calculateScore(backward);

  // 选择分数更高的结果
  return forwardScore >= backwardScore ? forward : backward;
}

/**
 * 计算分词结果的分数
 */
function calculateScore(tokens: Token[]): number {
  let score = 0;

  for (const token of tokens) {
    if (token.matched) {
      // 匹配的词加分
      score += 10;

      // 词典匹配比拼音匹配分数更高
      if (token.source === "dict") {
        score += 5;
      }

      // 长词加分（优先选择长词匹配）
      score += token.zh.length;
    } else {
      // 未匹配的字符减分
      score -= 5;
    }
  }

  return score;
}

/**
 * 智能分词
 * 使用多种分词策略，选择最佳结果
 */
export function tokenize(text: string, dict: Dictionary): Token[] {
  const dictIndex = buildDictIndex(dict);
  return smartTokenize(text, dictIndex);
}

/**
 * 过滤虚词
 */
export function filterStopWords(tokens: Token[]): Token[] {
  return tokens.filter(
    (t) => !STOP_WORDS.has(t.zh) && t.zh.trim().length > 0
  );
}

/**
 * 完整的分词流程：分词 → 过滤虚词
 */
export function segment(text: string, dict: Dictionary): Token[] {
  const tokens = tokenize(text, dict);
  return filterStopWords(tokens);
}
