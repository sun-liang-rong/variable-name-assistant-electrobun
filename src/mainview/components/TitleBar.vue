<script setup lang="ts">
import { type NamingMode } from "../utils/naming";

const props = defineProps<{
  mode: NamingMode;
  alwaysOnTop: boolean;
  theme: "dark" | "light";
}>();

const emit = defineEmits<{
  "update:mode": [value: NamingMode];
  toggleAlwaysOnTop: [];
  toggleTheme: [];
  minimize: [];
  maximize: [];
  close: [];
}>();
</script>

<template>
  <div class="title-bar electrobun-webkit-app-region-drag">
    <!-- 窗口控制按钮（左侧） -->
    <div class="window-controls electrobun-webkit-app-region-no-drag">
      <button
        class="window-btn close"
        title="关闭"
        @click="emit('close')"
      />
      <button
        class="window-btn minimize"
        title="最小化"
        @click="emit('minimize')"
      />
      <button
        class="window-btn maximize"
        title="最大化"
        @click="emit('maximize')"
      />
    </div>
    <div class="title">变量命名助手</div>
    <div class="controls electrobun-webkit-app-region-no-drag">
      <!-- 置顶按钮 -->
      <button
        class="icon-btn"
        :class="{ active: props.alwaysOnTop }"
        :title="props.alwaysOnTop ? '取消置顶' : '窗口置顶'"
        @click="emit('toggleAlwaysOnTop')"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path v-if="props.alwaysOnTop" d="M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1 1 1 0 0 1 1 1z" :stroke="'var(--accent)'" />
          <path v-else d="M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1 1 1 0 0 1 1 1z" />
        </svg>
      </button>
      <!-- 主题切换按钮 -->
      <button
        class="icon-btn"
        :title="props.theme === 'dark' ? '切换浅色' : '切换深色'"
        @click="emit('toggleTheme')"
      >
        <!-- 太阳图标（浅色主题时显示） -->
        <svg v-if="props.theme === 'light'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
        <!-- 月亮图标（深色主题时显示） -->
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
    </div>
    <div class="mode-switch electrobun-webkit-app-region-no-drag">
      <label
        class="mode-label"
        :class="{ active: props.mode === 'variable' }"
      >
        <input
          type="radio"
          name="mode"
          value="variable"
          :checked="props.mode === 'variable'"
          @change="emit('update:mode', 'variable')"
        />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="4 7 4 4 20 4 20 7" />
          <line x1="9" y1="20" x2="15" y2="20" />
          <line x1="12" y1="4" x2="12" y2="20" />
        </svg>
        变量名
      </label>
      <label
        class="mode-label"
        :class="{ active: props.mode === 'function' }"
      >
        <input
          type="radio"
          name="mode"
          value="function"
          :checked="props.mode === 'function'"
          @change="emit('update:mode', 'function')"
        />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        函数名
      </label>
    </div>
  </div>
</template>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  user-select: none;
}

.window-controls {
  display: flex;
  gap: 8px;
}

.window-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
}

.window-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.15s;
}

.window-btn:hover::after {
  opacity: 1;
}

.window-btn.close {
  background: #ff5f57;
}

.window-btn.close:hover {
  background: #ff3b30;
}

.window-btn.close::after {
  width: 8px;
  height: 2px;
  background: #4d0000;
  transform: translate(-50%, -50%) rotate(45deg);
}

.window-btn.close::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 2px;
  background: #4d0000;
  transform: translate(-50%, -50%) rotate(-45deg);
  opacity: 0;
  transition: opacity 0.15s;
}

.window-btn.close:hover::before {
  opacity: 1;
}

.window-btn.minimize {
  background: #febc2e;
}

.window-btn.minimize:hover {
  background: #f5a623;
}

.window-btn.minimize::after {
  width: 8px;
  height: 2px;
  background: #995700;
}

.window-btn.maximize {
  background: #28c840;
}

.window-btn.maximize:hover {
  background: #1aab29;
}

.window-btn.maximize::after {
  width: 6px;
  height: 6px;
  border: 2px solid #006500;
  border-radius: 1px;
  background: transparent;
}

.title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
}

.controls {
  display: flex;
  gap: 4px;
  margin-left: auto;
}

.icon-btn {
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

.icon-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.icon-btn.active {
  background: var(--bg-active);
  color: var(--accent);
}

.mode-switch {
  display: flex;
  gap: 2px;
  background: var(--bg-tertiary);
  border-radius: 6px;
  padding: 2px;
}

.mode-label {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  font-size: 12px;
  color: var(--text-secondary);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
}

.mode-label input {
  display: none;
}

.mode-label.active {
  background: var(--accent);
  color: white;
}

@media (max-width: 480px) {
  .title-bar {
    padding: 6px 8px;
    gap: 6px;
  }

  .title {
    font-size: 12px;
  }

  .mode-label {
    padding: 4px 6px;
    font-size: 0;
    gap: 0;
  }

  .mode-label svg {
    width: 14px;
    height: 14px;
  }

  .icon-btn {
    width: 24px;
    height: 24px;
  }

  .icon-btn svg {
    width: 14px;
    height: 14px;
  }
}

@media (max-width: 360px) {
  .title {
    display: none;
  }

  .title-bar {
    padding: 4px 6px;
  }
}
</style>
