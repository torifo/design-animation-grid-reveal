---
name: anim-grid-reveal
description: "Geometric / pattern loading / hero animation (pure HTML/CSS/JS, no deps). Use when you need a loading / hero effect with a geometric / pattern feel — e.g. ファーストビュー、セクションの切り替わり. グリッド線が逐次描画され、コンテンツが面のなかに落ちてくるヒーロー演出。Stripe / Linear 風の静かな立ち上がり。"
---

# anim-grid-reveal (A·Lo · グリッドリビール)

Pure HTML + CSS + vanilla JS, **zero dependencies**. グリッド線が逐次描画され、コンテンツが面のなかに落ちてくるヒーロー演出。Stripe / Linear 風の静かな立ち上がり。

## When to use / 使いどころ
- **EN:** a *loading / hero* effect with a *geometric / pattern* feel.
- **JP:** 幾何学・パターン × ローディング／ヒーロー。推奨配置: ファーストビュー、セクションの切り替わり

## Bundled assets / 同梱アセット
This skill folder is the reference implementation — copy from these files:
- `index.html` — full working demo (open to preview)
- `style.css` — component styles
- `script.js` — the self-contained logic
- `README.md` — full human-facing doc (JP): mechanism, accessibility, constraints

## How to apply / 組み込み手順
Copy the component CSS block from `style.css` and the script from `script.js` (no build step), then follow the markup/parameters below.

### 1. 3 ファイルをコピー

```
your-project/
├── index.html
├── grid-reveal.css     # 本ディレクトリの style.css をリネーム
└── grid-reveal.js      # 本ディレクトリの script.js をリネーム
```

### 2. マークアップ

```html
<link rel="stylesheet" href="./grid-reveal.css">

<section class="grid-reveal" data-grid-reveal>
  <svg class="gr-grid" preserveAspectRatio="none" aria-hidden="true"></svg>
  <div class="gr-content">
    <span class="gr-kicker" data-reveal="1">YOUR KICKER</span>
    <h1 class="gr-title">
      <span data-reveal="2">First line</span><br>
      <span data-reveal="3" class="accent">Second line</span>
    </h1>
    <p class="gr-lead" data-reveal="4">Description text...</p>
  </div>
</section>

<script src="./grid-reveal.js"></script>
```

### 3. data-reveal の使い方

`data-reveal="N"` の数値がリビール順。`N=1` が最初、数が大きいほど遅れて出現する（90ms 刻みのスタガー）。

## Customize / カスタマイズ
### カスタマイズ可能な CSS 変数
| 変数 | 役割 | デフォルト |
|---|---|---|
| `--gr-cell` | マス目の 1 辺サイズ | `72px` |
| `--gr-line` | グリッド線の色 | `rgba(10,10,10,.12)` |
| `--gr-line-strong` | 強調線（5 マス毎）の色 | `rgba(10,10,10,.30)` |
| `--gr-draw` | 1 本を描く時間 | `700ms` |
| `--gr-stagger` | 線と線の間隔 | `40ms` |
| `--gr-content-delay` | 線描画完了 → コンテンツ開始までの間 | `200ms` |
| `--gr-reveal` | 1 コンテンツのフェード時間 | `800ms` |

### よくある調整例

```css
/* 速いバージョン（PV 重視） */
.grid-reveal{
  --gr-draw:400ms;
  --gr-stagger:18ms;
  --gr-content-delay:0ms;
}

/* マス目を細かく */
.grid-reveal{ --gr-cell:32px; }

/* ダークモード */
.grid-reveal{
  background:#0a0a0a;
  --gr-line:rgba(255,255,255,.08);
  --gr-line-strong:rgba(255,255,255,.22);
}
```

---
> Full mechanism, accessibility and known constraints: see **`README.md`** / 詳細・機構・アクセシビリティは README.md 参照。
