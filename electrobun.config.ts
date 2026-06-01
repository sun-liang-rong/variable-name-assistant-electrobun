import type { ElectrobunConfig } from "electrobun";

export default {
	app: {
		name: "变量命名助手",
		identifier: "com.variable-name-assistant.app",
		version: "0.0.1",
	},
	build: {
		// Vite builds to dist/, we copy from there
		copy: {
			"dist/index.html": "views/mainview/index.html",
			"dist/assets": "views/mainview/assets",
			"assets/icons/trayTemplate.png": "views/icons/trayTemplate.png",
			"assets/icons/trayTemplate@2x.png": "views/icons/trayTemplate@2x.png",
		},
		// Ignore Vite output in watch mode — HMR handles view rebuilds separately
		watchIgnore: ["dist/**"],
		mac: {
			bundleCEF: false,
			// 指定应用图标文件夹（.iconset 格式）
			icons: "assets/icons/AppIcon.iconset",
		},
		linux: {
			bundleCEF: false,
		},
		win: {
			bundleCEF: false,
		},
	},
} satisfies ElectrobunConfig;
