var character;
var wstart;
var wstop;
var wa; // walking area

function waitUntilDomLoaded() {
  character = document.getElementById('character');
  wstart = document.getElementById('wstart');
  wstop = document.getElementById('wstop');
  wa = document.getElementById("walkingArea");
  if (!character || !wstart || !wstop || !wa) return; // no character, bad luck

  const nFrames = 6; // number of frames in the animation
  const wFrame = 42; // width of each frame
  const speed = 0.5; // speed of the animation
  const frameDuration = 400; // duration of each frame

  let x = wstart.offsetLeft;
  let direction = 1; // 1 to go right, -1 to go left

  // Animation function
  let timeSinceLastFrame = 0; // time since last frame
  let currentFrame = 0; // current frame
  let pxToFrameCenter = wFrame/2; // distance from the frame center to the edge
  let targetX = wstop.offsetLeft - pxToFrameCenter;
  function update(timestamp) {
    update.lastTime ? timeSinceLastFrame += timestamp - update.lastTime : update.lastTime = timestamp;
    // Update frame if enough time has passed
    if (timeSinceLastFrame >= frameDuration) {
      timeSinceLastFrame = 0;
      currentFrame = (currentFrame + 1) % nFrames;
      character.style.backgroundPosition = `-${currentFrame * wFrame}px 0`;
    }
    targetX = wstop.offsetLeft - pxToFrameCenter; // update target (maybe there was a window resize)
    x += speed * direction;
    character.style.left = x + 'px'; // set x position
    character.style.top = wstart.offsetTop - pxToFrameCenter + 'px'; // set y position
    // Change direction if we reach the target on the right or the original position on the left
    if (direction === 1 && x >= targetX) {
        x = targetX;
        setTimeout(() => {
          direction = -1;
          character.style.transform = 'scaleX(-1)';
        }, 1000);
    } else if (direction === -1 && x <= wstart.offsetLeft) {
        x = wstart.offsetLeft;
        setTimeout(() => {
          direction = 1;
          character.style.transform = 'scaleX(+1)';
        }, 1000);
    }
    requestAnimationFrame(update);
  }

  // Inicializar cuando la imagen esté cargada
    // Verificar que el elemento character existe antes de usarlo
    if (!character) return;

    // Inicializar posición
    character.style.backgroundPosition = '0 0';
    character.style.left = wstart.offsetLeft + 'px';
    character.style.top = wstart.offsetTop - pxToFrameCenter + 'px';
    character.style.opacity = '0';
    
    // Esperar el tiempo aleatorio antes de iniciar la animación
    function moreOpaque() {
      // Mostrar el personaje
      character.style.opacity = '0.7';
      requestAnimationFrame(update);
    }

    // Generar un delay aleatorio entre 2 y 6 segundos
    const randomDelay = Math.floor(Math.random() * 2200) + 500; // between 2200 and 1499 ms
    setTimeout(moreOpaque, randomDelay);
};
window.addEventListener('DOMContentLoaded', waitUntilDomLoaded);
