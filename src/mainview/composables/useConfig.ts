import { ref, onMounted } from "vue";
import { useRpc } from "./useRpc";

export interface AppConfig {
  theme: "dark" | "light";
  alwaysOnTop: boolean;
}

const CONFIG_FILENAME = "config.json";

const defaultConfig: AppConfig = {
  theme: "dark",
  alwaysOnTop: false,
};

export function useConfig() {
  const config = ref<AppConfig>({ ...defaultConfig });
  const dataPath = ref("");
  const { readFile, writeFile, getDataPath, setAlwaysOnTop } = useRpc();

  async function loadConfig() {
    try {
      dataPath.value = await getDataPath();
      const configPath = `${dataPath.value}/${CONFIG_FILENAME}`;
      const content = await readFile(configPath);
      if (content) {
        const parsed = JSON.parse(content) as Partial<AppConfig>;
        config.value = { ...defaultConfig, ...parsed };
      }
    } catch {
      // 使用默认配置
    }
    // 应用主题
    applyTheme(config.value.theme);
  }

  async function saveConfig() {
    const configPath = `${dataPath.value}/${CONFIG_FILENAME}`;
    await writeFile(configPath, JSON.stringify(config.value, null, 2));
  }

  function applyTheme(theme: "dark" | "light") {
    document.documentElement.setAttribute("data-theme", theme);
  }

  async function toggleTheme() {
    config.value.theme = config.value.theme === "dark" ? "light" : "dark";
    applyTheme(config.value.theme);
    await saveConfig();
  }

  async function toggleAlwaysOnTop() {
    config.value.alwaysOnTop = !config.value.alwaysOnTop;
    await setAlwaysOnTop(config.value.alwaysOnTop);
    await saveConfig();
  }

  onMounted(() => {
    loadConfig();
  });

  return {
    config,
    toggleTheme,
    toggleAlwaysOnTop,
    loadConfig,
  };
}
