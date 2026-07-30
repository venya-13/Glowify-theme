if (!customElements.get('hero-video-section')) {
  class HeroVideoSection extends HTMLElement {
    connectedCallback() {
      if (this.dataset.parallax !== 'true') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (typeof gsap === 'undefined') return;

      if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

      const media = this.querySelector('.hero-video__media');
      const items = this.querySelectorAll('[data-hero-animate-item]');

      if (media && window.ScrollTrigger) {
        gsap.to(media, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: this,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (items.length) {
        gsap.set(items, { opacity: 0, y: 24 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.12,
          delay: 0.1,
          clearProps: 'transform,opacity',
        });
      }
    }
  }

  customElements.define('hero-video-section', HeroVideoSection);
}
