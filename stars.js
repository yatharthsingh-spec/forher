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

  /* =========================
     ⭐ STAR FIELD
  ========================= */
  const stars = [];
  for (let i = 0; i < 900; i++) {
    stars.push({
      r: Math.random() * Math.max(w, h),
      a: Math.random() * Math.PI * 2,
      s: 0.00008 + Math.random() * 0.00025,
      size: Math.random() * 1.4 + 0.4
    });
  }

  /* =========================
     🌕 MOON
  ========================= */
  const moon = {
    y: h + 140,
    radius: 95,
    speed: 0.025
  };

  /* =========================
     🪐 RINGED PLANET
  ========================= */
  const planet = {
    angle: Math.random() * Math.PI * 2,
    orbit: 280,
    size: 44,
    speed: 0.00006
  };

  function drawStars() {
    stars.forEach(star => {
      star.a += star.s * 16;

      const x = w / 2 + Math.cos(star.a) * star.r;
      const y = h / 2 + Math.sin(star.a) * star.r;

      ctx.beginPath();
      ctx.arc(x, y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fill();
    });
  }

  function drawMoon() {
    if (moon.y > h - 170) moon.y -= moon.speed;

    const x = w * 0.15;
    const y = moon.y;

    const grad = ctx.createRadialGradient(
      x - 20, y - 20, 30,
      x, y, moon.radius
    );
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(1, "#d6d6f0");

    ctx.beginPath();
    ctx.arc(x, y, moon.radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.shadowBlur = 45;
    ctx.shadowColor = "rgba(220,220,255,0.6)";
    ctx.fill();
  }

  function drawPlanet() {
    planet.angle += planet.speed * 16;

    const cx = w * 0.75;
    const cy = h * 0.25;

    const x = cx + Math.cos(planet.angle) * planet.orbit;
    const y = cy + Math.sin(planet.angle) * planet.orbit;

    // Planet body
    ctx.beginPath();
    ctx.arc(x, y, planet.size, 0, Math.PI * 2);
    ctx.fillStyle = "#ffb7d5";
    ctx.shadowBlur = 30;
    ctx.shadowColor = "rgba(255,180,220,0.7)";
    ctx.fill();

    // Ring
    ctx.beginPath();
    ctx.ellipse(
      x, y,
      planet.size * 1.8,
      planet.size * 0.6,
      0.6,
      0, Math.PI * 2
    );
    ctx.strokeStyle = "rgba(255,220,235,0.55)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  /* =========================
     🔁 ANIMATION LOOP
  ========================= */
  function animate() {
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, w, h);

    drawStars();
    drawPlanet();
    drawMoon();

    requestAnimationFrame(animate);
  }

  animate();
});
