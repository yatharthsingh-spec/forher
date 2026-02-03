document.addEventListener("DOMContentLoaded", () => {
  console.log("🌌 background.js started safely");

  const canvas = document.getElementById("space");
  if (!canvas) {
    console.error("❌ Canvas #space not found");
    return;
  }

  const ctx = canvas.getContext("2d");
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const stars = [];
  const CENTER = () => ({ x: w / 2, y: h / 2 });

  for (let i = 0; i < 600; i++) {
    stars.push({
      r: Math.random() * Math.max(w, h),
      a: Math.random() * Math.PI * 2,
      s: 0.0001 + Math.random() * 0.0003,
      size: Math.random() * 1.6 + 0.4,
      hue: 220 + Math.random() * 100
    });
  }

  function animate(time) {
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, w, h);

    stars.forEach(star => {
      star.a += star.s * 16;

      const x = CENTER().x + Math.cos(star.a) * star.r;
      const y = CENTER().y + Math.sin(star.a) * star.r;

      ctx.beginPath();
      ctx.arc(x, y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${star.hue},100%,85%,0.8)`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
