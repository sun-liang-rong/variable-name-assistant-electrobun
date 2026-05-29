import { ref, onMounted } from "vue";
import { useRpc } from "./useRpc";

export interface HistoryItem {
  input: string;
  results: string[];
  timestamp: number;
}

const HISTORY_FILENAME = "history.json";
const MAX_HISTORY = 20;

export function useHistory() {
  const history = ref<HistoryItem[]>([]);
  const dataPath = ref("");
  const { readFile, writeFile, getDataPath } = useRpc();

  async function loadHistory() {
    try {
      dataPath.value = await getDataPath();
      const historyPath = `${dataPath.value}/${HISTORY_FILENAME}`;
      const content = await readFile(historyPath);
      if (content) {
        const parsed = JSON.parse(content) as HistoryItem[];
        if (Array.isArray(parsed)) {
          history.value = parsed.slice(0, MAX_HISTORY);
        }
      }
    } catch {
      // 空历史
    }
  }

  async function saveHistory() {
    const historyPath = `${dataPath.value}/${HISTORY_FILENAME}`;
    await writeFile(historyPath, JSON.stringify(history.value, null, 2));
  }

  async function addHistory(input: string, results: string[]) {
    const item: HistoryItem = {
      input,
      results,
      timestamp: Date.now(),
    };
    // 去重（相同输入）
    history.value = history.value.filter((h) => h.input !== input);
    history.value.unshift(item);
    if (history.value.length > MAX_HISTORY) {
      history.value = history.value.slice(0, MAX_HISTORY);
    }
    await saveHistory();
  }

  async function clearHistory() {
    history.value = [];
    await saveHistory();
  }

  onMounted(() => {
    loadHistory();
  });

  return {
    history,
    addHistory,
    clearHistory,
    loadHistory,
  };
}
