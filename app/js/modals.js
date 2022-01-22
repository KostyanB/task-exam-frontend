import '@fancyapps/fancybox'
import '@fancyapps/fancybox/dist/jquery.fancybox.min.css'
import {dispatchAjaxContentLoaded} from "./generic/evented";

export default class Modals {

    modals = [
        {
            selector: '.popup-gallery',
            options: {
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                },
            }
        },
        {
            selector: '.popup-modal',
            options: {
                modal: false,
                type: 'inline',
            }
        },

    ];

    constructor() {
        this.init();
        this.bindEvents();
    }

    init() {
        this.modals.forEach(function (item) {
            $(item.selector).each(function () {
                $(this).fancybox(item.options);
            });
        });
    }

    static openAjaxModal(src, ajaxSettings = {}) {
        $.fancybox.open({
            src  : src,
            type : 'ajax',
            opts : {
                modal: false,
                autoFocus: false,
                touch: false,
                type : 'inline',
                ajax: ajaxSettings,
                afterLoad: function (instance, current) {
                    current.$content.css('display', 'inline-block');

                    dispatchAjaxContentLoaded({
                        content: this.$content
                    });
                }
            }
        });
    }

    bindEvents() {
        $(document).on('click', '.popup-modal-ajax', function(e)  {
            e.preventDefault();

            const src = $(this).attr('data-src') || $(this).attr('href') || $(this).attr('data-src-modal');
            Modals.openAjaxModal(src)
        });

        $(document).on('ajaxContentLoaded', (e) => {
            this.init();
        })
    }
}