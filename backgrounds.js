/* =========================================
   🌌 COSMIC BACKGROUND SYSTEM
   - Endless smooth rotation
   - Multiple rotation centers
   - Parallax depth
   - Subtle twinkle
========================================= */
console.log("🌌 background.js is running");

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* =========================================
   🌀 ROTATION CENTERS
   (Think: invisible gravity wells)
========================================= */

const centers = [
  { x: () => w * 0.5, y: () => h * 0.5, speed: 0.00015 }, // main slow rotation
  { x: () => w * 0.25, y: () => h * 0.35, speed: -0.00025 },
  { x: () => w * 0.75, y: () => h * 0.65, speed: 0.00035 }
];

/* =========================================
   ⭐ STAR CLASS
========================================= */

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
    this.twinkle += 0.015;
  }

  draw() {
    const cx = this.center.x();
    const cy = this.center.y();

    const x = cx + Math.cos(this.angle) * this.radius;
    const y = cy + Math.sin(this.angle) * this.radius;

    const alpha = 0.5 + Math.sin(this.twinkle) * 0.3;

    ctx.beginPath();
    ctx.arc(x, y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 100%, 85%, ${alpha})`;
    ctx.shadowBlur = 20 * this.depth;
    ctx.shadowColor = `hsla(${this.hue}, 100%, 80%, 0.6)`;
    ctx.fill();
  }
}

/* =========================================
   🌠 CREATE STAR FIELD
========================================= */

const stars = [];

// Deep background (very slow, huge orbits)
for (let i = 0; i < 800; i++) {
  const c = centers[Math.floor(Math.random() * centers.length)];
  stars.push(new Star(
    c,
    Math.random() * Math.max(w, h),
    Math.random() * Math.PI * 2,
    c.speed * 0.4,
    Math.random() * 1.2,
    220,
    0.3
  ));
}

// Mid-layer constellations (structured movement)
for (let i = 0; i < 260; i++) {
  const c = centers[Math.floor(Math.random() * centers.length)];
  stars.push(new Star(
    c,
    180 + Math.random() * 160,
    Math.random() * Math.PI * 2,
    c.speed,
    1.8,
    290,
    0.6
  ));
}

// Foreground glow stars (noticeable motion)
for (let i = 0; i < 140; i++) {
  const c = centers[Math.floor(Math.random() * centers.length)];
  stars.push(new Star(
    c,
    100 + Math.random() * 140,
    Math.random() * Math.PI * 2,
    c.speed * 1.6,
    2.4,
    330,
    1
  ));
}

/* =========================================
   🔁 ANIMATION LOOP (ENDLESS)
========================================= */

let lastTime = 0;
function animate(time) {
  const dt = time - lastTime;
  lastTime = time;

  // Soft fade for motion trails
  ctx.fillStyle = "rgba(5, 5, 16, 0.25)";
  ctx.fillRect(0, 0, w, h);

  stars.forEach(star => {
    star.update(dt);
    star.draw();
  });

  requestAnimationFrame(animate);
}

animate(0);
