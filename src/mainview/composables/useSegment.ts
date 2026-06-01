/**
 * 分词 composable
 * 使用前向最大匹配分词器
 */

import { ref } from "vue";
import { type Token, segment } from "../utils/tokenizer";

export function useSegment() {
  const tokens = ref<Token[]>([]);

  /**
   * 对文本进行分词
   */
  function doSegment(text: string): Token[] {
    if (!text.trim()) return [];
    return segment(text);
  }

  return {
    tokens,
    doSegment,
  };
}
