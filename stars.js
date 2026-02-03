document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("space");
  const ctx = canvas.getContext("2d");

  let w, h;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const stars = [];

  for (let i = 0; i < 800; i++) {
    stars.push({
      r: Math.random() * Math.max(w, h),
      a: Math.random() * Math.PI * 2,
      s: 0.0001 + Math.random() * 0.0003,
      size: Math.random() * 1.5 + 0.5
    });
  }

  function animate() {
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, w, h);

    stars.forEach(star => {
      star.a += star.s * 16;

      const x = w / 2 + Math.cos(star.a) * star.r;
      const y = h / 2 + Math.sin(star.a) * star.r;

      ctx.beginPath();
      ctx.arc(x, y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
});
