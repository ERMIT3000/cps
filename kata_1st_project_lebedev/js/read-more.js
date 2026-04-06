(() => {
  const textsRoot = document.querySelector('.content__texts');
  const btn = document.querySelector('.read-more-btn');
  const label = btn?.querySelector('.read-more-btn__label');
  const fullText = document.querySelector('.content__text--continuation-full');

  if (!textsRoot || !btn || !label || !fullText) return;

  const labelMore = 'Читать далее';
  const labelLess = 'Скрыть';

  function setExpanded(expanded) {
    textsRoot.classList.toggle('content__texts--expanded', expanded);
    btn.classList.toggle('read-more-btn--expanded', expanded);
    btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    btn.setAttribute('aria-label', expanded ? labelLess : labelMore);
    label.textContent = expanded ? labelLess : labelMore;
  }

  btn.addEventListener('click', () => {
    setExpanded(!textsRoot.classList.contains('content__texts--expanded'));
  });
})();
