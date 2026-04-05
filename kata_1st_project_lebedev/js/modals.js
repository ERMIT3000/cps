(function () {
    var MODAL_IDS = {
        'order-call': 'modal-order-call',
        feedback: 'modal-feedback',
    };

    function dispatchCloseAside() {
        document.dispatchEvent(new CustomEvent('app:close-aside'));
    }

    function getOpenModal() {
        return document.querySelector('.modal.modal--open');
    }

    function openModal(id) {
        var domId = MODAL_IDS[id];
        if (!domId) return;
        var modal = document.getElementById(domId);
        if (!modal) return;

        dispatchCloseAside();

        var prev = getOpenModal();
        if (prev && prev !== modal) closeModalEl(prev);

        modal.classList.add('modal--open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('body--modal-open');
    }

    function closeModalEl(modal) {
        if (!modal) return;
        modal.classList.remove('modal--open');
        modal.setAttribute('aria-hidden', 'true');
        if (!getOpenModal()) {
            document.body.classList.remove('body--modal-open');
        }
    }

    function closeAnyModal() {
        var m = getOpenModal();
        if (m) closeModalEl(m);
    }

    function onDocumentClick(e) {
        var t = e.target;
        if (!(t instanceof Element)) return;

        var trigger = t.closest('[data-open-modal]');
        if (trigger) {
            var key = trigger.getAttribute('data-open-modal');
            if (key) {
                e.preventDefault();
                openModal(key);
            }
            return;
        }

        if (t.closest('[data-modal-close]')) {
            var modal = t.closest('.modal');
            if (modal && modal.classList.contains('modal--open')) {
                closeModalEl(modal);
            }
        }
    }

    function onKeydown(e) {
        if (e.key !== 'Escape') return;
        if (getOpenModal()) {
            e.preventDefault();
            closeAnyModal();
        }
    }

    function onFormSubmit(e) {
        var form = e.target;
        if (!(form instanceof HTMLFormElement)) return;
        if (!form.closest('.modal')) return;
        e.preventDefault();
    }

    function init() {
        document.addEventListener('click', onDocumentClick);
        document.addEventListener('keydown', onKeydown);
        document.addEventListener('submit', onFormSubmit, true);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
