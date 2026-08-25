const petEl = document.getElementById('pet');
const zzzEl = document.getElementById('zzz');

const SPEED = 4.2;          // px per frame while chasing
const STOP_DISTANCE = 48;   // how close the pet gets before resting
const SLEEP_AFTER_MS = 12000;

let pet = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let cursor = { x: pet.x, y: pet.y };
let facing = 1;             // 1 = right, -1 = left
let lastMoveTime = Date.now();
let bobPhase = 0;

window.petAPI.onCursor((pos) => { cursor = pos; });
window.petAPI.onSetPet((emoji) => { petEl.textContent = emoji; });

function frame() {
  const dx = cursor.x - pet.x;
  const dy = cursor.y - pet.y;
  const dist = Math.hypot(dx, dy);

  let moving = false;
  if (dist > STOP_DISTANCE) {
    const step = Math.min(SPEED, dist - STOP_DISTANCE);
    pet.x += (dx / dist) * step;
    pet.y += (dy / dist) * step;
    if (Math.abs(dx) > 2) facing = dx > 0 ? 1 : -1;
    moving = true;
    lastMoveTime = Date.now();
  }

  // Run bob while moving, gentle breathing while idle
  bobPhase += moving ? 0.35 : 0.06;
  const bob = moving ? Math.abs(Math.sin(bobPhase)) * 6 : Math.sin(bobPhase) * 1.5;

  const asleep = !moving && Date.now() - lastMoveTime > SLEEP_AFTER_MS;
  zzzEl.style.opacity = asleep ? 1 : 0;
  zzzEl.style.left = pet.x + 26 * facing + 'px';
  zzzEl.style.top = pet.y - 34 + 'px';

  const tilt = asleep ? 'rotate(-18deg)' : '';
  petEl.style.transform =
    `translate(${pet.x - 20}px, ${pet.y - 20 - bob}px) scaleX(${facing}) ${tilt}`;

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
