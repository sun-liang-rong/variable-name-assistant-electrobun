# 词典下载指南

## 需要下载的词典文件

### 1. ECDICT (英中词典)
- **下载地址**: https://github.com/skywind3000/ECDICT/releases
- **文件**: `ecdict.csv` 或 `stardict.csv`
- **大小**: 约200MB (ecdict.csv) 或 50MB (stardict.csv)
- **词汇量**: 770,000+ 条

### 2. CC-CEDICT (中英词典)
- **下载地址**: https://www.mdbg.net/chinese/dictionary?page=cc-cedict
- **文件**: `cedict_ts.u8`
- **大小**: 约15MB
- **词汇量**: 120,000+ 条

## 下载步骤

1. 访问上述链接
2. 下载文件到 `scripts/dict-source/` 目录
3. 运行转换脚本

## 文件放置位置

```
scripts/dict-source/
├── ecdict.csv          # 或 stardict.csv
├── cedict_ts.u8
└── README.md
```

## 下载完成后

运行以下命令转换词典：

```bash
bun run scripts/convert-dict.ts
```

转换后的词典将保存到：
```
src/mainview/utils/
├── large-dictionary.ts      # 现有词库
├── ecdict-converted.ts      # ECDICT转换后
└── cedict-converted.ts      # CC-CEDICT转换后
```
