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
        this.totalSlide = document.querySelector(this.els.totalSlide);
        this.activeSlide = document.querySelector(this.els.activeSlide);
        this.swiper;
        this.slidesCount;

        this.sliderInfo && this.init();
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

    getSliderParam() {
        const targetSlider = this.sliderInfo.getAttribute(
            `${this.dataAttr.slice(1, -1)}`,
        ); // 'task-slider'

        this.swiper = App.Sliders.getInstanceByAttr({
            attr: this.els.taskSlider.slice(1, -1),
            value: 'task-slider',
            // value: targetSlider, // ? так не находит
        }).swiperInstance;

        this.slidesCount = this.swiper?.slides.length - 2;

        this.setInitialParameters();
    }

    setInitialParameters() {
        this.setTotalCount();
        this.setShowActiveSlide();
    }

    setListeners() {
        this.swiper.on('slideChange', () => this.setShowActiveSlide());
    }

    init() {
        this.getSliderParam();
        this.setListeners();
    }
}
