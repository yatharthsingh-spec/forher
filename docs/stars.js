const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");
let w,h;

function resize(){
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
}
resize(); addEventListener("resize",resize);

const stars = [...Array(1800)].map(()=>({
  x:Math.random()*w,
  y:Math.random()*h,
  ox:Math.random()*w,
  oy:Math.random()*h,
  tx:null,
  ty:null
}));

let mode = "idle"; // idle | name | back

function draw(){
  ctx.fillStyle="#050510";
  ctx.fillRect(0,0,w,h);

  stars.forEach(s=>{
    const dx = (s.tx ?? s.ox) - s.x;
    const dy = (s.ty ?? s.oy) - s.y;
    s.x += dx*0.02;
    s.y += dy*0.02;

    ctx.beginPath();
    ctx.arc(s.x,s.y,1.3,0,7);
    ctx.fillStyle="white";
    ctx.fill();
  });

  requestAnimationFrame(draw);
}
draw();

function writeName(){
  ctx.font="bold 120px serif";
  ctx.fillText("OJASVI", w/2-280, h/2);
  const data = ctx.getImageData(0,0,w,h).data;
  let idx=0;

  stars.forEach(s=>{
    while(idx < data.length && data[idx+3]===0) idx+=4;
    const p = idx/4;
    s.tx = p % w;
    s.ty = Math.floor(p/w);
  });

  mode="name";
  setTimeout(returnStars,4000);
}

function returnStars(){
  stars.forEach(s=>{
    s.tx = null;
    s.ty = null;
  });
  mode="back";
}

setTimeout(writeName,2000);
