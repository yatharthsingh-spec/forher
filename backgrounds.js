/* =========================================
   🌌 STABLE COSMIC BACKGROUND (FIXED)
========================================= */

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
   🌀 ROTATION CENTERS
========================= */
const centers = [
  { x: () => w / 2,     y: () => h / 2,     speed: 0.00012 },
  { x: () => w * 0.3,   y: () => h * 0.4,   speed: -0.00018 },
  { x: () => w * 0.75,  y: () => h * 0.65,  speed: 0.00022 }
];

/* =========================
   ⭐ STAR CLASS
========================= */
class Star {
  constructor(center, radius, angle, speed, size, hue, depth) {
    this.center = center;
    this.radius = radius;
    this.angle = angle;
    this.speed = speed;
    this.size = size;
    this.hue = hue;
    this.depth = depth;
    this.twinkle = Math.random() * Math.PI * 2;
  }

  update(dt) {
    this.angle += this.speed * dt;
    this.twinkle += 0.02;
  }

  draw() {
    const cx = this.center.x();
    const cy = this.center.y();

    const x = cx + Math.cos(this.angle) * this.radius;
    const y = cy + Math.sin(this.angle) * this.radius;

    // Clamp alpha so stars never disappear
    const alpha = Math.max(0.6, 0.6 + Math.sin(this.twinkle) * 0.25);

    ctx.beginPath();
    ctx.arc(x, y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 100%, 85%, ${alpha})`;
    ctx.shadowBlur = 15 * this.depth;
    ctx.shadowColor = `hsla(${this.hue},100%,80%,0.6)`;
    ctx.fill();
  }
}

/* =========================
   🌠 CREATE STARS
========================= */
const stars = [];

function createStars() {
  stars.length = 0;

  // Deep layer
  for (let i = 0; i < 700; i++) {
    const c = centers[Math.floor(Math.random() * centers.length)];
    stars.push(new Star(
      c,
      Math.random() * Math.max(w, h),
      Math.random() * Math.PI * 2,
      c.speed * 0.4,
      Math.random() * 1.2 + 0.3,
      220,
      0.3
    ));
  }

  // Mid layer
  for (let i = 0; i < 220; i++) {
    const c = centers[Math.floor(Math.random() * centers.length)];
    stars.push(new Star(
      c,
      180 + Math.random() * 160,
      Math.random() * Math.PI * 2,
      c.speed,
      1.6,
      290,
      0.6
    ));
  }

  // Foreground
  for (let i = 0; i < 120; i++) {
    const c = centers[Math.floor(Math.random() * centers.length)];
    stars.push(new Star(
      c,
      100 + Math.random() * 140,
      Math.random() * Math.PI * 2,
      c.speed * 1.5,
      2.4,
      330,
      1
    ));
  }
}

createStars();
window.addEventListener("resize", createStars);

/* =========================
   🔁 ANIMATION LOOP
========================= */
let lastTime = performance.now();

function animate(time) {
  const dt = Math.min(time - lastTime, 40);
  lastTime = time;

  // HARD CLEAR (no fade bug)
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#050510";
  ctx.fillRect(0, 0, w, h);

  ctx.shadowBlur = 0;

  stars.forEach(star => {
    star.update(dt);
    star.draw();
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
