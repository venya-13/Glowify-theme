if (!customElements.get('featured-carousel-section')) {
  class FeaturedCarouselSection extends HTMLElement {
    connectedCallback() {
      if (typeof Swiper === 'undefined') return;

      const slidesDesktop = parseInt(this.dataset.slidesDesktop, 10) || 4;
      const centerMode = this.dataset.centerMode === 'true';
      const autoplayEnabled = this.dataset.autoplay === 'true';
      const autoplaySpeed = (parseFloat(this.dataset.autoplaySpeed) || 4) * 1000;
      const showPagination = this.dataset.pagination === 'true';
      const useFade = this.dataset.fade === 'true';

      const swiperEl = this.querySelector('.featured-carousel__swiper');
      const prevEl = this.querySelector('.featured-carousel__button--prev');
      const nextEl = this.querySelector('.featured-carousel__button--next');
      const paginationEl = this.querySelector('.featured-carousel__pagination');

      const options = {
        slidesPerView: 1.2,
        spaceBetween: 20,
        centeredSlides: centerMode,
        watchOverflow: true,
        navigation: {
          prevEl,
          nextEl,
        },
        breakpoints: {
          600: { slidesPerView: Math.max(2, Math.round(slidesDesktop / 2)), spaceBetween: 24 },
          990: { slidesPerView: slidesDesktop, spaceBetween: 28 },
        },
      };

      if (showPagination) {
        options.pagination = {
          el: paginationEl,
          clickable: true,
        };
      }

      if (autoplayEnabled) {
        options.autoplay = {
          delay: autoplaySpeed,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        };
      }

      if (useFade) {
        options.effect = 'fade';
        options.fadeEffect = { crossFade: true };
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        delete options.autoplay;
        options.speed = 0;
      }

      this.swiper = new Swiper(swiperEl, options);
    }
  }

  customElements.define('featured-carousel-section', FeaturedCarouselSection);
}
