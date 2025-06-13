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

    // Calcular posición objetivo usando coordenadas relativas al documento
    let targetX = wa.getBoundingClientRect().right + window.scrollX - frameWidth;
    
    // Mover hacia el objetivo
    x += speed * direction;

    // Cambiar dirección si llegamos a wstart o wstop
    if (direction === 1 && x >= targetX) {
        x = targetX;
        setTimeout(() => {
          direction = -1;
          character.style.transform = 'scaleX(-1)';
        }, 1000);
    } else if (direction === -1 && x <= wa.getBoundingClientRect().left + window.scrollX) {
        x = wa.getBoundingClientRect().left + window.scrollX;
        setTimeout(() => {
          direction = 1;
          character.style.transform = 'scaleX(+1)';
        }, 1000);
    }

    // Establecer posición
    character.style.left = x + 'px';
    character.style.top = wa.getBoundingClientRect().top + window.scrollY - frameWidth/2 + 'px';
    requestAnimationFrame(update);
  }

  // Verificar que el elemento character existe antes de usarlo
  if (!character) return;

  // Inicializar posición
  character.style.backgroundPosition = '0 0';
  character.style.left = wa.getBoundingClientRect().left + 'px';
  character.style.top = wa.getBoundingClientRect().top - frameWidth/2 + 'px';
  character.style.opacity = '0';
  
  // Añadir evento de clic al área de caminata
  let charRect;
  let charCenterX;
  let charCenterY;
  let clickX;
  let clickY;
  let distanceX;
  let distanceY;
  wa.addEventListener('click', function(e) {
    // Obtener la posición actual del personaje
    charRect = character.getBoundingClientRect();
    charCenterX = charRect.left + frameWidth/2;
    charCenterY = charRect.top + frameWidth/2;

    // Calcular la distancia del clic al centro del personaje
    clickX = e.clientX;
    clickY = e.clientY;
    distanceX = Math.abs(clickX - charCenterX);
    distanceY = Math.abs(clickY - charCenterY);

    // Verificar si el clic está dentro del cuadrado frameWidth x frameWidth
    if (distanceX <= frameWidth/2 && distanceY <= frameWidth/2) {
      // Crear elemento para el mensaje
      const message = document.createElement('div');
      message.textContent = '¡Hola!';
      message.style.position = 'absolute';
      message.style.left = (e.clientX + window.scrollX - 10) + 'px';
      message.style.top = (e.clientY + window.scrollY - 30) + 'px';
      message.style.color = 'black';
      message.style.textShadow = '1px 1px 2px black';
      message.style.fontWeight = 'bold';
      message.style.pointerEvents = 'none';
      message.style.animation = 'fadeOut 6.5s forwards';
      
      // Añadir el mensaje al documento
      document.body.appendChild(message);
      
      // Eliminar el mensaje después de la animación
      setTimeout(() => {
        message.remove();
      }, 6500);
    }
  });

  // Añadir estilos para la animación
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeOut {
      0% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-20px); }
    }
  `;
  document.head.appendChild(style);
  
  // Esperar el tiempo aleatorio antes de iniciar la animación
  function moreOpaque() {
    character.style.opacity = '0.7';
    requestAnimationFrame(update);
  }
  let randomDelay = Math.floor(Math.random() * 2200) + 500; // between 2200 and 1499 ms
  setTimeout(moreOpaque, randomDelay);
}
window.addEventListener('DOMContentLoaded', waitUntilDomLoaded);