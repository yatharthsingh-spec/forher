const spreads = [
  ["Some things don’t need perfect timing.",
   "They just need the right feeling."],
  ["Every time I see you,",
   "the universe feels softer."],
  ["So before the stars move on,",
   "I wanted to ask you…"]
];

let i=0;
const L = document.getElementById("leftText");
const R = document.getElementById("rightText");
const spread = document.getElementById("spread");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const dog = document.getElementById("dog");
const music = document.getElementById("bgMusic");

function show(){
  L.textContent = spreads[i][0];
  R.textContent = spreads[i][1];
}
show();

yes.onclick = ()=>{
  music.volume=.35; music.play();
  dog.classList.add("show");
};

no.addEventListener("mouseenter",()=>{
  const x = Math.random()*300 - 150;
  const y = Math.random()*120 - 60;
  no.style.transform = `translate(${x}px,${y}px) rotate(${Math.random()*20-10}deg)`;
});
