document.addEventListener("DOMContentLoaded", () => {
  console.log("🌌 Galaxy background running");

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
  for (let i = 0; i < 1000; i++) {
    stars.push({
      r: Math.random() * Math.max(w, h),
      a: Math.random() * Math.PI * 2,
      s: 0.00006 + Math.random() * 0.00022,
      size: Math.random() * 1.6 + 0.4,
      tw: Math.random() * Math.PI * 2
    });
  }

  /* =========================
     🌕 MOON
  ========================= */
  const moon = {
    y: h + 160,
    radius: 100,
    speed: 0.02
  };

  /* =========================
     🪐 RINGED PLANET
  ========================= */
  const planet = {
    angle: Math.random() * Math.PI * 2,
    orbit: 320,
    size: 46,
    speed: 0.00005
  };

  function drawStars() {
    stars.forEach(star => {
      star.a += star.s * 16;
      star.tw += 0.02;

      const x = w / 2 + Math.cos(star.a) * star.r;
      const y = h / 2 + Math.sin(star.a) * star.r;

      const alpha = 0.6 + Math.sin(star.tw) * 0.25;

      ctx.beginPath();
      ctx.arc(x, y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    });
  }

  function drawMoon() {
    if (moon.y > h - 190) moon.y -= moon.speed;

    const x = w * 0.18;
    const y = moon.y;

    const grad = ctx.createRadialGradient(
      x - 30, y - 30, 30,
      x, y, moon.radius
    );
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(1, "#d8d8f2");

    ctx.beginPath();
    ctx.arc(x, y, moon.radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.shadowBlur = 50;
    ctx.shadowColor = "rgba(220,220,255,0.6)";
    ctx.fill();
  }

  function drawPlanet() {
    planet.angle += planet.speed * 16;

    const cx = w * 0.75;
    const cy = h * 0.28;

    const x = cx + Math.cos(planet.angle) * planet.orbit;
    const y = cy + Math.sin(planet.angle) * planet.orbit;

    // Planet body
    ctx.beginPath();
    ctx.arc(x, y, planet.size, 0, Math.PI * 2);
    ctx.fillStyle = "#ffb7d5";
    ctx.shadowBlur = 35;
    ctx.shadowColor = "rgba(255,180,220,0.7)";
    ctx.fill();

    // Ring
    ctx.beginPath();
    ctx.ellipse(
      x, y,
      planet.size * 1.9,
      planet.size * 0.65,
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
