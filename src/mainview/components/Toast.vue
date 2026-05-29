<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  message: string;
  show: boolean;
}>();

const emit = defineEmits<{
  hide: [];
}>();

const visible = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;

watch(
  () => props.show,
  (val) => {
    if (val) {
      visible.value = true;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        visible.value = false;
        emit("hide");
      }, 2000);
    }
  }
);
</script>

<template>
  <Transition name="toast">
    <div v-if="visible" class="toast">
      {{ props.message }}
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 20px;
  background: var(--accent);
  color: white;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  pointer-events: none;
}

.toast-enter-active {
  transition: all 0.2s ease;
}

.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}
</style>
