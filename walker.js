var character;
var wa;

function waitUntilDomLoaded() {
  character = document.getElementById('character');
  wa = document.getElementById('walkingArea');
  if (!character || !wa) return;

  // Configuración
  const frameCount = 6;
  const frameWidth = 42;
  const speed = 0.5;
  let currentFrame = 0;
  let frameTime = 0;
  const frameDuration = 400;

  let x = wa.getBoundingClientRect().left;
  let direction = 1; // 1 para ir hacia la derecha, -1 para volver a izquierda

  // Función de animación
  function update(timestamp) {
    if (!update.lastTime) update.lastTime = timestamp;
    const delta = timestamp - update.lastTime;
    frameTime += delta;

    // Actualizar frame de animación
    if (frameTime >= frameDuration) {
      frameTime = 0;
      currentFrame = (currentFrame + 1) % frameCount;
      character.style.backgroundPosition = `-${currentFrame * frameWidth}px 0`;
    }

    update.lastTime = timestamp;

    // Calcular posición objetivo usando getBoundingClientRect
    let targetX = wa.getBoundingClientRect().right - frameWidth;
    
    // Mover hacia el objetivo
    x += speed * direction;

    // Cambiar dirección si llegamos al final del rectángulo de contenido
    if (direction === 1 && x >= targetX) {
        x = targetX;
        setTimeout(() => {
          direction = -1;
          character.style.transform = 'scaleX(-1)';
        }, 1000);
    } else if (direction === -1 && x <= wa.getBoundingClientRect().left) {
        x = wa.getBoundingClientRect().left;
        setTimeout(() => {
          direction = 1;
          character.style.transform = 'scaleX(+1)';
        }, 1000);
    }

    // Establecer posición
    character.style.left = x + 'px';
    character.style.top = wa.getBoundingClientRect().top - frameWidth/2 + 'px';
    requestAnimationFrame(update);
  }

  // Verificar que el elemento character existe antes de usarlo
  if (!character) return;

  // Inicializar posición
  character.style.backgroundPosition = '0 0';
  character.style.left = wa.getBoundingClientRect().left + 'px';
  character.style.top = wa.getBoundingClientRect().top - frameWidth/2 + 'px';
  character.style.opacity = '0';
  
  // Esperar el tiempo aleatorio antes de iniciar la animación
  function moreOpaque() {
    character.style.opacity = '0.7';
    requestAnimationFrame(update);
  }
  let randomDelay = Math.floor(Math.random() * 2200) + 500; // between 2200 and 1499 ms
  setTimeout(moreOpaque, randomDelay);
}
window.addEventListener('DOMContentLoaded', waitUntilDomLoaded);