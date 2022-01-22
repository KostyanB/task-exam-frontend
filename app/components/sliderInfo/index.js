import './style.css';
import toTwoDigit from '../../js/utils/toTwoDigit';

export default class SliderInfo {
    dataAttr = '[data-target-slider]';
    els = {
        taskSlider: '[data-slider]',
        totalSlide: '[data-slider-count-total]',
        activeSlide: '[data-slider-count-active]',
    };

    constructor() {
        this.sliderInfo = document.querySelector(this.dataAttr);

        /**
         * !? не находит instance по атрибуту???
        */

        // this.targetSlider = this.sliderInfo.getAttribute(
        //     `${this.dataAttr.slice(1, -1)}`,
        // );

        // this.swiper1 = App.Sliders.getSliderByAttr({
        //     attr: this.els.taskSlider.slice(1, -1),
        //     value: 'task-slider'//this.targetSlider,
        // }).swiperInstance;
        // console.log('this.swiper1: ', this.swiper1);

        this.swiper = document.querySelector('[data-slider]')?.swiper;
        this.totalSlide = document.querySelector(this.els.totalSlide);
        this.activeSlide = document.querySelector(this.els.activeSlide);
        this.slidesCount= this.swiper?.slides.length - 2;

        this.swiper && this.init();
    }

    setTotalCount() {
        this.totalSlide.textContent = toTwoDigit(this.slidesCount);
    }

    correctActiveBecauseLoop = active =>
        (active =
            active === 0
                ? this.slidesCount
                : active === this.slidesCount + 1
                    ? 1
                    : active);

    setShowActiveSlide() {
        let active = this.swiper.activeIndex;
        active = this.correctActiveBecauseLoop(active);

        this.activeSlide.textContent = toTwoDigit(active);
    }

    setSliderParam() {
        console.log('set');
        const targetSlider = this.sliderInfo.getAttribute(
            `${this.dataAttr.slice(1, -1)}`,
        );

        this.swiper = App.Sliders.getSliderByAttr({
            attr: this.els.taskSlider,
            value: targetSlider,
        })?.swiperInstance;

        this.slidesCount = this.swiper?.slides.length - 2;
        if (this.swiper) {
            this.listeners();
            // this.setTotalCount();

        }

    }

    init() {

        // if (this.swiper) {
        // this.setSliderParam();
        this.setTotalCount();
        this.setShowActiveSlide();
        this.listeners();
        // }
    }

    listeners() {
        this.swiper.on('slideChange', () => this.setShowActiveSlide());

        // this.swiper.on('init', () => {
        //     console.log(this.swiper);
        //     this.setTotalCount();
        //     this.setShowActiveSlide();
        // })

    }
}
