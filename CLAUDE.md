# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A desktop application for Chinese frontend developers that generates camelCase variable/function names from Chinese descriptions. Works fully offline with a local dictionary. Built with Electrobun + Vue 3 + Vite.

## Tech Stack

- **Runtime**: Bun (Electrobun requires Bun)
- **Desktop Framework**: Electrobun 1.18.1
- **Frontend**: Vue 3.5 with Composition API + TypeScript
- **Build**: Vite 6 with `@vitejs/plugin-vue`
- **Key Dependency**: `pinyin-pro` for Chinese character processing

## Development Commands

```bash
# Development with HMR (recommended)
bun run dev:hmr

# Build and run (no HMR)
bun run start

# Development with file watching
bun run dev

# Production build
bun run build:canary
```

## Architecture

### Two-Process Model (Electrobun)

The app uses Electrobun's IPC architecture:

1. **Bun Process** (`src/bun/index.ts`): Main process with system access
   - Creates `BrowserWindow` and `Tray`
   - Handles file I/O, clipboard, window management via RPC
   - Data stored in `./data/` directory (dict.json, history.json, config.json)

2. **Webview Process** (`src/mainview/`): Vue 3 frontend
   - Communicates with Bun process via typed RPC (`useRpc.ts`)
   - No direct filesystem access - all operations go through RPC

### Key Directories

```
src/
├── bun/
│   └── index.ts          # Main process: window, tray, RPC handlers
└── mainview/
    ├── App.vue            # Root component, orchestrates all features
    ├── utils/
    │   ├── dictionary.ts  # Chinese-English word mappings (500+ entries)
    │   ├── tokenizer.ts   # Maximum matching segmentation
    │   └── naming.ts      # Name generation rules (variable/function modes)
    ├── composables/
    │   ├── useRpc.ts      # IPC bridge to Bun process
    │   ├── useDictionary.ts # Dictionary CRUD operations
    │   ├── useHistory.ts  # History management (max 20 items)
    │   └── useConfig.ts   # Theme/always-on-top settings
    └── components/        # UI components (TitleBar, InputArea, ResultList, etc.)
```

### RPC Schema

All Bun↔Webview communication uses typed RPC defined in both `src/bun/index.ts` and `src/mainview/composables/useRpc.ts`:

- `readFile` / `writeFile`: Local file operations
- `copyToClipboard`: System clipboard access
- `setAlwaysOnTop`: Window pinning
- `openInEditor`: Open files with system default editor
- `getDataPath`: Get application data directory path

### Naming Generation Logic

The core algorithm in `src/mainview/utils/naming.ts`:

1. **Tokenization**: Maximum matching against dictionary (`tokenizer.ts`)
2. **Stop word filtering**: Removes common Chinese particles
3. **Name generation**: Based on mode:
   - **Variable mode**: Nouns, optional `is` prefix for boolean states
   - **Function mode**: Verb + noun combinations, `handle`/`on` prefixes
4. **Output**: 3-5 camelCase suggestions, max 4 words each

### Data Storage

All data stored locally in `./data/`:
- `dict.json`: Customizable Chinese-English dictionary
- `history.json`: Last 20 naming results
- `config.json`: Theme and window settings

## Build Configuration

- Vite root: `src/mainview`
- Output: `dist/` → copied to `views/mainview/` by Electrobun
- TypeScript strict mode enabled
- No unused locals/parameters allowed

## Key Constraints

- **Offline only**: No network requests in production
- **Windows primary**: Targets Windows 10/11 (32/64-bit)
- **Fixed window size**: 600x500px, compact design
- **Dark/Light themes**: CSS variables with `data-theme` attribute
