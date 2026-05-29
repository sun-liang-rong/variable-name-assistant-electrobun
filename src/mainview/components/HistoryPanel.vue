<script setup lang="ts">
import { type HistoryItem } from "../composables/useHistory";

const props = defineProps<{
  history: HistoryItem[];
  show: boolean;
}>();

const emit = defineEmits<{
  select: [input: string];
  clear: [];
  close: [];
}>();

function formatTime(ts: number): string {
  const d = new Date(ts);
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}
</script>

<template>
  <Transition name="slide">
    <div v-if="props.show" class="history-panel">
      <div class="history-header">
        <span class="history-title">历史记录</span>
        <div class="history-actions">
          <button class="text-btn" @click="emit('clear')">清空</button>
          <button class="text-btn" @click="emit('close')">关闭</button>
        </div>
      </div>
      <div class="history-list">
        <div v-if="props.history.length === 0" class="empty">
          暂无历史记录
        </div>
        <div
          v-for="(item, index) in props.history"
          :key="index"
          class="history-item"
          @click="emit('select', item.input)"
        >
          <div class="history-input">{{ item.input }}</div>
          <div class="history-results">
            {{ item.results.slice(0, 3).join(", ") }}
          </div>
          <div class="history-time">{{ formatTime(item.timestamp) }}</div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.history-panel {
  position: absolute;
  inset: 0;
  background: var(--bg-primary);
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
}

.history-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.history-actions {
  display: flex;
  gap: 8px;
}

.text-btn {
  border: none;
  background: transparent;
  color: var(--accent);
  font-size: 12px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.15s;
}

.text-btn:hover {
  background: var(--bg-hover);
}

.history-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-tertiary);
  font-size: 13px;
}

.history-item {
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
  margin-bottom: 4px;
}

.history-item:hover {
  background: var(--bg-hover);
}

.history-input {
  font-size: 13px;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.history-results {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--accent);
  margin-bottom: 2px;
}

.history-time {
  font-size: 10px;
  color: var(--text-tertiary);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}

@media (max-width: 480px) {
  .history-header {
    padding: 6px 8px;
  }

  .history-title {
    font-size: 12px;
  }

  .text-btn {
    font-size: 11px;
    padding: 3px 6px;
  }

  .history-list {
    padding: 6px;
  }

  .history-item {
    padding: 6px 8px;
  }

  .history-input {
    font-size: 12px;
  }

  .history-results {
    font-size: 10px;
  }
}

@media (max-width: 360px) {
  .history-header {
    padding: 4px 6px;
  }

  .history-item {
    padding: 5px 6px;
  }
}
</style>
