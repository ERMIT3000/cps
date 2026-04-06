import { BP_MOBILE_MAX } from './breakpoints.js';

(function () {
  const section = document.querySelector('[data-prices]');
  const swiperEl = section?.querySelector('.prices-swiper');
  if (!section || !swiperEl) return;

  const MOBILE_MAX = BP_MOBILE_MAX;
  let swiper = null;

  function destroySwiper() {
    if (!swiper) return;
    swiper.destroy(true, true);
    swiper = null;
  }

  function initSwiper() {
    if (swiper) return;
    swiper = new Swiper(swiperEl, {
      slidesPerView: 'auto',
      spaceBetween: 16,
      speed: 320,
      resistanceRatio: 0.75,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      pagination: {
        el: section.querySelector('.prices-swiper__bullets'),
        clickable: true,
        dynamicBullets: false,
      },
    });
  }

  function syncLayout() {
    const mobile = window.innerWidth <= MOBILE_MAX;
    destroySwiper();
    if (mobile) {
      initSwiper();
    }
  }

  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(syncLayout, 150);
  });

  syncLayout();
})();
