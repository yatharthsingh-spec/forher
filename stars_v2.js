alert("stars v2 loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 stars.js IS RUNNING");

  const canvas = document.getElementById("space");
  if (!canvas) {
    console.error("❌ canvas #space not found");
    return;
  }

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function animate() {
    // VERY OBVIOUS BACKGROUND
    ctx.fillStyle = "#6a00ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // BIG WHITE CIRCLE
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      120,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "white";
    ctx.fill();

    requestAnimationFrame(animate);
  }

  animate();
});

