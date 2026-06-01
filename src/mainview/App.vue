<script setup lang="ts">
import { ref, computed, watch } from "vue";
import TitleBar from "./components/TitleBar.vue";
import InputArea from "./components/InputArea.vue";
import ResultList from "./components/ResultList.vue";
import HistoryPanel from "./components/HistoryPanel.vue";
import Toast from "./components/Toast.vue";
import { type NamingMode, type NameResult, generateNames } from "./utils/naming";
import { type Token } from "./utils/tokenizer";
import { useHistory } from "./composables/useHistory";
import { useConfig } from "./composables/useConfig";
import { useRpc } from "./composables/useRpc";
import { useSegment } from "./composables/useSegment";

const { history, addHistory, clearHistory } = useHistory();
const { config, toggleTheme, toggleAlwaysOnTop } = useConfig();
const { copyToClipboard, minimizeWindow, maximizeWindow, closeWindow } = useRpc();
const { doSegment } = useSegment();

const inputText = ref("");
const mode = ref<NamingMode>("variable");
const showHistory = ref(false);
const showToast = ref(false);
const toastMessage = ref("");
const currentTokens = ref<Token[]>([]);

// 分词
watch(inputText, (newText) => {
  currentTokens.value = doSegment(newText);
}, { immediate: true });

// 生成命名结果
const results = computed<NameResult[]>(() => {
  if (currentTokens.value.length === 0) return [];
  return generateNames(currentTokens.value, mode.value);
});

// 是否无匹配
const noMatch = computed(() => {
  if (!inputText.value.trim()) return false;
  const matched = currentTokens.value.filter((t) => t.matched);
  return matched.length === 0;
});

// 复制到剪贴板
async function handleCopy(name: string) {
  const success = await copyToClipboard(name);
  if (success) {
    toastMessage.value = "复制成功";
    showToast.value = true;
    // 记录历史
    await addHistory(
      inputText.value,
      results.value.map((r) => r.name)
    );
  }
}

// 选择历史记录
function handleSelectHistory(input: string) {
  inputText.value = input;
  showHistory.value = false;
}

// 清空输入
function handleClear() {
  inputText.value = "";
}
</script>

<template>
  <div class="app">
    <TitleBar
      :mode="mode"
      :always-on-top="config.alwaysOnTop"
      :theme="config.theme"
      @update:mode="mode = $event"
      @toggle-always-on-top="toggleAlwaysOnTop"
      @toggle-theme="toggleTheme"
      @minimize="minimizeWindow"
      @maximize="maximizeWindow"
      @close="closeWindow"
    />

    <InputArea
      v-model="inputText"
      @clear="handleClear"
    />

    <ResultList
      :results="results"
      :no-match="noMatch"
      @copy="handleCopy"
    />

    <div class="bottom-bar">
      <button class="bottom-btn" @click="showHistory = true">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1C3.69 1 1 3.69 1 7s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10.5c-2.49 0-4.5-2.01-4.5-4.5S4.51 2.5 7 2.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"
            fill="currentColor"
          />
          <path
            d="M7 4v3.5l2.5 1.5"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
          />
        </svg>
        历史
      </button>
    </div>

    <HistoryPanel
      :history="history"
      :show="showHistory"
      @select="handleSelectHistory"
      @clear="clearHistory"
      @close="showHistory = false"
    />

    <Toast
      :message="toastMessage"
      :show="showToast"
      @hide="showToast = false"
    />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}

.bottom-bar {
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  border-top: 1px solid var(--border);
  background: var(--bg-secondary);
  border-radius: 0 0 12px 12px;
}

.bottom-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: none;
  background: var(--bg-tertiary);
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.bottom-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

@media (max-width: 480px) {
  .bottom-bar {
    padding: 6px 8px;
    gap: 6px;
  }

  .bottom-btn {
    padding: 5px 8px;
    font-size: 11px;
    gap: 3px;
  }

  .bottom-btn svg {
    width: 12px;
    height: 12px;
  }
}

@media (max-width: 360px) {
  .bottom-bar {
    padding: 4px 6px;
  }

  .bottom-btn {
    padding: 4px 6px;
    font-size: 0;
  }

  .bottom-btn svg {
    width: 14px;
    height: 14px;
  }
}
</style>
