(function () {
  function initGsapCardReveal() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    var cards = gsap.utils.toArray('[data-gsap-card]:not([data-gsap-card-initialized])');
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.setAttribute('data-gsap-card-initialized', 'true');
    });

    ScrollTrigger.batch(cards, {
      start: 'top 92%',
      once: true,
      onEnter: function (batch) {
        gsap.fromTo(
          batch,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.08,
            clearProps: 'opacity,transform',
          }
        );
      },
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGsapCardReveal);
  } else {
    initGsapCardReveal();
  }

  document.addEventListener('shopify:section:load', initGsapCardReveal);
})();
