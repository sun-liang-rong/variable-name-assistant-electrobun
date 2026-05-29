<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
  clear: [];
}>();

const maxLength = 50;
const inputValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val;
  }
);

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  let val = target.value;
  // 自动过滤虚词（简单处理：不在这里过滤，而是在生成时过滤）
  if (val.length > maxLength) {
    val = val.slice(0, maxLength);
  }
  inputValue.value = val;
  emit("update:modelValue", val);
}

function onClear() {
  inputValue.value = "";
  emit("update:modelValue", "");
  emit("clear");
}
</script>

<template>
  <div class="input-area">
    <input
      ref="inputRef"
      type="text"
      class="input-field"
      :value="inputValue"
      :maxlength="maxLength"
      placeholder="输入中文描述，如：用户列表、获取数据"
      @input="onInput"
    />
    <button class="clear-btn" title="清空" @click="onClear">
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
</template>

<style scoped>
.input-area {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--bg-primary);
}

.input-field {
  flex: 1;
  height: 36px;
  padding: 0 12px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-mono);
  outline: none;
  transition: border-color 0.15s;
}

.input-field::placeholder {
  color: var(--text-tertiary);
  font-family: var(--font-sans);
}

.input-field:focus {
  border-color: var(--accent);
}

.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: var(--bg-tertiary);
  border-radius: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s;
}

.clear-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

@media (max-width: 480px) {
  .input-area {
    padding: 6px 8px;
    gap: 6px;
  }

  .input-field {
    height: 32px;
    padding: 0 8px;
    font-size: 13px;
  }

  .clear-btn {
    width: 28px;
    height: 28px;
  }
}

@media (max-width: 360px) {
  .input-area {
    padding: 4px 6px;
  }

  .input-field {
    height: 28px;
    font-size: 12px;
  }
}
</style>
