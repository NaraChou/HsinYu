# 🪄 Kiki Design x Cursor Agent: 專案級 AI 協作手冊

> **核心理念**：Cursor 不是幫你寫扣的打字機，而是受你指揮的「首席前端工程師」。透過完善的雙軌規則系統，我們能將 AI 的能力限制在 Kiki Style 的極簡、高效能、高質感框架內。
>
> **規範版本**：`v2.0.0`（含 Rules Governance + `/Preflight` 終閘門）

---

## 🧠 核心概念：AI 協作的「雙軌制」

### 🚂 軌道一：背景自動防禦網（`.cursor/rules/*.mdc`）
- **定位**：「交通警察 / 隨身警報器」
- **運作方式**：`00-governance.mdc` 定義規則升級流程；AI 打開 `.tsx` 時才讀 `02-tailwind-rwd.mdc`；你下達指令時才讀 `05-commands.mdc`。不佔用多餘 Token。
- **優點**：你日常改 Code 時**完全不需理會它**，它在背景自動約束 AI 的 RWD、動畫清理與語意標籤。

### 🚂 軌道二：全局架構聖經（`DEVELOPER_GUIDE.md`）
- **定位**：「國家憲法 / 維基百科」
- **運作方式**：完整記錄全站脈絡、五層架構與所有工程原則。
- **使用時機**：進行**架構大改**或**一口氣生成多個新頁面**時，在對話框手動 `@DEVELOPER_GUIDE.md`，強迫 AI 先閱讀全站邏輯再動工。

---

## 📦 新專案環境繼承（Setup）

開啟全新專案時，第一時間完成「AI 腦內植入」：

1. **複製雙軌規範**：將 `.cursorrules`、`DEVELOPER_GUIDE.md`、`CURSOR_GUIDE.md` 與 `.cursor/rules/`（含 `00~05.mdc`）整個複製到新專案根目錄。
2. **驗證載入**：開啟 Cursor Chat（`Cmd+L` / `Ctrl+L`），輸入：
   > 「請確認你是否已讀取 Kiki Design System 的開發規範，並說明五層架構各層的職責。」
3. **確認 AI 回答正確**後再開始開發。

---

## 🗂️ 專案架構樹（精準版）

```text
kikidesign/                                        # [01] 專案根目錄
├── .cursor/                                       # [02] Cursor 規則系統
│   └── rules/                                     # [03] AI 規則卡
│       ├── 00-governance.mdc                      # [04] 規則治理（版本/Gate）
│       ├── 01-architecture.mdc                    # [05] 架構模板規範
│       ├── 02-tailwind-rwd.mdc                    # [06] Tailwind + RWD 規範
│       ├── 03-motion-v5.mdc                       # [07] 動畫效能規範
│       ├── 04-seo-semantic.mdc                    # [08] SEO 語意規範
│       └── 05-commands.mdc                        # [09] 指令卡規範
├── .github/                                       # [10] CI/CD 設定
│   └── workflows/
│       └── deploy.yml                             # [11] 部署工作流
├── docs/                                          # [12] 文件模板（可選）
│   └── TEAM_GUIDE.template.md                     # [13] 團隊版模板骨架
├── public/                                        # [14] 靜態公開資源
│   ├── apple-touch-icon.png                       # [15] iOS 主畫面圖示
│   ├── favicon-16x16.png                          # [16] favicon 16
│   ├── favicon-32x32.png                          # [17] favicon 32
│   ├── favicon-48x48.png                          # [18] favicon 48
│   ├── favicon.ico                                # [19] 瀏覽器圖示
│   ├── og-image.png                               # [20] 社群分享圖
│   ├── robots.txt                                 # [21] 爬蟲規則
│   └── site.webmanifest                           # [22] PWA manifest
├── src/                                           # [23] 應用程式原始碼
│   ├── assets/                                    # [24] 品牌與作品素材
│   │   ├── images/
│   │   │   ├── ai-lab-cover.webp                  # [25] 圖資：AI 封面
│   │   │   ├── ai-slide-behavior-logic.webp       # [26] 圖資：AI 簡報
│   │   │   ├── ai-tool-accounting.webp            # [27] 圖資：AI 工具
│   │   │   ├── ai-tool-fortune.webp               # [28] 圖資：AI 工具
│   │   │   ├── branding-ai-portfolio-cover.webp   # [29] 圖資：品牌作品
│   │   │   ├── branding-dark-ui-landing.webp      # [30] 圖資：品牌作品
│   │   │   ├── branding-mockup-main.webp          # [31] 圖資：品牌作品
│   │   │   ├── branding-responsive-showcase.webp  # [32] 圖資：品牌作品
│   │   │   ├── branding-ui-education-app.webp     # [33] 圖資：品牌作品
│   │   │   ├── ecommerce-feminine-pink-portrait.webp
│   │   │   │                                        # [34] 圖資：電商作品
│   │   │   ├── ecommerce-home-convenience-landscape.webp
│   │   │   │                                        # [35] 圖資：電商作品
│   │   │   ├── ecommerce-luxury-gold-landscape.webp
│   │   │   │                                        # [36] 圖資：電商作品
│   │   │   ├── ecommerce-mockup.webp              # [37] 圖資：電商作品
│   │   │   ├── edm-behavior-logic.webp            # [38] 圖資：EDM
│   │   │   ├── logo-branding-stationery.webp      # [39] 圖資：Logo 應用
│   │   │   ├── logo-kiki-2020.webp                # [40] 圖資：品牌 Logo
│   │   │   ├── logo-kiki-2025-brand.webp          # [41] 圖資：品牌 Logo
│   │   │   ├── logo-kiki-coaster-mockup.webp      # [42] 圖資：Logo 應用
│   │   │   ├── logo-kiki-main.svg                 # [43] 圖資：Logo 向量
│   │   │   ├── namecard-kiki-2020.webp            # [44] 圖資：名片
│   │   │   ├── namecard-kiki-2025-back.webp       # [45] 圖資：名片
│   │   │   ├── namecard-kiki-2025-front.webp      # [46] 圖資：名片
│   │   │   ├── namecard-kiki-2025-mockup-concrete.webp
│   │   │   │                                        # [47] 圖資：名片 mockup
│   │   │   ├── namecard-kiki-2025-mockup-foam.webp
│   │   │   │                                        # [48] 圖資：名片 mockup
│   │   │   ├── poster-mockup-main.webp            # [49] 圖資：海報
│   │   │   ├── poster-rabbit-bear-onsite.webp     # [50] 圖資：海報
│   │   │   ├── poster-rabbit-bear-recruitment.webp
│   │   │   │                                        # [51] 圖資：海報
│   │   │   ├── practice-comp-01.webp              # [52] 練習圖資
│   │   │   ├── practice-comp-02.webp              # [53] 練習圖資
│   │   │   ├── practice-comp-cloud.webp           # [54] 練習圖資
│   │   │   ├── practice-comp-elephant.webp        # [55] 練習圖資
│   │   │   ├── practice-font-audi.webp            # [56] 練習圖資
│   │   │   ├── practice-font-light.webp           # [57] 練習圖資
│   │   │   ├── practice-illust-rabbit.webp        # [58] 練習圖資
│   │   │   ├── practice-illust-zodiac.webp        # [59] 練習圖資
│   │   │   ├── practice-lab-cover.webp            # [60] 練習圖資
│   │   │   ├── practice-layout-col2-01.webp       # [61] 練習圖資
│   │   │   ├── practice-layout-col2-02.webp       # [62] 練習圖資
│   │   │   ├── practice-layout-col3-01.webp       # [63] 練習圖資
│   │   │   ├── practice-layout-dm-back.webp       # [64] 練習圖資
│   │   │   ├── practice-layout-dm-front.webp      # [65] 練習圖資
│   │   │   ├── practice-layout-poster-01.webp     # [66] 練習圖資
│   │   │   ├── practice-layout-poster-02.webp     # [67] 練習圖資
│   │   │   ├── practice-logo-hejia.webp           # [68] 練習圖資
│   │   │   ├── practice-ui-character.webp         # [69] 練習圖資
│   │   │   └── practice-ui-game.webp              # [70] 練習圖資
│   │   ├── logo-kiki-2025.webp                    # [71] 品牌資產
│   │   ├── logo-kiki-256.png                      # [72] 品牌資產
│   │   ├── logo-kiki-512.png                      # [73] 品牌資產
│   │   ├── logo-kiki-main.svg                     # [74] 品牌資產
│   │   ├── logo-kiki-md.png                       # [75] 品牌資產
│   │   └── logo-kiki-sm.png                       # [76] 品牌資產
│   ├── components/                                # [77] React 元件
│   │   ├── Home.tsx                               # [78] 首頁組裝元件（你提到的 Home）
│   │   ├── common/
│   │   │   ├── BackToTop.tsx                      # [79] 回頂端
│   │   │   ├── BackgroundEffects.tsx              # [80] 背景特效
│   │   │   ├── Loader.tsx                         # [81] 載入動畫
│   │   │   └── ScrollToTop.tsx                    # [82] 路由切換捲頂
│   │   ├── layout/
│   │   │   ├── Footer.tsx                         # [83] 頁尾
│   │   │   ├── MobileMenu.tsx                     # [84] 行動選單
│   │   │   └── Navigation.tsx                     # [85] 導覽列
│   │   └── sections/
│   │       ├── Hero.tsx                           # [86] 首屏區塊
│   │       ├── Philosophy.tsx                     # [87] 品牌理念區塊
│   │       ├── WorkCard.tsx                       # [88] 作品卡片
│   │       ├── WorkDetail.tsx                     # [89] 作品詳情
│   │       └── Works.tsx                          # [90] 作品列表區塊
│   ├── css/
│   │   ├── globals.css                            # [91] CSS 1/5：Token 層
│   │   ├── motion.css                             # [92] CSS 2/5：動態語意層
│   │   ├── style.css                              # [93] CSS 3/5：全域結構層
│   │   ├── work-detail.css                        # [94] CSS 4/5：作品內頁層
│   │   └── works.css                              # [95] CSS 5/5：作品列表層
│   ├── data/
│   │   └── projectData.ts                         # [96] 作品資料 SSOT
│   ├── styles/
│   │   └── layout.ts                              # [97] 版型 token
│   ├── utils/
│   │   └── animationPresets.ts                    # [98] GSAP 參數預設
│   ├── App.tsx                                    # [99] App 入口
│   ├── index.tsx                                  # [100] React 掛載點
│   ├── types.ts                                   # [101] 全域型別宣告
│   └── vite-env.d.ts                              # [102] Vite 型別參考
├── .cursorrules                                   # [103] 全域最高規範
├── .env.local                                     # [104] 本機環境變數（不入版控）
├── .gitignore                                     # [105] Git 忽略規則
├── CURSOR_GUIDE.md                                # [106] 使用者手冊
├── DEVELOPER_GUIDE.md                             # [107] AI 架構聖經
├── README.md                                      # [108] 對外說明
├── index.html                                     # [109] HTML 外殼
├── metadata.json                                  # [110] 站點 metadata
├── package-lock.json                              # [111] 鎖版依賴
├── package.json                                   # [112] scripts 與依賴
├── tsconfig.json                                  # [113] TypeScript 設定
└── vite.config.ts                                 # [114] Vite 設定
```

---

## ✅ 新專案複製清單 + 驗收 SOP（5 分鐘版）

### A. 新專案複製清單（先複製再開工）

- [ ] `.cursorrules`
- [ ] `.cursor/rules/00-governance.mdc`
- [ ] `.cursor/rules/01-architecture.mdc`
- [ ] `.cursor/rules/02-tailwind-rwd.mdc`
- [ ] `.cursor/rules/03-motion-v5.mdc`
- [ ] `.cursor/rules/04-seo-semantic.mdc`
- [ ] `.cursor/rules/05-commands.mdc`
- [ ] `DEVELOPER_GUIDE.md`
- [ ] `CURSOR_GUIDE.md`

> 若來源檔名是 `_cursorrules`，放到專案根目錄後請改名為 `.cursorrules`。

### B. 5 分鐘驗收 SOP（可直接照做）

1. **第 0-1 分鐘：檔案到位檢查**
   - 確認專案根目錄有 `.cursorrules`。
   - 確認 `.cursor/rules/` 內有 `00~05.mdc` 共 6 份。

2. **第 1-2 分鐘：AI 載入檢查**
   - 在 Cursor Chat 貼上：
     - 「請列出此專案規範版本、P0~P3 優先級、Pre-flight 8 項，並說明 `/Preflight` 用途。」
   - 驗收標準：
     - 必須答出 `v2.0.0`、`00-governance.mdc`、`/Preflight`、`GSAP_SELECTORS` 與 `STYLES` 分離。

3. **第 2-3 分鐘：命令流程檢查**
   - 在 Cursor Chat 針對任一頁面檔案執行：
     - `/FormatKiki`
     - `/CheckCLS`
     - `/AuditSEO`
     - `/Preflight`
   - 驗收標準：
     - 必須輸出 `[PRE-FLIGHT]` 區塊與 `VERDICT`、`BLOCKERS` 欄位。

4. **第 3-5 分鐘：建置檢查**
   - 執行：
     - `npm.cmd run build`
   - 驗收標準：
     - build 成功且無中斷錯誤。

### C. 最終放行條件（全部符合才算可沿用）

- [ ] `[PRE-FLIGHT]` 的 8 項皆為 `PASS`
- [ ] `VERDICT: PASS`
- [ ] `BLOCKERS` 為空或標示 `None`
- [ ] `npm.cmd run build` 成功

---

## 🗣️ 與 AI 的溝通心法（Prompting Rules）

### ❌ 錯誤的詠唱（AI 會偷懶、忘記 RWD、亂寫 inline style）
> 「幫我做一個作品列表，要有圖片跟標題，滑過去要有動畫。」

### ✅ 正確的詠唱（啟動防禦機制）
> 「請依照 `.cursor/rules` 的架構標準，幫我實作『作品列表元件』：
> 1. 資料用 array `.map()` 渲染（DRY 原則）。
> 2. 圖片必須具備防 CLS 保護（aspect-ratio + width + height）。
> 3. Hover 動畫使用 Tailwind `group-hover:`，禁止 JS onMouseOver。
> 4. 手機垂直排列（`flex-col`），桌機才並排（`md:flex-row`）。」

---

## 🚀 Cursor 核心功能實戰

| 快捷鍵 | 模式 | 適合情境 |
|---|---|---|
| `Cmd+L` | Chat 聊天 | 架構討論、執行快捷指令、代碼健檢 |
| `Cmd+I` | Composer 生成器 | 跨檔案大規模重構、一次建立多個元件 |
| `Cmd+K` | Inline Edit 行內編輯 | 局部微調、重排 Tailwind class |

**Composer 使用技巧**：大改時先 `@DEVELOPER_GUIDE.md`，讓 AI 讀完架構聖經再動工。

---

## ⚡ 快捷指令說明書（Kiki Commands）

⚠️ **核心觀念：隨寫隨測，不要等全站完成才檢查。**

| 快捷指令 | 執行時機 | AI 執行的防禦任務 |
|:---|:---|:---|
| **`/FormatKiki`** | 元件剛寫完時 | 強制 Tailwind 重排為 `Layout → Visual → State → Responsive`；補齊遺漏 RWD 斷點；抽離散落樣式到 `STYLES` |
| **`/CheckCLS`** | 新增圖片後 | 列出所有 `<img>`；逐一確認 `aspect-ratio`、`width`、`height`、`alt`、`loading` 策略 |
| **`/AuditV5`** | 寫完 GSAP / rAF 後 | 確認 rAF 休眠機制（`Math.abs < 0.1`）；cleanup 完整性（`revert` + `cancelAnimationFrame`）；位移使用 `translate3d` 非 `top/left` |
| **`/AuditSEO`** | 區塊結構完成時 | 語意標籤（div 過度使用？`main`/`nav`/`article` 是否到位？）；標題階層無斷層；`<a>` 具體描述；`<button>` 有 `aria-label` |
| **`/Preflight`** | 交付前最後一步 | 彙總 8 項 Pre-flight（PASS/FAIL）並輸出阻塞項；任一 FAIL 不可交付 |

---

## 🚑 常見災情與應對指南

| 災情 | 修正指令 |
|---|---|
| AI 亂寫 `style={{...}}` | 「停！你違反了禁絕 Inline Styles 的規定。請全部改用 Tailwind 類別或寫入 `STYLES` 常數。」 |
| 手機版排版跑版 | 「你忘記 Mobile First 規則了。以手機版垂直佈局為預設，將並排邏輯移至 `md:flex-row`，重新生成。」 |
| GSAP 讓網頁變超卡 | 「對這個元件執行 `/AuditV5`，檢查是否漏寫 `cancelAnimationFrame` 或把位移寫在 `top/left`。」 |
| AI 幻覺、找不到檔案 | 在對話框輸入 `@` 選擇正確的檔案路徑（如 `@layout.ts`），強迫讀取正確上下文。 |
| 新元件偏離五層架構 | 「請先閱讀 `@DEVELOPER_GUIDE.md` 的 Section 1 和 Section 3，再重新生成這個元件。」 |

---

## 💡 日常開發起手式（Daily Workflow）

1. **大改前**：`Cmd+I` ➜ 「請閱讀 `@DEVELOPER_GUIDE.md`，規劃新功能後再動工。」
2. **建立元件**：`Cmd+I` ➜ 「依照 `01-architecture.mdc` 模板建立 `Hero.tsx`」
3. **樣式開發**：`Cmd+K` ➜ 「加上 Kiki Style 的黑底白字」
4. **加入動畫**：Chat 討論 GSAP 邏輯，selector 放進 `GSAP_SELECTORS`。
5. **驗收**：`Cmd+L` ➜ 「對 `@Hero.tsx` 執行 `/FormatKiki`、`/CheckCLS`、`/AuditSEO`」
6. **交付前終檢**：`Cmd+L` ➜ 「執行 `/Preflight`，輸出 PASS/FAIL 與 BLOCKERS」
7. **收工**。
