# 杨雪 · YANG XUE — 作品集网站（基础版）

React + Vite。PC 优先，版心 ~1700px。中 / 英双语（先中文），科技感、克制、留白。

## 运行

```bash
cd site
npm install
npm run dev        # http://127.0.0.1:5173
npm run build      # 生产构建 -> dist/
```

## 图片处理

源图在上一级目录（`项目图片/`、`过往品牌活动海报/`、`生活碎片/`）。
转换 + 压缩脚本（HEIC→JPG、缩放到 web 尺寸、生成清单）：

```bash
node scripts/build-assets.mjs
```

输出到 `public/assets/`，清单写入 `src/data/media.json`。新增/更换源图后重跑即可。

## 结构

- `src/i18n/` — 文案（`zh.js` 中文 / `en.js` 英文），切换语言在导航栏。
- `src/sections/` — 各版块：Nav / About / Projects / Posters / Strengths / Interests / Contact。
- `src/components/` — StarBorder、Dock（React Bits）、Particles（粒子交互）、Logotype（YANG XUE，U 动效）、Reveal（滚动入场）。

## 待补充（占位）

- **人物图**：`About` 里 `.portrait` 目前是占位，替换为真实照片。
- **精选项目文字说明**：卡片与灯箱都留了说明区（`descPlaceholder`），后期在 `src/i18n/zh.js` 的 `projects` 里补。
- **简历 PDF**：`About` 的「查看简历」按钮待接入链接。
- **NEIGE**：兴趣版块的按钮链接待接入真实 App 地址。
- **英文文案**：`en.js` 为功能性翻译，后续精修。
