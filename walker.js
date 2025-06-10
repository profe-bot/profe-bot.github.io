// Esperar a que el DOM esté cargado
window.addEventListener('DOMContentLoaded', () => {
  // Obtener referencias a elementos
  const character = document.getElementById('character');
  const wstart = document.getElementById('wstart');
  const wstop = document.getElementById('wstop');

  // Verificar que los elementos existan
  if (!character || !wstart || !wstop) {
    console.error('No se encontraron los elementos necesarios');
    return;
  }

  // Configuración
  const frameCount = 6;
  const frameWidth = 42;
  const speed = 2;
  let currentFrame = 0;
  let frameTime = 0;
  const frameDuration = 100;

  let x = wstart.offsetLeft;
  let direction = 1; // 1 para ir hacia wstop, -1 para volver a wstart

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

    // Calcular posición objetivo
    let targetX = wstop.offsetLeft - frameWidth/2;
    
    // Mover hacia el objetivo
    x += speed * direction;

    // Cambiar dirección si llegamos a wstart o wstop
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

    // Establecer posición
    character.style.left = x + 'px';
    character.style.top = wstart.offsetTop - frameWidth/2 + 'px';

    requestAnimationFrame(update);
  }

  // Inicializar cuando la imagen esté cargada
  const img = new Image();
  img.src = 'walk.png';
  img.onload = function() {
    // Verificar que el elemento character existe antes de usarlo
    if (!character) return;

    // Inicializar posición
    character.style.backgroundPosition = '0 0';
    character.style.left = wstart.offsetLeft + 'px';
    character.style.top = wstart.offsetTop - frameWidth/2 + 'px';
    // Ocultar el personaje inicialmente
    character.style.opacity = '0';
    
    // Generar un delay aleatorio entre 2 y 6 segundos
    const minDelay = 500; //ms 
    const maxDelay = 1500; 
    const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    
    // Esperar el tiempo aleatorio antes de iniciar la animación
    setTimeout(function() {
      // Mostrar el personaje
      character.style.opacity = '0.7';
      requestAnimationFrame(update);
    }, randomDelay);
  };
});