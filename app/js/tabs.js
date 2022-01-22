export default class Tabs {
    tabLink = '[data-tabs-link]';
    tabLinks = '[data-tabs-links]';
    tab = '[data-tabs-tab]';

    constructor() {
        this.events();
    }

    static open($tabLink, $tab) {
        $tabLink.siblings().removeClass('is-active');
        $tabLink.addClass('is-active');

        $tab.siblings().removeClass('is-active');
        $tab.addClass('is-active');

        if ($tab.find('.swiper-container').length) {
            $tab.find('.swiper-container')[0].swiper.update();
        }
    }

    events() {
        $(document).on('click', this.tabLink, e => {
            e.preventDefault();

            const $tabLink = $(e.currentTarget);
            const tab = $tabLink.attr('data-tabs-link');

            Tabs.open($tabLink, $(tab));
        });
    }
}