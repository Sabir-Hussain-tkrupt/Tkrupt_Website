class FloatingShapesBackground extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    this.shadowRoot.appendChild(canvas);

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';

    const shapes = [];
    let animationId;

    const resizeCanvas = () => {
      const rect = this.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const shapeCount = Math.max(15, Math.floor((rect.width * rect.height) / 50000));
      shapes.length = 0;

      for (let i = 0; i < shapeCount; i++) {
        const type = Math.random() > 0.5 ? 'circle' : 'triangle';
        const size = Math.random() * 80 + 40;
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: size,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          type: type,
          opacity: Math.random() * 0.3 + 0.1,
          color: [
            { r: 0, g: 182, b: 255 }, // cyberblue
            { r: 29, g: 233, b: 182 }, // neonic
            { r: 116, g: 38, b: 239 }  // purple
          ][Math.floor(Math.random() * 3)]
        });
      }
    };

    const drawTriangle = (ctx, x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(-size / 2, size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.closePath();
      ctx.restore();
    };

    const draw = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape, index) => {
        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.rotation += shape.rotationSpeed;

        // Bounce off edges
        if (shape.x <= shape.size / 2 || shape.x >= canvas.width - shape.size / 2) {
          shape.vx *= -1;
        }
        if (shape.y <= shape.size / 2 || shape.y >= canvas.height - shape.size / 2) {
          shape.vy *= -1;
        }

        // Keep shapes within bounds
        shape.x = Math.max(shape.size / 2, Math.min(canvas.width - shape.size / 2, shape.x));
        shape.y = Math.max(shape.size / 2, Math.min(canvas.height - shape.size / 2, shape.y));

        // Draw shape
        ctx.save();
        ctx.globalAlpha = shape.opacity;
        ctx.fillStyle = `rgba(${shape.color.r}, ${shape.color.g}, ${shape.color.b}, ${shape.opacity})`;
        ctx.strokeStyle = `rgba(${shape.color.r}, ${shape.color.g}, ${shape.color.b}, ${shape.opacity * 1.5})`;
        ctx.lineWidth = 2;

        if (shape.type === 'circle') {
          ctx.beginPath();
          ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else {
          drawTriangle(ctx, shape.x, shape.y, shape.size, shape.rotation);
          ctx.fill();
          ctx.stroke();
        }

        ctx.restore();

        // Draw connections between nearby shapes
        for (let j = index + 1; j < shapes.length; j++) {
          const other = shapes[j];
          const dx = shape.x - other.x;
          const dy = shape.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const alpha = (1 - distance / 200) * 0.2;
            ctx.beginPath();
            ctx.moveTo(shape.x, shape.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(${shape.color.r}, ${shape.color.g}, ${shape.color.b}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Add pulsing effect
        shape.opacity += Math.sin(Date.now() * 0.001 + index) * 0.01;
        shape.opacity = Math.max(0.1, Math.min(0.4, shape.opacity));
      });

      animationId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resizeCanvas();
    };

    resizeCanvas();
    draw();

    window.addEventListener('resize', handleResize);

    this.disconnectedCallback = () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }
}


customElements.define('floating-shapes-background', FloatingShapesBackground);

