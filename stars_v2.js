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

  /* ⭐ STARS */
  const stars = [];
  for (let i = 0; i < 1200; i++) {
    stars.push({
      baseR: Math.random() * Math.max(w, h),
      r: 0,
      a: Math.random() * Math.PI * 2,
      s: 0.00005 + Math.random() * 0.00022,
      size: Math.random() * 1.8 + 0.4,
      tw: Math.random() * Math.PI * 2,
      hue: 220 + Math.random() * 120
    });
  }

  /* 🌕 MOON */
  const moon = {
    y: h + 200,
    radius: 100,
    speed: 0.08,
    x: () => w * 0.18
  };

  /* 🪐 PLANET */
  const planet = {
    angle: Math.random() * Math.PI * 2,
    orbit: 320,
    size: 48,
    speed: 0.00012,
    drift: 0
  };

  /* 🌠 SHOOTING STARS */
  const shooters = [];

  window.spawnShootingStar = () => {
    shooters.push({
      x: Math.random() * w,
      y: Math.random() * h * 0.5,
      vx: 14,
      vy: 8,
      life: 60
    });
  };

  let celebration = false;
  window.startCelebration = () => celebration = true;

  function drawStars() {
    stars.forEach(star => {
      star.a += star.s * 16;
      star.tw += 0.02;

      star.r = star.baseR * (1 + Math.sin(star.tw) * 0.02);

      const x = w / 2 + Math.cos(star.a) * star.r;
      const y = h / 2 + Math.sin(star.a) * star.r;

      const alpha = celebration ? 0.95 : 0.6 + Math.sin(star.tw) * 0.3;

      ctx.beginPath();
      ctx.arc(x, y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${star.hue},100%,85%,${alpha})`;
      ctx.fill();
    });
  }

  function drawMoon() {
    if (moon.y > h - 220) moon.y -= moon.speed;

    const x = moon.x();
    const y = moon.y;

    const grad = ctx.createRadialGradient(
      x - 40, y - 40, 30,
      x, y, moon.radius
    );
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(1, "#d6d6f0");

    ctx.beginPath();
    ctx.arc(x, y, moon.radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.shadowBlur = 60;
    ctx.shadowColor = "rgba(220,220,255,0.6)";
    ctx.fill();
  }

  function drawPlanet() {
    planet.angle += planet.speed * 16;
    planet.drift += 0.004;

    const cx = w * 0.75;
    const cy = h * 0.28 + Math.sin(planet.drift) * 22;

    const x = cx + Math.cos(planet.angle) * planet.orbit;
    const y = cy + Math.sin(planet.angle) * planet.orbit;

    ctx.beginPath();
    ctx.arc(x, y, planet.size, 0, Math.PI * 2);
    ctx.fillStyle = "#ffb7d5";
    ctx.shadowBlur = 35;
    ctx.shadowColor = "rgba(255,180,220,0.7)";
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(
      x, y,
      planet.size * 2,
      planet.size * 0.7,
      0.6,
      0, Math.PI * 2
    );
    ctx.strokeStyle = "rgba(255,220,235,0.55)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function drawShooters() {
    shooters.forEach(s => {
      s.x += s.vx;
      s.y += s.vy;
      s.life--;

      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - 40, s.y - 20);
      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    while (shooters.length && shooters[0].life <= 0) shooters.shift();
  }

  function animate() {
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, w, h);

    drawStars();
    drawPlanet();
    drawMoon();
    drawShooters();

    requestAnimationFrame(animate);
  }

  animate();
});
