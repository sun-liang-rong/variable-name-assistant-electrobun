import { ref, onMounted } from "vue";
import { DEFAULT_DICTIONARY, type Dictionary, type DictEntry } from "../utils/dictionary";
import { useRpc } from "./useRpc";

const DICT_FILENAME = "dict.json";

export function useDictionary() {
  const dictionary = ref<Dictionary>([...DEFAULT_DICTIONARY]);
  const dataPath = ref("");
  const { readFile, writeFile, getDataPath, openInEditor } = useRpc();

  async function loadDictionary() {
    try {
      dataPath.value = await getDataPath();
      const dictPath = `${dataPath.value}/${DICT_FILENAME}`;
      const content = await readFile(dictPath);
      if (content) {
        const parsed = JSON.parse(content) as Dictionary;
        if (Array.isArray(parsed) && parsed.length > 0) {
          dictionary.value = parsed;
        }
      }
    } catch {
      // 使用默认词库
    }
  }

  async function saveDictionary() {
    const dictPath = `${dataPath.value}/${DICT_FILENAME}`;
    await writeFile(dictPath, JSON.stringify(dictionary.value, null, 2));
  }

  async function addWord(zh: string, en: string, category: DictEntry["category"]) {
    // 去重
    const exists = dictionary.value.find((d) => d.zh === zh);
    if (exists) {
      exists.en = en;
      exists.category = category;
    } else {
      dictionary.value.push({ zh, en, category });
    }
    await saveDictionary();
  }

  async function resetDictionary() {
    dictionary.value = [...DEFAULT_DICTIONARY];
    await saveDictionary();
  }

  async function openDictFile() {
    const dictPath = `${dataPath.value}/${DICT_FILENAME}`;
    await openInEditor(dictPath);
  }

  onMounted(() => {
    loadDictionary();
  });

  return {
    dictionary,
    addWord,
    resetDictionary,
    openDictFile,
    loadDictionary,
  };
}
