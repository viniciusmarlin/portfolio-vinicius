import { useEffect } from 'react';

const revealGroups = [
  '#about .section-heading',
  '#about .about-grid',
  '.skills-grid .skill-group',
  '#projects .projects-heading',
  '#projects .project-card',
  '#contact > .container > .section-index',
  '#contact .footer-main',
  '#contact .footer-bottom'
];

export default function MotionEffects() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;
    let observer: IntersectionObserver | undefined;
    let targets: Element[] = [];

    const reset = () => {
      observer?.disconnect();
      observer = undefined;
      root.classList.remove('scroll-motion-ready');
      targets.forEach((target) => {
        target.classList.remove('scroll-reveal', 'scroll-revealed');
        (target as HTMLElement).style.removeProperty('--motion-delay');
      });
      targets = [];
    };

    const setup = () => {
      reset();
      if (preference.matches || !('IntersectionObserver' in window)) return;

      targets = revealGroups.flatMap((selector) => Array.from(document.querySelectorAll(selector)));
      root.classList.add('scroll-motion-ready');
      targets.forEach((target, index) => {
        target.classList.add('scroll-reveal');
        (target as HTMLElement).style.setProperty('--motion-delay', `${(index % 4) * 65}ms`);
      });

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('scroll-revealed', entry.isIntersecting);
        });
      }, { threshold: 0.01, rootMargin: '0px' });

      targets.forEach((target) => observer?.observe(target));
    };

    setup();
    preference.addEventListener('change', setup);
    return () => {
      preference.removeEventListener('change', setup);
      reset();
    };
  }, []);

  return null;
}
