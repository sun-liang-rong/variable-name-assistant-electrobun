/**
 * 变量名/函数名生成器
 * 根据分词结果生成 camelCase 命名建议
 */

import { type Token } from "./tokenizer";

export type NamingMode = "variable" | "function";

export interface NameResult {
  name: string;
  description: string;
}

/**
 * 将英文单词转为小驼峰
 */
function toCamelCase(words: string[]): string {
  if (words.length === 0) return "";
  const first = words[0].toLowerCase();
  const rest = words.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  return first + rest.join("");
}

// 状态词集合
const STATUS_WORDS = new Set([
  "loading", "loaded", "disabled", "selected", "active", "expanded", "collapsed",
  "editable", "readonly", "required", "optional", "valid", "invalid", "empty", "full",
  "online", "offline", "connected", "disconnected", "processing", "pending",
  "success", "failed", "error", "visible", "hidden", "enabled", "deleted",
  "expired", "completed", "cancelled", "closed", "opened", "locked", "unlocked",
  "published", "unpublished", "submitting", "submitted", "saving", "saved",
  "draft", "archived", "pinned", "featured", "blocked", "effective", "ineffective",
  "reviewing", "rejected", "revoked",
]);

// 动词集合
const VERB_WORDS = new Set([
  "get", "set", "create", "delete", "update", "query", "search", "import", "export",
  "upload", "download", "login", "register", "logout", "submit", "save", "load",
  "refresh", "reset", "clear", "select", "cancel", "confirm", "validate", "check",
  "verify", "send", "receive", "request", "init", "destroy", "mount", "unmount",
  "watch", "bind", "unbind", "trigger", "dispatch", "broadcast", "subscribe",
  "unsubscribe", "connect", "disconnect", "show", "hide", "expand", "collapse",
  "scroll", "drag", "drop", "copy", "paste", "cut", "undo", "redo", "navigate",
  "redirect", "convert", "format", "parse", "encode", "decode", "encrypt", "decrypt",
  "compress", "decompress", "merge", "split", "concat", "traverse", "iterate",
  "calc", "compare", "clone", "deepClone", "inject", "provide", "render", "draw",
  "print", "pause", "resume", "start", "end", "stop", "retry", "rollback",
  "preload", "throttle", "debounce", "preview", "sync", "backup", "migrate",
  "upgrade", "downgrade", "crop", "zoom", "rotate", "flip", "mirror", "align",
  "center", "lock", "unlock", "freeze", "share", "scan", "invite", "join", "leave",
  "enter", "continue", "play", "mute", "withdraw", "recharge", "transfer",
  "reconcile", "settle", "approve", "apply", "reject", "archive", "favorite",
  "like", "comment", "forward", "follow", "block", "pin", "report", "open", "close",
  "handle", "add", "remove", "edit", "modify", "ship", "receive", "sign",
  "onboard", "resign", "reimburse",
]);

function isStatus(word: string): boolean {
  return STATUS_WORDS.has(word.toLowerCase());
}

function isVerb(word: string): boolean {
  return VERB_WORDS.has(word.toLowerCase());
}

/**
 * 生成变量名推荐（最多5个）
 */
function generateVariableNames(tokens: Token[]): NameResult[] {
  const results: NameResult[] = [];
  const matched = tokens.filter((t) => t.matched && t.en);

  if (matched.length === 0) return results;

  const words = matched.map((t) => t.en!);
  const hasStatus = words.some((w) => isStatus(w));
  const hasVerb = words.some((w) => isVerb(w));

  // 规则1: 直接组合
  if (words.length <= 4) {
    results.push({ name: toCamelCase(words), description: "基础组合" });
  }

  // 规则2: is 前缀（布尔状态）
  if (hasStatus && words.length <= 3) {
    const statusWords = words.filter((w) => isStatus(w));
    results.push({ name: toCamelCase(["is", ...statusWords]), description: "布尔状态 (is前缀)" });
  }

  // 规则3: 核心词（最后2个词）
  if (words.length > 2) {
    results.push({ name: toCamelCase(words.slice(-2)), description: "核心词汇组合" });
  }

  // 规则4: 首字母缩写 + 最后一个词
  if (words.length > 2) {
    const abbr = words.slice(0, -1).map((w) => w.charAt(0).toLowerCase()).join("");
    const last = words[words.length - 1];
    results.push({ name: abbr + last.charAt(0).toUpperCase() + last.slice(1), description: "缩写组合" });
  }

  // 规则5: 前3个词
  if (words.length > 3) {
    results.push({ name: toCamelCase(words.slice(0, 3)), description: "精简组合（前3词）" });
  }

  // 规则6: 动词+名词
  if (hasVerb) {
    const verb = words.find((w) => isVerb(w));
    const nouns = words.filter((w) => !isVerb(w) && !isStatus(w));
    if (verb && nouns.length > 0) {
      results.push({ name: toCamelCase([verb, ...nouns]), description: "动词+名词组合" });
    }
  }

  // 规则7: 状态+名词
  if (hasStatus && words.length >= 2) {
    const status = words.find((w) => isStatus(w));
    const nouns = words.filter((w) => !isStatus(w));
    if (status && nouns.length > 0) {
      results.push({ name: toCamelCase([status, ...nouns]), description: "状态+名词组合" });
    }
  }

  // 去重，最多5个
  const seen = new Set<string>();
  return results.filter((r) => {
    if (seen.has(r.name)) return false;
    seen.add(r.name);
    return true;
  }).slice(0, 5);
}

/**
 * 生成函数名推荐（最多5个）
 */
function generateFunctionNames(tokens: Token[]): NameResult[] {
  const results: NameResult[] = [];
  const matched = tokens.filter((t) => t.matched && t.en);

  if (matched.length === 0) return results;

  const words = matched.map((t) => t.en!);
  const verbs = words.filter((w) => isVerb(w));
  const nouns = words.filter((w) => !isVerb(w) && !isStatus(w));

  // 规则1: 动词+名词
  if (verbs.length > 0 && nouns.length > 0) {
    results.push({ name: toCamelCase([verbs[0], ...nouns]), description: "动词+名词组合" });
  }

  // 规则2: handle 前缀（无动词时）
  if (verbs.length === 0) {
    results.push({ name: toCamelCase(["handle", ...words]), description: "handle 前缀（事件处理）" });
  }

  // 规则3: 动词+核心名词
  if (verbs.length > 0 && nouns.length > 1) {
    results.push({ name: toCamelCase([verbs[0], nouns[nouns.length - 1]]), description: "动词+核心名词" });
  }

  // 规则4: on 前缀
  if (nouns.length > 0) {
    results.push({ name: toCamelCase(["on", ...nouns]), description: "on 前缀（事件监听）" });
  }

  // 规则5: 直接组合
  if (results.length < 2 && words.length <= 4) {
    results.push({ name: toCamelCase(words), description: "直接组合" });
  }

  // 规则6: 名词+handler
  if (verbs.length === 0 && nouns.length > 0) {
    results.push({ name: toCamelCase([...nouns, "handler"]), description: "名词+handler后缀" });
  }

  // 去重，最多5个
  const seen = new Set<string>();
  return results.filter((r) => {
    if (seen.has(r.name)) return false;
    seen.add(r.name);
    return true;
  }).slice(0, 5);
}

/**
 * 根据模式生成命名推荐
 */
export function generateNames(tokens: Token[], mode: NamingMode): NameResult[] {
  if (mode === "variable") {
    return generateVariableNames(tokens);
  }
  return generateFunctionNames(tokens);
}
