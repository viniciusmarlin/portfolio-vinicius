import { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; vx: number; vy: number; radius: number; alpha: number; opacity: number; phase: number };
type Rect = { left: number; right: number; top: number; bottom: number };

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const field = fieldRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !field || !context) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, frame = 0, lastFrame = 0, maskFrame = 0;
    let pointerX = -1000, pointerY = -1000;
    let masks: Rect[] = [];
    let active = !reduceMotion.matches;
    let particles: Particle[] = [];

    const updateMasks = () => {
      masks = ['.nav-wrap', '.footer'].flatMap((selector) => {
        const element = document.querySelector(selector);
        if (!element) return [];
        const rect = element.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= height) return [];
        return [{ left: rect.left, right: rect.right, top: Math.max(0, rect.top), bottom: Math.min(height, rect.bottom) }];
      });
    };
    const scheduleMaskUpdate = () => {
      if (maskFrame) return;
      maskFrame = window.requestAnimationFrame(() => { maskFrame = 0; updateMasks(); });
    };
    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(120, Math.min(260, Math.round(width * height / 8500)));
      if (particles.length !== count) {
        particles = Array.from({ length: count }, () => {
          const angle = Math.random() * Math.PI * 2;
          const speed = .1 + Math.random() * .22;
          const alpha = .25 + Math.random() * .4;
          return { x: Math.random() * width, y: Math.random() * height,
            vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
            radius: 1.5 + Math.random() * 2, alpha, opacity: alpha, phase: Math.random() * Math.PI * 2 };
        });
      } else particles.forEach((particle) => { particle.x = (particle.x + width) % width; particle.y = (particle.y + height) % height; });
      updateMasks();
    };
    const onPointerMove = (event: PointerEvent) => { pointerX = event.clientX; pointerY = event.clientY; };
    const onPointerLeave = () => { pointerX = pointerY = -1000; };

    const draw = (time: number) => {
      if (!active) return;
      const dt = lastFrame ? Math.min(time - lastFrame, 32) / 16.67 : 1;
      lastFrame = time;
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.x += (particle.vx + Math.sin(time * .0002 + particle.phase) * .018) * dt;
        particle.y += (particle.vy + Math.cos(time * .00018 + particle.phase * 1.6) * .018) * dt;
        if (particle.x < 0) particle.x += width; else if (particle.x >= width) particle.x -= width;
        if (particle.y < 0) particle.y += height; else if (particle.y >= height) particle.y -= height;

        const distance = Math.hypot(pointerX - particle.x, pointerY - particle.y);
        const proximity = Math.max(0, 1 - distance / 145);
        const smoothFade = proximity * proximity * (3 - 2 * proximity);
        const targetOpacity = particle.alpha * (1 - smoothFade * .94);
        particle.opacity += (targetOpacity - particle.opacity) * (1 - Math.exp(-dt * .18));
        if (particle.opacity < .012 || masks.some((rect) => particle.x >= rect.left && particle.x <= rect.right && particle.y >= rect.top && particle.y <= rect.bottom)) return;

        context.beginPath(); context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(163, 241, 108, ${particle.opacity})`; context.fill();
      });
      frame = window.requestAnimationFrame(draw);
    };
    const stop = () => { active = false; window.cancelAnimationFrame(frame); context.clearRect(0, 0, width, height); };
    const start = () => { if (active || reduceMotion.matches) return; active = true; lastFrame = 0; frame = window.requestAnimationFrame(draw); };
    const onMotionPreference = () => reduceMotion.matches ? stop() : start();

    resize(); if (active) frame = window.requestAnimationFrame(draw);
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', scheduleMaskUpdate, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });
    reduceMotion.addEventListener('change', onMotionPreference);
    return () => {
      stop(); window.cancelAnimationFrame(maskFrame);
      window.removeEventListener('resize', resize); window.removeEventListener('scroll', scheduleMaskUpdate);
      window.removeEventListener('pointermove', onPointerMove); window.removeEventListener('pointerleave', onPointerLeave);
      reduceMotion.removeEventListener('change', onMotionPreference);
    };
  }, []);

  return <div className="particle-field" ref={fieldRef} aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
