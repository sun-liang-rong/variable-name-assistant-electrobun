/**
 * 前向最大匹配分词器
 * 纯 TypeScript 实现，零外部依赖
 */

import { DICT, SORTED_KEYS, STOP_WORDS } from "./dict";

export interface Token {
  zh: string;
  en: string | null;
  matched: boolean;
  source: "dict" | "none";
}

/**
 * 前向最大匹配分词
 * 从左到右扫描，每次尝试匹配最长的词
 */
export function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let remaining = text.trim();

  while (remaining.length > 0) {
    // 跳过空格和标点
    if (/^[\s\p{P}]/u.test(remaining)) {
      remaining = remaining.slice(1);
      continue;
    }

    // 英文或数字：直接作为 token
    if (/^[a-zA-Z0-9]/.test(remaining)) {
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
    }

    // 中文：前向最大匹配
    let matched = false;
    for (const key of SORTED_KEYS) {
      if (remaining.startsWith(key)) {
        tokens.push({
          zh: key,
          en: DICT[key],
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
      tokens.push({
        zh: remaining[0],
        en: null,
        matched: false,
        source: "none",
      });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
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
 * 完整分词流程：分词 → 过滤虚词
 */
export function segment(text: string): Token[] {
  return filterStopWords(tokenize(text));
}
