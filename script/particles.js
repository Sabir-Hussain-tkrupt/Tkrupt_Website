
class ParticleBackground extends HTMLElement {
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

    const particles = [];
    const mouse = { x: null, y: null };
    let animationId;

    const resizeCanvas = () => {
      const rect = this.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const particleCount = Math.max(120, Math.floor((rect.width * rect.height) / 8000));
      particles.length = 0;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          //size: Math.random() * 2 + 1,
          size: Math.random() * 4 + 2,

        });
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      } else {
        mouse.x = null;
        mouse.y = null;
      }
    };

    const draw = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 213, 0.65)';
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 170) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 255, 213, ${(1 - distance / 170) * 0.35})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dxMouse = mouse.x - particle.x;
          const dyMouse = mouse.y - particle.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < 220 && distMouse > 0) {
            const force = ((220 - distMouse) / 220) * 0.03;
            particle.vx += (dxMouse / distMouse) * force;
            particle.vy += (dyMouse / distMouse) * force;

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 255, 213, ${(1 - distMouse / 220) * 0.55})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }

        particle.vx *= 0.99;
        particle.vy *= 0.99;

        if (Math.abs(particle.vx) < 0.05) particle.vx = (Math.random() - 0.5) * 0.5;
        if (Math.abs(particle.vy) < 0.05) particle.vy = (Math.random() - 0.5) * 0.5;
      });

      animationId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resizeCanvas();
    };

    resizeCanvas();
    draw();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    this.disconnectedCallback = () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }
}

customElements.define('particle-background', ParticleBackground);


