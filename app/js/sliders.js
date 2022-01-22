import Collection from './generic/collection';
import { Swiper, Navigation, Pagination } from 'swiper/dist/js/swiper.esm.js';
import 'swiper/dist/css/swiper.min.css';
import getObjFromDataAttr from './utils/getObjFromDataAttr';

Swiper.use([Navigation, Pagination]);

/**
 * Класс для коллекции слайдеров.
 * Элемент коллекции можно получить при помощи метода getByDOMElement
 */
export default class Sliders extends Collection {
    sliders = [
        {
            selector: '.main-slider .swiper-container',
            options: {
                slidesPerView: 1,
            },
        },
        {
            selector: '[data-slider]',
            options: {
                navigation: {
                    nextEl: '[data-slider-nav-next]',
                    prevEl: '[data-slider-nav-prev]',
                },
                slidesPerView: 1,
                loop: true,
                // 'preloadImages': true,
                lazy: true,
                allowTouchMove: false,
            },
        },
    ];

    constructor() {
        super();
        this.init();
    }

    getSliderByAttr({ attr, value }) {
        const slider = this.collection.find(
            item => item.instance.getAttribute(attr.slice(1, -1)) === value,
        );
        // const slider = this.collection.find(item => {
        //     const targetAttr = item.instance.getAttribute(attr === value
        /*
         * ! полученный атрибут === входящему value, но условие равенства не
         * срабатывает и возвращается undefined
         */
        //     if (targetAttr !== value) {
        //         return item;
        //     }
        // });
        return slider;
    }

    init() {
        this.sliders.forEach(slider => {
            const sliders = document.querySelectorAll(slider.selector);

            for (let sliderDOMElem of sliders) {
                const swiperSlider = new Slider(sliderDOMElem, slider.options);
                this.collection = swiperSlider;
            }
        });
    }
}

export class Slider {
    instance;
    swiperInstance;
    dataAttr = '[data-slider-images]';

    /**
     *
     * @param sliderDOMElem{HTMLElement}
     * @param options{Object}
     * @return {Class}
     */
    constructor(sliderDOMElem, options) {
        this.instance = sliderDOMElem;
        this.swiperInstance = new Swiper(sliderDOMElem, {
            ...options,
            on: {
                init: this.addSlidesToSlider,
            },
        });
    }

    createSlidesHtml = ({
        url,
        alt,
        index,
        width,
        height
    }) =>
        `<div class="slider__slide swiper-slide">
        <img src="${url}" alt="${alt}" title="${index + 1}: ${alt}" width="${width}" height="${height}" loading="lazy"/>
        </div>`;

    addSlidesToSlider = () => {
        const { imgData, sliderSizes } = getObjFromDataAttr(
            this.instance,
            this.dataAttr,
        );

        imgData.map((item, index) => {
            const html = this.createSlidesHtml({
                url: item.url,
                alt: item.alt,
                index,
                width: sliderSizes.width,
                height: sliderSizes.height,
            });

            this.instance.swiper.addSlide(index, html);
        });
    };
}
