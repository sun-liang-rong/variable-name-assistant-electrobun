/**
 * 复制图标文件到构建目录
 * 这个脚本在构建后运行，将图标文件复制到正确的位置
 */

import { existsSync, mkdirSync, copyFileSync, readdirSync } from "fs";
import { join } from "path";

const projectRoot = process.cwd();
const buildDir = join(projectRoot, "build");

// 找到最新的构建目录
function findLatestBuild(): string | null {
  if (!existsSync(buildDir)) return null;

  const platforms = readdirSync(buildDir);
  for (const platform of platforms) {
    const platformDir = join(buildDir, platform);
    const apps = readdirSync(platformDir).filter((f) => f.endsWith(".app"));
    if (apps.length > 0) {
      // 返回最新的app目录
      return join(platformDir, apps[apps.length - 1]);
    }
  }
  return null;
}

function copyIcons() {
  const appDir = findLatestBuild();
  if (!appDir) {
    console.log("未找到构建目录，跳过图标复制");
    return;
  }

  const resourcesDir = join(appDir, "Contents", "Resources");
  const viewsDir = join(resourcesDir, "app", "views", "mainview", "assets", "icons");

  // 确保目标目录存在
  if (!existsSync(viewsDir)) {
    mkdirSync(viewsDir, { recursive: true });
  }

  // 复制 AppIcon.icns
  const icnsSource = join(projectRoot, "assets", "icons", "AppIcon.icns");
  const icnsTarget = join(resourcesDir, "AppIcon.icns");
  if (existsSync(icnsSource)) {
    copyFileSync(icnsSource, icnsTarget);
    console.log("✓ 复制 AppIcon.icns");
  }

  // 复制托盘图标
  const trayIcons = ["trayTemplate.png", "trayTemplate@2x.png"];
  for (const icon of trayIcons) {
    const source = join(projectRoot, "assets", "icons", icon);
    const target = join(viewsDir, icon);
    if (existsSync(source)) {
      copyFileSync(source, target);
      console.log(`✓ 复制 ${icon}`);
    }
  }

  console.log("图标复制完成！");
}

copyIcons();
