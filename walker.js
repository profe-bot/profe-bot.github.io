  const character = document.getElementById('character');
  const text = document.getElementById('textToWalk');
  const container = document.getElementById('containerToWalk');

  const frameCount = 6;
  const frameWidth = 42;
  let currentFrame = 0;
  let frameTime = 0;
  const frameDuration = 100;

  // Variables dinámicas
  let lineYs = [];
  let maxX;
  let lineIndex = 0;
  let x = 0;
  let direction = 1;
  const speed = 2;

  // Función para obtener posición Y de las líneas, centrado vertical del sprite
  function getLinePositions(element) {
    const textNode = element.firstChild;
    const range = document.createRange();
    const lines = [];

    for(let i = 0; i < element.textContent.length; i++) {
      range.setStart(textNode, i);
      range.setEnd(textNode, i + 1);
      const rects = range.getClientRects();

      for (let rect of rects) {
        const topRelative = rect.top - container.getBoundingClientRect().top;
        // Evitar duplicados muy cercanos (misma línea)
        if (lines.length === 0 || Math.abs(lines[lines.length - 1] - topRelative) > 2) {
          // Centrar verticalmente el sprite respecto a la línea de texto
          lines.push(topRelative + rect.height / 2 - frameWidth / 2);
        }
      }
    }
    return lines;
  }

  // Actualizar variables responsive
  function updateLayout() {
    lineYs = getLinePositions(text);
    maxX = container.clientWidth - frameWidth;
    // Si línea actual fuera inválida tras resize, ajustar
    if (lineIndex >= lineYs.length) lineIndex = lineYs.length - 1;
  }

  window.addEventListener('resize', updateLayout);

  function update(timestamp) {
    if (!update.lastTime) update.lastTime = timestamp;
    const delta = timestamp - update.lastTime;
    frameTime += delta;

    if (frameTime >= frameDuration) {
      frameTime = 0;
      currentFrame = (currentFrame + 1) % frameCount;
      character.style.backgroundPosition = `-${currentFrame * frameWidth}px 0`;
    }

    update.lastTime = timestamp;

    x += speed * direction;

    if (direction === 1 && x >= maxX) {
      x = maxX;
      if (lineIndex < lineYs.length - 1) {
        lineIndex++;
      } else {
        direction = -1;
        character.style.transform = 'scaleX(-1)';
      }
    } else if (direction === -1 && x <= 0) {
      x = 0;
      if (lineIndex > 0) {
        lineIndex--;
      } else {
        direction = 1;
        character.style.transform = 'scaleX(1)';
      }
    }

    character.style.left = x + 'px';
    character.style.top = lineYs[lineIndex] + 'px';

    requestAnimationFrame(update);
  }

  // Inicializar
  const img = new Image();
  img.src = 'walk.png';
  img.onload = () => {
    updateLayout();
    character.style.backgroundPosition = '0 0';
    requestAnimationFrame(update);
  };
