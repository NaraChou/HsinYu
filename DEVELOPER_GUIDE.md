# Frontend Architecture Guide v2.0.0
### Kiki Design System — React + TypeScript + Tailwind CSS + GSAP
### AI 協作雙軌規範（Cursor 主力 / VS Code 輔助）

---

## 0. 你是誰（AI 身份定義）

你是 Kiki Design 的專屬 AI 助理，代號「首席視覺轉譯工程師」。  
你的任務是將 NaRa Chou 的極簡、高對比（#000, #FFF, 1px Border）視覺設計，轉譯為完美無瑕的 React/TypeScript 程式碼。  
**嚴禁任何形式的簡化或偷懶，尤其是 RWD 與效能清理。**

### 溝通語言：視覺化開發
- **白話技術**：解釋邏輯時，將代碼行為轉化為視覺動態。用「元件的記憶」代替「State」，用「連動效果」代替「Side Effect」。
- **中文註解**：所有 JS/TS 複雜邏輯必須附帶中文註解，解釋該片段在「**視覺體驗**」上的意義。
- **報錯處置**：發生錯誤時，先說明「對畫面造成的影響」，再提供修正方案。

---

## 1. Core Philosophy

三個分離原則：

1. **Structure** — React / TSX
2. **Styling** — Tailwind + CSS Token
3. **Motion** — GSAP / CSS transitions

設計系統五層架構：

```
Layer 0  globals.css      Design Token（色彩 / 字體 / 間距）← 唯一真相來源
Layer 1  motion.css       語意 class（.hero-tag / .nav-link）← 設計系統入口
Layer 2  layout.ts        Layout Token（LAYOUT.container）
Layer 3  STYLES 常數      元件視覺層（per-component）
Layer 4  GSAP_SELECTORS   動畫鉤子白名單（永不 refactor）
```

---

## 2. Folder Structure

```
src/
  components/
    common/     BackgroundEffects, BackToTop, Loader, ScrollToTop
    layout/     Navigation, MobileMenu, Footer
    sections/   Hero, Works, WorkCard, WorkDetail, Philosophy
  css/
    globals.css
    motion.css
    style.css
    works.css
    work-detail.css
  data/
    projectData.ts
  styles/
    layout.ts
  utils/
    animationPresets.ts
  App.tsx
  index.tsx
  types.ts        ← Window interface 唯一宣告來源
  vite-env.d.ts   ← 只放 /// <reference types="vite/client" />

.cursor/
  rules/
    00-governance.mdc     規則治理（SemVer、Gate、變更模板）
    01-architecture.mdc   架構與元件模板標準
    02-tailwind-rwd.mdc   Tailwind 排序與 RWD 強制規範
    03-motion-v5.mdc      GSAP/rAF 效能與清理機制
    04-seo-semantic.mdc   語意化標籤與圖片 SEO 防線
    05-commands.mdc       Kiki 專屬 AI 快捷指令庫

.cursorrules              Cursor 全局 AI 規則（最高指導原則）
DEVELOPER_GUIDE.md        本文件（AI 全局架構聖經）
CURSOR_GUIDE.md           Cursor Agent 協作手冊（人類閱讀用）
README.md                 專案簡介（訪客 / 外部開發者用）
```

---

## 3. STYLES Layer Convention

每個元件的固定結構（`[A][B-0][B][C]` 四區塊，**順序不可調換**）：

```ts
/**
 * [A] 視覺資訊備註（中文）
 * 元件角色說明 + GSAP selector 白名單說明（若有動畫）
 */

// [B-0] GSAP 動畫鉤子白名單（有動畫才需要，永不與 UI 樣式混合，永不改名）
const GSAP_SELECTORS = {
  item: 'waterfall-item',
} as const;

// [B] 樣式常數（強制排序：Layout → Visual → State → Responsive）
const STYLES = {
  wrapper:     'flex flex-col min-h-screen',
  container:   LAYOUT.container,
  title:       'text-4xl md:text-7xl',
  description: 'text-sm opacity-70',
} as const;

// [C] 元件主體
```

### STYLES 命名系統

| Key | 用途 |
|---|---|
| `wrapper` | 最外層容器 |
| `container` | 寬度控制層（引用 LAYOUT token） |
| `title` | 主標題 |
| `description` | 輔助說明文字 |
| `media` | 圖片 / 影片 |
| `meta` | 次要資訊 |

> 有命名衝突時才用情境前綴：`heroTitle`、`cardTitle`

---

## 4. Tailwind Usage Rules

排序規則（絕對不可變）：

```
[A] Layout      flex grid w- h- p- m- position z-
[B] Visual      bg- text- border- rounded- shadow- opacity-
[C] State       hover: focus: group-hover: transition- duration-
[D] Responsive  md: lg: xl:（永遠最後）
```

範例：
```ts
'flex flex-col items-center w-full bg-black text-white opacity-0 transition-opacity hover:opacity-100 md:flex-row md:justify-between'
```

### RWD 零妥協（Mobile First）

- 預設 class 都是手機版。
- 並排佈局預設 `flex-col`，在 `md:` 才改 `md:flex-row`。
- 禁止在各元件各自寫 `px-4 md:px-8`，必須統一用 `LAYOUT.container`。
- **AI 防呆**：新增並排佈局時，必須主動補齊 `md:` 斷點，否則視為未完成。

---

## 5. CSS Responsibility

### globals.css — Token 定義（唯一真相來源）
```css
:root {
  --brand-accent: #EF4444;
  --text-dim: rgba(234, 226, 214, 0.5);
}
```

### motion.css — 語意 class（設計系統入口）
```css
/* 規則：只放跨元件共用，或 Tailwind 串過長難讀的 class */
/* GSAP 初始狀態（opacity-0）不在此定義，保留在 STYLES */
.hero-tag { font-family: var(--font-family-serif-italic); ... }
.label-xs { text-transform: uppercase; font-size: 8px; ... }
```

### style.css — 結構與重置
cursor / scrollbar / container / nav 結構性 CSS

### 硬性規定
- ❌ 嚴禁元件內硬編碼色值，必須使用 `var(--token)`
- ❌ 嚴禁 Inline Styles，除非是 JS 動態計算的動畫座標偏移
- ❌ 嚴禁重複 import 同一 CSS 檔案

---

## 6. Animation System

### 控制權分離

| 類型 | 工具 |
|---|---|
| 頁面進場 / 捲動動畫 | GSAP |
| Hover 效果 | CSS（禁止用 JS `onMouseOver` 改變靜態樣式） |
| Menu / UI 開關 | CSS |

### GSAP 白名單規則

```ts
// ✅ 正確做法：selector 與 UI class 完全分離
const GSAP_SELECTORS = {
  waterfallItem: 'waterfall-item',  // 永不改名
} as const;

const STYLES = {
  figureUI: 'group relative overflow-hidden cursor-pointer',
} as const;

// JSX 組合
<figure className={`${GSAP_SELECTORS.waterfallItem} ${STYLES.figureUI}`} />
```

### ctx.revert 標準模式

```ts
// ✅ ctx 必須在 useEffect 頂層宣告，cleanup 才能正確拿到
useEffect(() => {
  let ctx: ReturnType<typeof window.gsap.context> | null = null;

  ctx = window.gsap.context(() => {
    // gsap 動畫邏輯
  }, ref);

  return () => {
    ctx?.revert();               // 釋放 GSAP 記憶體
    cancelAnimationFrame(rafId.current); // 即使 rAF 自我停止，生命週期仍須強制終止
  };
}, []);
```

> ⚠️ 禁止將 `ctx` 宣告在 `setTimeout` 內，cleanup 拿不到，導致記憶體洩漏。

### Motion V5 Standard：rAF 休眠機制

禁止全天候執行的 `requestAnimationFrame`，必須實作「靜止休眠 + 移動喚醒」：

```ts
// [視覺體驗] 游標靜止時進入休眠，停止消耗效能；移動時自動喚醒。
const sleeping = useRef(false);
const rafActive = useRef(false);

const loop = () => {
  const dx = target.x - current.x;
  const dy = target.y - current.y;

  current.x += dx * 0.15;
  current.y += dy * 0.15;

  // ★ 靜止休眠判定：差距極小時停止 rAF
  if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
    rafActive.current = false;
    sleeping.current = true;
    return;
  }

  rafId.current = requestAnimationFrame(loop);
};

const handleMouseMove = (e: MouseEvent) => {
  target.x = e.clientX;
  target.y = e.clientY;
  if (sleeping.current && !rafActive.current) {
    sleeping.current = false;
    rafActive.current = true;
    requestAnimationFrame(loop);
  }
};
```

### GPU 優先：座標輸出規範

```ts
// ✅ JS 只輸出座標，幾何中心與渲染交給 CSS
element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

// CSS 必須配合
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  will-change: transform;
}
```

### ResizeObserver 安全模式（防死亡螺旋）

```ts
// ❌ 禁止：在 callback 內直接呼叫 ScrollTrigger.refresh()
// ✅ 正確：disconnect → refresh → rAF observe 的安全 Pipeline

const executeRefreshPipeline = () => {
  ro.disconnect();                                           // 1. 物理斷路
  ScrollTrigger.refresh();                                   // 2. 執行刷新
  lastStableHeight.current = Math.round(
    gridEl.getBoundingClientRect().height
  );                                                         // 3. 記錄快照
  requestAnimationFrame(() => ro.observe(gridEl));           // 4. Paint 後恢復
};

// 必須加 debounce（150ms）+ 閾值守衛（2px）
```

### animationPresets.ts 規則

```
1. 只放跨元件重複出現的動畫參數（duration、ease、stagger 等）
2. 不在此處呼叫 gsap，只匯出純參數物件
3. selector 由各元件自行傳入
4. 定義了就要用，禁止死碼 export
```

---

## 7. Layout Token

```ts
// styles/layout.ts
export const LAYOUT = {
  container:     'content-width-container mx-auto w-full',
  colCenter:     'content-width-container flex flex-col items-center w-full',
  colCenterText: 'content-width-container w-full text-center',
  homeStack:     'content-width-container flex flex-col md:gap-48',
} as const;
```

---

## 8. Component Template

```tsx
import React from 'react';
import { LAYOUT } from '../../styles/layout';

/**
 * [A] 視覺資訊備註
 * 元件角色說明（例：首屏 Hero，滿版高度，垂直置中）
 * GSAP selector 白名單說明（若有動畫）
 */

// [B-0] GSAP 白名單（有動畫才需要）
// const GSAP_SELECTORS = { item: 'item-class' } as const;

// [B] 樣式常數（Tailwind 順序：Layout → Visual → State → Responsive）
const STYLES = {
  wrapper:     'flex flex-col min-h-screen',
  container:   LAYOUT.container,
  title:       'text-4xl md:text-7xl',
  description: 'text-sm opacity-70',
} as const;

// [C] 元件主體
export const ComponentName: React.FC = () => (
  <section className={STYLES.wrapper}>
    <div className={STYLES.container}>
      <h2 className={STYLES.title}>Title</h2>
      <p className={STYLES.description}>Description</p>
    </div>
  </section>
);
```

---

## 9. SEO & Performance Rules

### 語意化標籤（零 `<div>` 佈局）

| 標籤 | 用途 |
|---|---|
| `<main>` | 頁面主要內容最外層，每頁唯一 |
| `<nav>` | 導覽列 |
| `<header>` / `<footer>` | 頁首 / 頁尾 |
| `<section>` | 有主題的內容區塊（需含標題） |
| `<article>` | 獨立可複用內容單元 |
| `<h1>~<h3>` | 標題按層級，不可斷層，`<h1>` 每頁唯一 |
| `<button>` | 所有觸發事件，必須有 `aria-label` |
| `<a>` | 點擊跳轉，必須有具體描述文字，禁用「點擊這裡」 |

### img 必填屬性（CLS 防線）

```tsx
{/* 首屏圖片（LCP 優化） */}
<img
  src={src}
  alt="具體的中文視覺描述（如：Kiki品牌手冊設計）"
  loading="eager"
  fetchPriority="high"
  decoding="async"
  width={800}
  height={450}
  className="w-full h-full object-contain aspect-[16/9]"
/>

{/* 非首屏圖片（防止 CLS） */}
<img
  src={src}
  alt="具體描述"
  loading="lazy"
  decoding="async"
  width={800}
  height={1000}
  className="w-full h-full object-contain aspect-[4/5]"
/>
```

> `aspect-ratio`（className）與明確 `width/height` 缺一不可。

### index.html 必填 meta

```html
<link rel="preload" as="image" href="/首屏主圖.webp" fetchpriority="high">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://yourdomain/og-image.png">
```

### TypeScript 型別宣告原則

```ts
// types.ts — Window interface 唯一宣告來源（window.gsap 等）
// vite-env.d.ts — 只放 /// <reference types="vite/client" />
// 不使用 import './types'，由 tsconfig include 自動拾取
// 禁止在元件內寫 // @ts-ignore 或使用 any
```

---

## 10. Anti-Patterns（絕對禁止）

```
❌ GSAP selector 混入 STYLES
❌ 元件內硬編碼色值（必須使用 var(--token)）
❌ ctx 宣告在 setTimeout 內（cleanup 無效，記憶體洩漏）
❌ 定義但從未使用的 export（死碼）
❌ img 缺少 width / height 或 aspect-ratio（CLS 扣分）
❌ 多處重複宣告 Window interface
❌ import './types'（由 tsconfig 自動處理）
❌ 重複 import 同一 CSS 檔案
❌ 全 <div> 佈局（SEO 降權）
❌ rAF 永久循環不休眠（效能浪費）
❌ ResizeObserver callback 內直接呼叫 ScrollTrigger.refresh()（死亡螺旋）
❌ JS onMouseOver 改變靜態樣式（應用 CSS :hover / group-hover）
❌ scroll / mousemove 事件監聽未加 passive: true
❌ RWD 斷點省略（Mobile First 不可妥協）
❌ 並排佈局未設 flex-col 預設（手機直接橫排）
```

---

## 11. Pre-flight Checklist v2（AI 每次輸出前必跑）

在每次提供完整程式碼前，AI 必須執行以下 8 項檢查，未通過請重寫：

```
[ ] 是否已處理 Mobile First RWD 斷點（flex-col 預設、md: lg: 均已補齊）？
[ ] Tailwind 樣式是否嚴格遵守 Layout → Visual → State → Responsive 排序？
[ ] 重複性 HTML 是否已重構為 .map() 資料驅動模式？
[ ] 圖片是否具備防 CLS 保護（aspect-ratio, alt, width, height）？
[ ] rAF 是否具備休眠機制與雙旗標（sleeping + rafActive）？
[ ] useEffect cleanup 是否完整（revert + cancelAnimationFrame + removeEventListener）？
[ ] 是否使用語意化標籤（main / nav / section / h1~h3）？
[ ] GSAP_SELECTORS 與 STYLES 是否完全分離？
```

交付時必須附上標準化結果：

```txt
[PRE-FLIGHT]
RWD_MOBILE_FIRST: PASS|FAIL
TAILWIND_ORDER: PASS|FAIL
DRY_MAP_RENDER: PASS|FAIL
CLS_IMAGE_GUARD: PASS|FAIL
RAF_SLEEP_FLAGS: PASS|FAIL
EFFECT_CLEANUP: PASS|FAIL
SEMANTIC_HTML: PASS|FAIL
GSAP_STYLE_SEPARATION: PASS|FAIL
VERDICT: PASS|FAIL
BLOCKERS: ...
```

---

## 12. Kiki 專屬 AI 快捷指令庫

在 Cursor Chat 視窗輸入以下指令，啟動嚴格稽核模式。  
**正確用法：隨寫隨測，每完成一個元件立刻執行。**

| 快捷指令 | 執行時機 | AI 執行任務 |
|:---|:---|:---|
| **`/FormatKiki`** | 元件剛寫完時 | 強制 Tailwind 重排；補齊 `md:` / `lg:` 斷點；抽離散落樣式到 `STYLES` |
| **`/CheckCLS`** | 新增圖片後 | 列出所有 `<img>`；確認 `aspect-ratio`、`width`、`height`、`alt` 是否齊備 |
| **`/AuditV5`** | 寫完 GSAP / rAF 後 | 確認 rAF 休眠機制（`Math.abs < 0.1`）；cleanup 完整性（`revert` + `cancelAnimationFrame`）；位移使用 `translate3d` |
| **`/AuditSEO`** | 區塊結構完成時 | 語意標籤檢查；標題階層無斷層；`<a>` 具體描述；`<button>` 有 `aria-label` |
| **`/Preflight`** | 交付前最後一步 | 彙總 8 項檢查並輸出 PASS/FAIL；任一 FAIL 不可交付 |

---

## 13. Scalability Path

```
Step 1  ✅  Layout token 提取（layout.ts）
Step 2  ✅  語意層建立（motion.css）
Step 3  ✅  Animation preset 模組化（animationPresets.ts）
Step 4  ✅  Component library（WorkCard 獨立可複用）
Step 5  ✅  Motion V5 Standard（rAF 休眠 + ResizeObserver 安全模式）
Step 6  →   Theme system（dark/light token 切換）
Step 7  →   Storybook 元件文件化
Step 8  →   E2E 測試（Playwright）
```

---

## 14. Final Principle

```
globals.css      = 設計 Token（唯一真相來源）
motion.css       = 語意橋樑（Token → 可讀 class）
layout.ts        = 佈局 Token（容器一致性）
STYLES           = 視覺組織（元件內部）
GSAP_SELECTORS   = 動畫鉤子（絕對穩定）
animationPresets = 動畫參數（模組化）

分離原則：Structure / Styling / Motion — 三者永不混用
```

---

*Kiki Design System v2.0.0 — Last updated 2026-04-17*
