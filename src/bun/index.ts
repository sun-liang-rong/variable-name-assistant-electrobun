import { BrowserWindow, BrowserView, Tray, Utils } from "electrobun/bun";
import { Updater } from "electrobun/bun";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";

const DEV_SERVER_PORT = 5173;
const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`;

// 数据目录（应用同目录下的 data 文件夹）
const DATA_DIR = join(process.cwd(), "data");

// 确保数据目录存在
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

// RPC Schema 类型定义
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

// 主窗口引用（RPC 消息处理器需要）
let mainWindow: BrowserWindow;

// RPC 处理器
const rpc = BrowserView.defineRPC<AppRPCSchema>({
  handlers: {
    requests: {
      readFile: ({ path }: { path: string }) => {
        try {
          if (existsSync(path)) {
            return readFileSync(path, "utf-8");
          }
          return null;
        } catch {
          return null;
        }
      },
      writeFile: ({ path, content }: { path: string; content: string }) => {
        try {
          const dir = dirname(path);
          if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
          }
          writeFileSync(path, content, "utf-8");
          return true;
        } catch {
          return false;
        }
      },
      copyToClipboard: ({ text }: { text: string }) => {
        try {
          Utils.clipboardWriteText(text);
          return true;
        } catch {
          return false;
        }
      },
      setAlwaysOnTop: ({ enabled }: { enabled: boolean }) => {
        try {
          mainWindow.setAlwaysOnTop(enabled);
          return true;
        } catch {
          return false;
        }
      },
      openInEditor: ({ path }: { path: string }) => {
        try {
          Utils.openPath(path);
          return true;
        } catch {
          return false;
        }
      },
      getDataPath: () => {
        return DATA_DIR;
      },
    },
    messages: {
      closeWindow: () => mainWindow.close(),
      minimizeWindow: () => mainWindow.minimize(),
      maximizeWindow: () => {
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize();
        } else {
          mainWindow.maximize();
        }
      },
    },
  },
});

// 检查 Vite dev server
async function getMainViewUrl(): Promise<string> {
  const channel = await Updater.localInfo.channel();
  if (channel === "dev") {
    try {
      await fetch(DEV_SERVER_URL, { method: "HEAD" });
      console.log(`HMR enabled: Using Vite dev server at ${DEV_SERVER_URL}`);
      return DEV_SERVER_URL;
    } catch {
      console.log(
        "Vite dev server not running. Run 'bun run dev:hmr' for HMR support."
      );
    }
  }
  return "views://mainview/index.html";
}

// 创建主窗口
const url = await getMainViewUrl();

mainWindow = new BrowserWindow({
  title: "变量命名助手",
  url,
  frame: {
    width: 600,
    height: 500,
    minWidth: 320,
    minHeight: 280,
    x: 200,
    y: 200,
  },
  titleBarStyle: "hidden",
  rpc,
});

// 系统托盘
const tray = new Tray({
  title: "变量命名助手",
});

tray.setMenu([
  {
    type: "normal",
    label: "显示窗口",
    action: "show",
  },
  { type: "separator" },
  {
    type: "normal",
    label: "退出",
    action: "quit",
  },
]);

tray.on("tray-clicked", () => {
  mainWindow.show();
  mainWindow.activate();
});

// 窗口关闭时隐藏到托盘而非退出
mainWindow.on("close", () => {
  // 允许正常关闭
});

console.log("变量命名助手已启动！");
