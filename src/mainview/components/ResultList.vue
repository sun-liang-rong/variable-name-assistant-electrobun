<script setup lang="ts">
import { type NameResult } from "../utils/naming";

const props = defineProps<{
  results: NameResult[];
  noMatch: boolean;
}>();

const emit = defineEmits<{
  copy: [name: string];
}>();
</script>

<template>
  <div class="result-list">
    <div v-if="props.noMatch" class="no-match">
      暂无匹配词汇，请补充词库
    </div>
    <div v-else-if="props.results.length === 0" class="placeholder">
      输入中文描述，自动生成命名推荐
    </div>
    <div v-else class="results">
      <div
        v-for="(item, index) in props.results"
        :key="index"
        class="result-item"
        @click="emit('copy', item.name)"
      >
        <span class="result-name">{{ item.name }}</span>
        <span class="result-desc">{{ item.description }}</span>
        <span class="source-tag" :class="item.source">
          {{ item.source === 'dict' ? '词库' : item.source === 'pinyin' ? '拼音' : '混合' }}
        </span>
        <span class="copy-hint">点击复制</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 12px;
  min-height: 0;
}

.placeholder,
.no-match {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-tertiary);
  font-size: 13px;
}

.no-match {
  color: var(--warning);
}

.results {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 0;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--bg-tertiary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
}

.result-item:hover {
  background: var(--bg-hover);
}

.result-name {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 500;
  color: var(--accent);
  flex-shrink: 0;
}

.result-desc {
  font-size: 11px;
  color: var(--text-tertiary);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.source-tag {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  flex-shrink: 0;
}

.source-tag.dict {
  background: rgba(82, 196, 26, 0.15);
  color: #52c41a;
}

.source-tag.pinyin {
  background: rgba(79, 140, 255, 0.15);
  color: #4f8cff;
}

.source-tag.mixed {
  background: rgba(250, 173, 20, 0.15);
  color: #faad14;
}

.copy-hint {
  font-size: 11px;
  color: var(--text-tertiary);
  opacity: 0;
  transition: opacity 0.15s;
  flex-shrink: 0;
}

.result-item:hover .copy-hint {
  opacity: 1;
}

@media (max-width: 480px) {
  .result-list {
    padding: 0 8px;
  }

  .result-item {
    padding: 6px 8px;
    gap: 6px;
  }

  .result-name {
    font-size: 13px;
  }

  .result-desc {
    font-size: 10px;
  }

  .source-tag {
    display: none;
  }

  .copy-hint {
    display: none;
  }

  .placeholder,
  .no-match {
    font-size: 12px;
  }
}

@media (max-width: 360px) {
  .result-list {
    padding: 0 6px;
  }

  .result-item {
    padding: 5px 6px;
  }

  .result-name {
    font-size: 12px;
  }
}
</style>
