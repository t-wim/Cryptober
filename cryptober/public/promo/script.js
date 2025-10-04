(function () {
  const el = document.getElementById('countdown');
  const target = new Date(new Date().getFullYear(), 9, 31, 23, 59, 59);
  function tick() {
    const diff = +target - Date.now();
    if (diff <= 0) {
      el.textContent = 'It’s Uptober time! 🎃';
      return;
    }
    const s = Math.floor(diff / 1000) % 60;
    const m = Math.floor(diff / 60000) % 60;
    const h = Math.floor(diff / 3600000) % 24;
    const d = Math.floor(diff / 86400000);
    el.textContent = `${d}d ${h}h ${m}m ${s}s`;
    requestAnimationFrame(() => setTimeout(tick, 250));
  }
  tick();
})();
