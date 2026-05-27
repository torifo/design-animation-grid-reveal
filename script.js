/* ────────────────────────────────────────────
   A1 · Grid Reveal
   - 各 .grid-reveal[data-grid-reveal] を初期化
   - 視窗サイズに応じてグリッド線を生成
   - 線の描画順序を staggered で割り当て
   - 線描画完了後にコンテンツがリビールするよう
     --gr-reveal-base を動的に設定
   - REPLAY ボタンで再生
   ──────────────────────────────────────────── */

(() => {
  const init = (root) => {
    const svg = root.querySelector('.gr-grid');
    const styles = getComputedStyle(root);

    const cell = parseFloat(styles.getPropertyValue('--gr-cell')) || 72;
    const stagger = parseFloat(styles.getPropertyValue('--gr-stagger')) || 40;
    const draw = parseFloat(styles.getPropertyValue('--gr-draw')) || 700;
    const contentDelay = parseFloat(styles.getPropertyValue('--gr-content-delay')) || 200;

    const build = () => {
      const w = root.clientWidth;
      const h = root.clientHeight;
      if (!w || !h) return;

      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      svg.innerHTML = '';

      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / cell);

      // Center the grid so margins are even
      const offsetX = (w - cols * cell) / 2;
      const offsetY = (h - rows * cell) / 2;

      let i = 0;

      // ── Horizontal lines: top → bottom
      for (let r = 0; r <= rows; r++) {
        const y = offsetY + r * cell;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', 0);
        line.setAttribute('y1', y);
        line.setAttribute('x2', w);
        line.setAttribute('y2', y);
        line.style.setProperty('--len', w);
        line.style.setProperty('--i', i);
        if (r % 5 === 0) line.classList.add('strong');
        svg.appendChild(line);
        i++;
      }

      // ── Vertical lines: left → right
      for (let c = 0; c <= cols; c++) {
        const x = offsetX + c * cell;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', 0);
        line.setAttribute('x2', x);
        line.setAttribute('y2', h);
        line.style.setProperty('--len', h);
        line.style.setProperty('--i', i);
        if (c % 5 === 0) line.classList.add('strong');
        svg.appendChild(line);
        i++;
      }

      // ── Content reveals after the LAST line finishes drawing
      const totalGrid = i * stagger + draw;
      root.style.setProperty('--gr-reveal-base', `${totalGrid + contentDelay}ms`);
    };

    // Replay: clear animations, then reflow + restart
    const replay = () => {
      root.classList.add('is-replaying');
      // Force a reflow so animation restarts cleanly
      void root.offsetHeight;
      requestAnimationFrame(() => {
        root.classList.remove('is-replaying');
        build();
      });
    };

    root.querySelector('[data-replay]')?.addEventListener('click', replay);

    // Build on init + on resize (debounced)
    build();
    let t;
    window.addEventListener('resize', () => {
      clearTimeout(t);
      t = setTimeout(replay, 200);
    });
  };

  document.querySelectorAll('[data-grid-reveal]').forEach(init);
})();
