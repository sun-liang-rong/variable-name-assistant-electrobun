import { Electroview } from "electrobun/view";
import { ref, onMounted } from "vue";

type AppRPCSchema = {
  bun: {
    requests: {
      readFile: { params: { path: string }; response: string | null };
      writeFile: { params: { path: string; content: string }; response: boolean };
      copyToClipboard: { params: { text: string }; response: boolean };
      setAlwaysOnTop: { params: { enabled: boolean }; response: boolean };
      openInEditor: { params: { path: string }; response: boolean };
      getDataPath: { params: Record<string, never>; response: string };
    };
    messages: {
      closeWindow: void;
      minimizeWindow: void;
      maximizeWindow: void;
    };
  };
  webview: {
    requests: {};
    messages: {};
  };
};

// RPC 返回的实际类型（包含 request 和 send 代理）
interface RPCInstance {
  request: {
    readFile: (params: { path: string }) => Promise<string | null>;
    writeFile: (params: { path: string; content: string }) => Promise<boolean>;
    copyToClipboard: (params: { text: string }) => Promise<boolean>;
    setAlwaysOnTop: (params: { enabled: boolean }) => Promise<boolean>;
    openInEditor: (params: { path: string }) => Promise<boolean>;
    getDataPath: (params: Record<string, never>) => Promise<string>;
  };
  send: {
    closeWindow: () => void;
    minimizeWindow: () => void;
    maximizeWindow: () => void;
  };
  setTransport: (transport: unknown) => void;
}

let rpcInstance: RPCInstance | null = null;
let initPromise: Promise<void> | null = null;

function initRpc() {
  if (initPromise) return initPromise;

  initPromise = new Promise<void>((resolve) => {
    const rpc = Electroview.defineRPC<AppRPCSchema>({
      handlers: {
        requests: {},
        messages: {},
      },
    }) as unknown as RPCInstance;

    rpcInstance = rpc;
    new Electroview({ rpc: rpc as any });
    resolve();
  });

  return initPromise;
}

export function useRpc() {
  const ready = ref(false);

  onMounted(async () => {
    await initRpc();
    ready.value = true;
  });

  async function readFile(path: string): Promise<string | null> {
    await initRpc();
    return rpcInstance!.request.readFile({ path });
  }

  async function writeFile(path: string, content: string): Promise<boolean> {
    await initRpc();
    return rpcInstance!.request.writeFile({ path, content });
  }

  async function copyToClipboard(text: string): Promise<boolean> {
    await initRpc();
    return rpcInstance!.request.copyToClipboard({ text });
  }

  async function setAlwaysOnTop(enabled: boolean): Promise<boolean> {
    await initRpc();
    return rpcInstance!.request.setAlwaysOnTop({ enabled });
  }

  async function openInEditor(path: string): Promise<boolean> {
    await initRpc();
    return rpcInstance!.request.openInEditor({ path });
  }

  async function getDataPath(): Promise<string> {
    await initRpc();
    return rpcInstance!.request.getDataPath({});
  }

  function closeWindow() {
    rpcInstance!.send.closeWindow();
  }

  function minimizeWindow() {
    rpcInstance!.send.minimizeWindow();
  }

  function maximizeWindow() {
    rpcInstance!.send.maximizeWindow();
  }

  return {
    ready,
    readFile,
    writeFile,
    copyToClipboard,
    setAlwaysOnTop,
    openInEditor,
    getDataPath,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
  };
}
