const canvas = document.getElementById('constellation-canvas');
const ctx = canvas.getContext('2d');

let nodes = [];
const NODE_COUNT = 55;
const MAX_DIST = 160;
const MOUSE_RADIUS = 170;
const MOUSE_PUSH = 1.1;

const mouse = { x: null, y: null };

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function makeNode() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 2 + 1.5
  };
}

function init() {
  resize();
  nodes = Array.from({ length: NODE_COUNT }, makeNode);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DIST) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(120, 140, 180, ${(1 - dist / MAX_DIST) * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  if (mouse.x !== null) {
    for (const n of nodes) {
      const dx = n.x - mouse.x;
      const dy = n.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(91, 141, 217, ${(1 - dist / MOUSE_RADIUS) * 0.55})`;
        ctx.lineWidth = 1;
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(91, 141, 217, 0.9)';
    ctx.fill();
  }

  for (const n of nodes) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(100, 120, 160, 0.7)';
    ctx.fill();
  }
}

function update() {
  for (const n of nodes) {
    n.x += n.vx;
    n.y += n.vy;

    if (mouse.x !== null) {
      const dx = n.x - mouse.x;
      const dy = n.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0.01) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        n.x += (dx / dist) * force * MOUSE_PUSH;
        n.y += (dy / dist) * force * MOUSE_PUSH;
      }
    }

    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

init();
loop();
