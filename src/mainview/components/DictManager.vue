<script setup lang="ts">
import { ref } from "vue";
import { type DictEntry } from "../utils/dictionary";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  add: [entry: DictEntry];
  reset: [];
  openFile: [];
  close: [];
}>();

const newZh = ref("");
const newEn = ref("");
const newCategory = ref<DictEntry["category"]>("noun");

function onAdd() {
  if (!newZh.value.trim() || !newEn.value.trim()) return;
  emit("add", {
    zh: newZh.value.trim(),
    en: newEn.value.trim(),
    category: newCategory.value,
  });
  newZh.value = "";
  newEn.value = "";
}
</script>

<template>
  <Transition name="fade">
    <div v-if="props.show" class="dict-overlay" @click.self="emit('close')">
      <div class="dict-modal">
        <div class="dict-header">
          <span class="dict-title">词库管理</span>
          <button class="close-btn" @click="emit('close')">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <div class="dict-body">
          <div class="add-form">
            <input
              v-model="newZh"
              type="text"
              class="form-input"
              placeholder="中文词汇"
              maxlength="20"
            />
            <input
              v-model="newEn"
              type="text"
              class="form-input"
              placeholder="英文编程词汇"
              maxlength="30"
            />
            <select v-model="newCategory" class="form-select">
              <option value="noun">名词</option>
              <option value="verb">动词</option>
              <option value="status">状态词</option>
              <option value="ui">UI组件</option>
              <option value="business">业务词</option>
            </select>
            <button class="add-btn" @click="onAdd">添加</button>
          </div>

          <div class="dict-actions">
            <button class="action-btn" @click="emit('openFile')">
              打开词库文件
            </button>
            <button class="action-btn danger" @click="emit('reset')">
              重置词库
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.dict-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.dict-modal {
  width: 320px;
  background: var(--bg-secondary);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.dict-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}

.dict-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s;
}

.close-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.dict-body {
  padding: 16px;
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.form-input {
  height: 36px;
  padding: 0 12px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 13px;
  outline: none;
  transition: border-color 0.15s;
}

.form-input:focus {
  border-color: var(--accent);
}

.form-select {
  height: 36px;
  padding: 0 12px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 13px;
  outline: none;
  cursor: pointer;
}

.add-btn {
  height: 36px;
  border: none;
  background: var(--accent);
  color: white;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.15s;
}

.add-btn:hover {
  opacity: 0.9;
}

.dict-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  flex: 1;
  height: 36px;
  border: 1px solid var(--border);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
}

.action-btn:hover {
  background: var(--bg-hover);
}

.action-btn.danger {
  color: var(--danger);
  border-color: var(--danger);
}

.action-btn.danger:hover {
  background: var(--danger);
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .dict-modal {
    width: calc(100vw - 32px);
    max-width: 320px;
  }

  .dict-body {
    padding: 12px;
  }

  .dict-header {
    padding: 10px 12px;
  }
}

@media (max-width: 360px) {
  .dict-modal {
    width: calc(100vw - 16px);
    border-radius: 8px;
  }

  .form-input {
    height: 32px;
    font-size: 12px;
  }

  .form-select {
    height: 32px;
    font-size: 12px;
  }

  .add-btn {
    height: 32px;
    font-size: 12px;
  }

  .action-btn {
    height: 32px;
    font-size: 12px;
  }
}
</style>
