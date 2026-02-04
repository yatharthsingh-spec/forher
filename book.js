document.addEventListener("DOMContentLoaded", () => {
  const yes = document.getElementById("yes");
  const no = document.getElementById("no");
  const dog = document.getElementById("dog");
  const text = document.querySelector(".book p");

  const story = [
    "Hey Ojasvi 💗",
    "I’ve been thinking about something…",
    "And the universe kind of agrees.",
    "So I wanted to ask you…",
    "Will you be my Valentine?"
  ];

  let i = 0;
  setInterval(() => {
    if (i < story.length) {
      text.textContent = story[i];
      i++;
    }
  }, 2500);

  yes.addEventListener("click", () => {
    text.textContent = "You just made my universe brighter 💖";
    dog.classList.add("show");

    if (window.startCelebration) window.startCelebration();

    // dog flies from moon
    dog.style.bottom = "auto";
    dog.style.top = "120px";
    dog.style.left = "18%";
    setTimeout(() => {
      dog.style.top = "auto";
      dog.style.bottom = "40px";
      dog.style.left = "50%";
    }, 800);
  });

  no.addEventListener("mouseenter", () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 150 - 75;
    no.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 20 - 10}deg)`;

    if (window.spawnShootingStar) window.spawnShootingStar();
  });
});
