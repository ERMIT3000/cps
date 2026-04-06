import { BP_DESKTOP_MIN } from './breakpoints.js';

(function () {
  function isDesktop() {
    return window.matchMedia(`(min-width: ${BP_DESKTOP_MIN}px)`).matches;
  }

  function initMenu() {
    var aside = document.getElementById('aside-menu');
    var openBtn = document.getElementById('aside-menu-open');
    var backdrop = document.getElementById('aside-backdrop');

    function syncBackdrop(open) {
      if (!backdrop) return;
      if (isDesktop()) {
        backdrop.classList.remove('aside-backdrop--visible');
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('body--aside-open');
        return;
      }
      backdrop.classList.toggle('aside-backdrop--visible', open);
      backdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.classList.toggle('body--aside-open', open);
    }

    function setOpen(open) {
      if (!aside) return;
      if (isDesktop()) {
        aside.classList.remove('aside-menu--open');
        aside.setAttribute('aria-hidden', 'false');
        if (openBtn) {
          openBtn.classList.remove('header__menu-open--expanded');
          openBtn.setAttribute('aria-expanded', 'false');
          openBtn.setAttribute('aria-label', 'Открыть меню');
        }
        syncBackdrop(false);
        return;
      }
      aside.classList.toggle('aside-menu--open', open);
      aside.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (openBtn) {
        openBtn.classList.toggle('header__menu-open--expanded', open);
        openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        openBtn.setAttribute(
          'aria-label',
          open ? 'Закрыть меню' : 'Открыть меню',
        );
      }
      syncBackdrop(open);
    }

    openBtn &&
      openBtn.addEventListener('click', function () {
        if (isDesktop()) return;
        setOpen(!aside.classList.contains('aside-menu--open'));
      });

    backdrop &&
      backdrop.addEventListener('click', function () {
        if (isDesktop()) return;
        setOpen(false);
      });

    document.addEventListener('app:close-aside', function () {
      if (!isDesktop()) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (document.querySelector('.modal.modal--open')) return;
      if (
        !isDesktop() &&
        aside &&
        aside.classList.contains('aside-menu--open')
      ) {
        e.preventDefault();
        setOpen(false);
      }
    });

    window.addEventListener('resize', function () {
      if (isDesktop()) setOpen(false);
    });

    if (aside && isDesktop()) aside.setAttribute('aria-hidden', 'false');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
  } else {
    initMenu();
  }
})();
