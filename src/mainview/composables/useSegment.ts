/**
 * 分词composable
 * 使用jieba-tokenizer进行智能分词
 */

import { ref, watch } from "vue";
import { type Token, segment } from "../utils/jieba-tokenizer";
import { type Dictionary } from "../utils/dictionary";

export function useSegment() {
  const tokens = ref<Token[]>([]);
  const isSegmenting = ref(false);

  /**
   * 对文本进行分词
   */
  async function doSegment(text: string, dict: Dictionary): Promise<Token[]> {
    if (!text.trim()) {
      return [];
    }

    isSegmenting.value = true;
    try {
      const result = await segment(text, dict);
      return result;
    } catch (error) {
      console.error("Segment error:", error);
      return [];
    } finally {
      isSegmenting.value = false;
    }
  }

  /**
   * 同步分词（用于兼容旧代码）
   * 注意：这个版本不使用jieba，而是使用简单的分词
   */
  function segmentSync(text: string, dict: Dictionary): Token[] {
    if (!text.trim()) {
      return [];
    }

    // 简单的同步分词
    const dictIndex = new Map<string, string>();
    for (const entry of dict) {
      dictIndex.set(entry.zh, entry.en);
    }

    const result: Token[] = [];
    let remaining = text.trim();

    // 按词长度降序排列
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
          result.push({
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
          // 中文字符
          const dictEn = dictIndex.get(char);
          if (dictEn) {
            result.push({
              zh: char,
              en: dictEn,
              matched: true,
              source: "dict",
            });
          } else {
            result.push({
              zh: char,
              en: null,
              matched: false,
              source: "none",
            });
          }
          remaining = remaining.slice(1);
        } else if (/[a-zA-Z0-9]/.test(char)) {
          // 英文或数字
          let word = "";
          let i = 0;
          while (i < remaining.length && /[a-zA-Z0-9]/.test(remaining[i])) {
            word += remaining[i];
            i++;
          }
          result.push({
            zh: word,
            en: word.toLowerCase(),
            matched: true,
            source: "dict",
          });
          remaining = remaining.slice(i);
        } else {
          remaining = remaining.slice(1);
        }
      }
    }

    // 过滤虚词
    const stopWords = new Set([
      "的", "了", "和", "与", "及", "之", "在", "是", "有", "不",
      "这", "那", "我", "你", "他", "她", "它", "们", "被", "把",
      "给", "让", "用", "对", "从", "到", "也", "就", "都", "而",
      "且", "但", "或", "如果", "虽然", "因为", "所以", "可以",
      "要", "会", "能", "着", "过", "地", "得", "吗", "吧", "啊",
      "呢", "哦", "嗯", "哈", "呀", "啦", "么", "什么", "怎么",
      "这个", "那个", "一个", "一些", "所有", "每个", "任何",
    ]);

    return result.filter(
      (t) => !stopWords.has(t.zh) && t.zh.trim().length > 0
    );
  }

  return {
    tokens,
    isSegmenting,
    doSegment,
    segmentSync,
  };
}
