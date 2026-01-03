class ParticleGridBackground extends HTMLElement {
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
    canvas.style.background = 'transparent';

    const nodes = [];
    const mouse = { x: -1000, y: -1000 };
    let animationId;
    let time = 0;
    const spacing = 50;
    let cols = 0;
    let rows = 0;

    const resizeCanvas = () => {
      const rect = this.getBoundingClientRect();
      // Use window dimensions for full viewport coverage
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      cols = Math.ceil(canvas.width / spacing) + 2;
      rows = Math.ceil(canvas.height / spacing) + 2;
      createGrid();
    };

    const createGrid = () => {
      nodes.length = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const offsetX = row % 2 === 0 ? 0 : spacing / 2;
          nodes.push({
            baseX: col * spacing + offsetX - spacing,
            baseY: row * spacing - spacing,
            x: col * spacing + offsetX - spacing,
            y: row * spacing - spacing,
            pulsePhase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const draw = () => {
      if (!ctx) return;

      time += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update node positions based on mouse with smooth wave effect
      nodes.forEach((node) => {
        // Account for canvas position in viewport
        const rect = canvas.getBoundingClientRect();
        const mouseX = mouse.x - rect.left;
        const mouseY = mouse.y - rect.top;
        const dx = mouseX - node.baseX;
        const dy = mouseY - node.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180;

        // Wave ripple from mouse
        const waveFreq = 0.03;
        const waveAmp = 8;
        const wave = Math.sin(dist * waveFreq - time * 3) * waveAmp * Math.max(0, 1 - dist / 400);

        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 35;
          const angle = Math.atan2(dy, dx);
          node.x = node.baseX - Math.cos(angle) * force + wave * (dx / dist);
          node.y = node.baseY - Math.sin(angle) * force + wave * (dy / dist);
        } else {
          // Gentle ambient floating
          node.x = node.baseX + Math.sin(time * 0.5 + node.pulsePhase) * 2 + wave;
          node.y = node.baseY + Math.cos(time * 0.4 + node.pulsePhase * 1.3) * 2;
        }
      });

      // Draw hexagonal connections
      nodes.forEach((node, i) => {
        nodes.forEach((other, j) => {
          if (j <= i) return;

          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < spacing * 1.6) {
            const midX = (node.x + other.x) / 2;
            const midY = (node.y + other.y) / 2;
            const rect = canvas.getBoundingClientRect();
            const mouseX = mouse.x - rect.left;
            const mouseY = mouse.y - rect.top;
            const mouseDx = mouseX - midX;
            const mouseDy = mouseY - midY;
            const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

            let opacity = 0.08;
            let lineWidth = 0.5;

            if (mouseDist < 180) {
              const intensity = 1 - mouseDist / 180;
              opacity = 0.08 + intensity * 0.35;
              lineWidth = 0.5 + intensity * 1.5;

              // Create gradient line near mouse
              const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
              gradient.addColorStop(0, `rgba(0, 195, 204, ${opacity})`);
              gradient.addColorStop(0.5, `rgba(29, 233, 182, ${opacity * 1.2})`);
              gradient.addColorStop(1, `rgba(0, 191, 255, ${opacity})`);
              ctx.strokeStyle = gradient;
            } else {
              ctx.strokeStyle = `rgba(0, 128, 128, ${opacity})`;
            }

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        });
      });

      // Draw nodes with glow effects
      nodes.forEach((node) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = mouse.x - rect.left;
        const mouseY = mouse.y - rect.top;
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let size = 1.5;
        let glowSize = 0;
        let opacity = 0.3;

        // Pulse effect
        const pulse = Math.sin(time * 1.5 + node.pulsePhase) * 0.4 + 0.6;

        if (dist < 180) {
          const intensity = 1 - dist / 180;
          size = 1.5 + intensity * 4;
          glowSize = intensity * 25;
          opacity = 0.3 + intensity * 0.7;
        }

        size *= pulse;

        // Outer glow for nodes near mouse
        if (glowSize > 0) {
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, glowSize
          );
          gradient.addColorStop(0, `rgba(29, 233, 182, ${opacity * 0.6})`);
          gradient.addColorStop(0.4, `rgba(0, 195, 204, ${opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(0, 191, 255, 0)');
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        const coreGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, size
        );
        coreGradient.addColorStop(0, `rgba(29, 233, 182, ${opacity})`);
        coreGradient.addColorStop(1, `rgba(0, 128, 128, ${opacity * 0.6})`);
        ctx.fillStyle = coreGradient;
        ctx.fill();
      });

      // Mouse cursor aura
      if (mouse.x > 0 && mouse.y > 0) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = mouse.x - rect.left;
        const mouseY = mouse.y - rect.top;
        // Outer soft glow
        const aura = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, 120
        );
        aura.addColorStop(0, 'rgba(29, 233, 182, 0.12)');
        aura.addColorStop(0.3, 'rgba(0, 195, 204, 0.06)');
        aura.addColorStop(0.6, 'rgba(0, 191, 255, 0.03)');
        aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 120, 0, Math.PI * 2);
        ctx.fillStyle = aura;
        ctx.fill();

        // Inner bright core
        const core = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, 15
        );
        core.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
        core.addColorStop(0.5, 'rgba(29, 233, 182, 0.1)');
        core.addColorStop(1, 'rgba(0, 195, 204, 0)');
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 15, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    resizeCanvas();
    draw();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);

    this.disconnectedCallback = () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }
}

customElements.define('particle-grid-background', ParticleGridBackground);



