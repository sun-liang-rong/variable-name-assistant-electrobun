import { type Token } from "./tokenizer";
import { type Dictionary } from "./dictionary";

export type NamingMode = "variable" | "function";

export interface NameResult {
  name: string;
  description: string;
  source: "dict" | "pinyin" | "mixed";
}

/**
 * 将英文单词转为小驼峰
 */
function toCamelCase(words: string[]): string {
  if (words.length === 0) return "";
  const first = words[0].toLowerCase();
  const rest = words.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  return first + rest.join("");
}

/**
 * 检查是否是布尔状态类词汇
 */
function isStatusToken(token: Token, dict: Dictionary): boolean {
  const entry = dict.find((d) => d.zh === token.zh);
  return entry?.category === "status";
}

/**
 * 检查是否是动词
 */
function isVerbToken(token: Token, dict: Dictionary): boolean {
  const entry = dict.find((d) => d.zh === token.zh);
  return entry?.category === "verb";
}

/**
 * 判断翻译来源
 */
function getSource(tokens: Token[]): "dict" | "pinyin" | "mixed" {
  const sources = new Set(tokens.filter((t) => t.matched).map((t) => t.source));
  if (sources.has("pinyin") && sources.has("dict")) return "mixed";
  if (sources.has("pinyin")) return "pinyin";
  return "dict";
}

/**
 * 生成来源描述
 */
function sourceLabel(source: "dict" | "pinyin" | "mixed"): string {
  switch (source) {
    case "dict": return "词库匹配";
    case "pinyin": return "拼音转换";
    case "mixed": return "词库+拼音";
  }
}

/**
 * 生成变量名推荐
 * 改进：增加更多命名模式，优化排序
 */
function generateVariableNames(tokens: Token[], dict: Dictionary): NameResult[] {
  const results: NameResult[] = [];
  const matchedTokens = tokens.filter((t) => t.matched && t.en);

  if (matchedTokens.length === 0) return results;

  const words = matchedTokens.map((t) => t.en!);
  const source = getSource(matchedTokens);
  const hasStatus = matchedTokens.some((t) => isStatusToken(t, dict));

  // 规则1: 直接组合（最基础）
  if (words.length <= 4) {
    results.push({
      name: toCamelCase(words),
      description: `基础组合 · ${sourceLabel(source)}`,
      source,
    });
  }

  // 规则2: 状态词加 is 前缀（布尔变量）
  if (hasStatus && words.length <= 3) {
    const statusWords = matchedTokens.filter((t) => isStatusToken(t, dict)).map((t) => t.en!);
    if (statusWords.length > 0) {
      results.push({
        name: toCamelCase(["is", ...statusWords]),
        description: `布尔状态 (is前缀) · ${sourceLabel(source)}`,
        source,
      });
    }
  }

  // 规则3: 如果有多个词，尝试截取核心词（去掉前面的修饰词）
  if (words.length > 2) {
    const coreWords = words.slice(-2);
    results.push({
      name: toCamelCase(coreWords),
      description: `核心词汇组合 · ${sourceLabel(source)}`,
      source,
    });
  }

  // 规则4: 首字母缩写 + 最后一个完整词
  if (words.length > 2) {
    const abbr = words.slice(0, -1).map((w) => w.charAt(0).toLowerCase()).join("");
    const lastWord = words[words.length - 1];
    const abbrName = abbr + lastWord.charAt(0).toUpperCase() + lastWord.slice(1);
    results.push({
      name: abbrName,
      description: `缩写组合 · ${sourceLabel(source)}`,
      source,
    });
  }

  // 规则5: 取前3个词
  if (words.length > 3) {
    results.push({
      name: toCamelCase(words.slice(0, 3)),
      description: `精简组合（前3词） · ${sourceLabel(source)}`,
      source,
    });
  }

  // 规则6: 如果第一个词是名词，尝试名词+名词组合
  if (words.length >= 2) {
    const firstWord = words[0];
    const restWords = words.slice(1);
    if (restWords.length > 0) {
      results.push({
        name: toCamelCase([firstWord, ...restWords]),
        description: `名词组合 · ${sourceLabel(source)}`,
        source,
      });
    }
  }

  // 规则7: 如果有状态词，尝试状态+名词组合
  if (hasStatus && words.length >= 2) {
    const statusWord = matchedTokens.find((t) => isStatusToken(t, dict))?.en;
    const nounWords = matchedTokens.filter((t) => !isStatusToken(t, dict)).map((t) => t.en!);
    if (statusWord && nounWords.length > 0) {
      results.push({
        name: toCamelCase([statusWord, ...nounWords]),
        description: `状态+名词组合 · ${sourceLabel(source)}`,
        source,
      });
    }
  }

  // 规则8: 如果有动词，尝试动词+名词组合（变量名风格）
  const verbTokens = matchedTokens.filter((t) => isVerbToken(t, dict));
  const nounTokens = matchedTokens.filter((t) => !isVerbToken(t, dict) && !isStatusToken(t, dict));
  if (verbTokens.length > 0 && nounTokens.length > 0) {
    const verb = verbTokens[0].en!;
    const nouns = nounTokens.map((t) => t.en!);
    results.push({
      name: toCamelCase([verb, ...nouns]),
      description: `动词+名词组合 · ${sourceLabel(source)}`,
      source,
    });
  }

  // 去重并排序
  const seen = new Set<string>();
  return results
    .filter((r) => {
      if (seen.has(r.name)) return false;
      seen.add(r.name);
      return true;
    })
    .sort((a, b) => {
      // 排序优先级：词库匹配 > 拼音匹配 > 混合匹配
      const sourceOrder = { dict: 0, pinyin: 1, mixed: 2 };
      return sourceOrder[a.source] - sourceOrder[b.source];
    })
    .slice(0, 5);
}

/**
 * 生成函数名推荐
 * 改进：增加更多命名模式，优化排序
 */
function generateFunctionNames(tokens: Token[], dict: Dictionary): NameResult[] {
  const results: NameResult[] = [];
  const matchedTokens = tokens.filter((t) => t.matched && t.en);

  if (matchedTokens.length === 0) return results;

  const words = matchedTokens.map((t) => t.en!);
  const source = getSource(matchedTokens);

  // 找出动词和名词
  const verbTokens = matchedTokens.filter((t) => isVerbToken(t, dict));
  const nounTokens = matchedTokens.filter((t) => !isVerbToken(t, dict) && !isStatusToken(t, dict));

  // 规则1: 如果第一个词是动词，直接组合（最常见）
  if (verbTokens.length > 0 && nounTokens.length > 0) {
    const verb = verbTokens[0].en!;
    const nouns = nounTokens.map((t) => t.en!);
    results.push({
      name: toCamelCase([verb, ...nouns]),
      description: `动词+名词组合 · ${sourceLabel(source)}`,
      source,
    });
  }

  // 规则2: 如果没有明确动词，用 handle 前缀（事件处理）
  if (verbTokens.length === 0) {
    results.push({
      name: toCamelCase(["handle", ...words]),
      description: `handle 前缀（事件处理） · ${sourceLabel(source)}`,
      source,
    });
  }

  // 规则3: 如果有动词，用动词 + 精简名词
  if (verbTokens.length > 0) {
    const verb = verbTokens[0].en!;
    if (nounTokens.length > 1) {
      const lastNoun = nounTokens[nounTokens.length - 1].en!;
      results.push({
        name: toCamelCase([verb, lastNoun]),
        description: `动词+核心名词 · ${sourceLabel(source)}`,
        source,
      });
    }
  }

  // 规则4: on + 名词（事件监听风格）
  if (nounTokens.length > 0) {
    const nouns = nounTokens.map((t) => t.en!);
    results.push({
      name: toCamelCase(["on", ...nouns]),
      description: `on 前缀（事件监听） · ${sourceLabel(source)}`,
      source,
    });
  }

  // 规则5: 直接组合所有词
  if (results.length < 2 && words.length <= 4) {
    results.push({
      name: toCamelCase(words),
      description: `直接组合 · ${sourceLabel(source)}`,
      source,
    });
  }

  // 规则6: 如果有多个动词，用第一个动词 + 名词
  if (verbTokens.length > 1 && nounTokens.length > 0) {
    const firstVerb = verbTokens[0].en!;
    const nouns = nounTokens.map((t) => t.en!);
    results.push({
      name: toCamelCase([firstVerb, ...nouns]),
      description: `首动词+名词组合 · ${sourceLabel(source)}`,
      source,
    });
  }

  // 规则7: 如果有状态词，用状态词 + 名词
  const statusTokens = matchedTokens.filter((t) => isStatusToken(t, dict));
  if (statusTokens.length > 0 && nounTokens.length > 0) {
    const statusWord = statusTokens[0].en!;
    const nouns = nounTokens.map((t) => t.en!);
    results.push({
      name: toCamelCase([statusWord, ...nouns]),
      description: `状态+名词组合 · ${sourceLabel(source)}`,
      source,
    });
  }

  // 规则8: 如果只有名词，用名词 + 后缀
  if (verbTokens.length === 0 && nounTokens.length > 0) {
    const nouns = nounTokens.map((t) => t.en!);
    results.push({
      name: toCamelCase([...nouns, "handler"]),
      description: `名词+handler后缀 · ${sourceLabel(source)}`,
      source,
    });
  }

  // 去重并排序
  const seen = new Set<string>();
  return results
    .filter((r) => {
      if (seen.has(r.name)) return false;
      seen.add(r.name);
      return true;
    })
    .sort((a, b) => {
      // 排序优先级：词库匹配 > 拼音匹配 > 混合匹配
      const sourceOrder = { dict: 0, pinyin: 1, mixed: 2 };
      return sourceOrder[a.source] - sourceOrder[b.source];
    })
    .slice(0, 5);
}

/**
 * 根据模式生成命名推荐
 */
export function generateNames(
  tokens: Token[],
  dict: Dictionary,
  mode: NamingMode
): NameResult[] {
  if (mode === "variable") {
    return generateVariableNames(tokens, dict);
  }
  return generateFunctionNames(tokens, dict);
}
