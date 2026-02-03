document.addEventListener("DOMContentLoaded", () => {
  const yes = document.getElementById("yes");
  const no = document.getElementById("no");
  const dog = document.getElementById("dog");

  yes.addEventListener("click", () => {
    dog.classList.add("show");
  });

  no.addEventListener("mouseenter", () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 150 - 75;
    no.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 20 - 10}deg)`;
  });
});
