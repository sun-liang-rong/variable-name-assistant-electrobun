# 词典整合指南

## 当前状态

✅ 已完成：
- 集成nodejieba中文分词库
- 创建大型本地词库（5000+条）
- 实现智能分词算法

## 下一步：整合开源词典

### 1. 下载ECDICT词典

**下载地址**: https://github.com/skywind3000/ECDICT/releases

选择以下任一文件：
- `ecdict.csv` - 完整版（约200MB，770,000+词条）
- `stardict.csv` - 精简版（约50MB，300,000+词条）

**下载步骤**：
1. 访问上述链接
2. 下载 `stardict.csv`（推荐精简版）
3. 将文件放到 `scripts/dict-source/` 目录

### 2. 转换词典格式

```bash
# 转换ECDICT到我们的格式
bun run scripts/convert-ecdict.ts
```

转换后的文件将保存到：
```
src/mainview/utils/ecdict-converted.ts
```

### 3. 整合词典

编辑 `src/mainview/utils/dictionary.ts`，添加ECDICT词典：

```typescript
import { LARGE_DICTIONARY } from "./large-dictionary";
import { ECDICT_CONVERTED } from "./ecdict-converted";

export const DEFAULT_DICTIONARY: Dictionary = [
  ...LARGE_DICTIONARY,
  ...ECDICT_CONVERTED,
];
```

### 4. 重新构建

```bash
bun run build:canary
```

## 词典对比

| 词典 | 词汇量 | 大小 | 说明 |
|------|--------|------|------|
| 当前词库 | 5,000+ | 50KB | 基础编程术语 |
| ECDICT精简版 | 300,000+ | 50MB | 英中词典 |
| ECDICT完整版 | 770,000+ | 200MB | 英中词典 |
| CC-CEDICT | 120,000+ | 15MB | 中英词典 |

## 预期效果

整合ECDICT后：
- **词汇覆盖**: 95%+
- **翻译准确率**: 90%+
- **应用体积**: 增加约50-200MB
- **启动时间**: 增加约1-2秒（词典加载）

## 性能优化

### 词典懒加载

```typescript
// 只在需要时加载词典
let ecdictLoaded = false;
let ecdictData: Dictionary = [];

async function loadECDICT() {
  if (!ecdictLoaded) {
    const module = await import("./ecdict-converted");
    ecdictData = module.ECDICT_CONVERTED;
    ecdictLoaded = true;
  }
  return ecdictData;
}
```

### 词典索引优化

```typescript
// 使用Map优化查找
const dictIndex = new Map<string, string>();

function buildDictIndex(dict: Dictionary) {
  for (const entry of dict) {
    dictIndex.set(entry.zh, entry.en);
  }
}
```

## 故障排除

### 问题1: 下载失败

**错误**: `curl: (35) schannel: next InitializeSecurityContext failed`

**解决**:
1. 使用浏览器手动下载
2. 或使用代理下载
3. 或下载其他词典源

### 问题2: 转换失败

**错误**: `Error: ENOENT: no such file or directory`

**解决**:
1. 确认文件已下载到正确位置
2. 检查文件名是否正确
3. 检查文件编码是否为UTF-8

### 问题3: 内存不足

**错误**: `JavaScript heap out of memory`

**解决**:
1. 使用精简版词典（stardict.csv）
2. 增加Node.js内存限制：
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" bun run scripts/convert-ecdict.ts
   ```

## 其他词典资源

### CC-CEDICT (中英词典)

**下载地址**: https://www.mdbg.net/chinese/dictionary?page=cc-cedict

**文件**: `cedict_ts.u8`

**转换脚本**: 待创建

### 百度翻译词典

**下载地址**: https://github.com/search?q=chinese+english+dictionary+json

## 贡献

如果你有其他词典资源或改进建议，欢迎提交PR！

## 许可证

本项目遵循MIT许可证。
