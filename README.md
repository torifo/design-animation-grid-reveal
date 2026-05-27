# A1 · グリッドリビール

> グリッド線が逐次描画され、コンテンツが面のなかに落ちてくるヒーロー演出。Stripe / Linear 風の静かな立ち上がり。

**Live demo**: `./index.html`

## 概要

| 項目 | 内容 |
|---|---|
| ジャンル | A · 幾何学・パターン |
| 用途 | ① ローディング / ヒーロー |
| 主な参考 | Stripe, Linear |
| 依存 | なし（Pure HTML + CSS + Vanilla JS） |
| 推奨配置 | ファーストビュー、セクションの切り替わり |

## 仕組み

1. JS が `.grid-reveal` の実寸を測り、`--gr-cell` 間隔で SVG `<line>` を生成
2. 水平線（上 → 下）→ 垂直線（左 → 右）の順に `--i` インデックスを振り、CSS の `stroke-dashoffset` アニメーションで一本ずつ描画
3. 全線の描画完了時刻 = `(線本数 × --gr-stagger + --gr-draw)` を JS が計算し、`--gr-reveal-base` に設定
4. CSS が `data-reveal="N"` のついたコンテンツ要素をその時刻から順番にフェードイン

## 組み込み手順

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

## カスタマイズ可能な CSS 変数

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

## アクセシビリティ

`@media (prefers-reduced-motion: reduce)` を尊重し、モーション削減設定が ON のユーザーには線描画とフェードを全てスキップ（即時表示）する。

## 制約 / 既知の挙動

- ウィンドウリサイズで線が再描画される（debounce 200ms）
- SVG は `viewBox` を実寸で再設定するため、`preserveAspectRatio="none"` を維持
- `data-reveal` は 1〜6 まで CSS に index を仕込んである。それ以上必要な場合は `style.css` に `[data-reveal="7"]{--n:7}` のような行を追加

## ライセンス

ANIMATION DESIGN STUDY の一部として公開（コピペ自由）。
