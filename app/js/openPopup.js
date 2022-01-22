import { onAjaxContentLoaded } from './generic/evented';
import formatNumToShow from './utils/formatNumToShow';

export default class OpenPopup {
    targetAttr = 'id'
    els = {
        rangeInfo: '[data-js-modal-range-info]',
        mapInfo: '[data-js-modal-map-info]',
    };

    constructor() {
        this.targetRange = 'range';
        this.targetMap = 'yaMap';

        this.init();
    }

    getActiveMapCenter = () =>
        App.YaMaps.getInstanceByAttr({
            attr: this.targetAttr,
            value: this.targetMap,
        }).getCenter();
        // App.YaMaps.getMapByAttr({
        //     attr: this.targetAttr,
        //     value: this.targetMap,
        // }).getCenter();

    showActiveMapCenter = () => {
        const mapInfoElement = document.querySelector(this.els.mapInfo);
        const center = this.getActiveMapCenter();

        mapInfoElement.textContent = `${center[0].toFixed(4)}, ${center[1].toFixed(4)}`;
    };

    getRangePositions = () => {
        // const range = App.Ranges.getRangeByAttr({
        //     attr: this.targetAttr,
        //     value: this.targetRange,
        // });

        const range = App.Ranges.getInstanceByAttr({
            attr: this.targetAttr,
            value: this.targetRange,
        });

        return {
            rangeData: range.getRangeValue(),
            currency: range.preset.currency,
        };
    };

    showRangePositions = () => {
        const { rangeData, currency } = this.getRangePositions();
        const rangeInfoElements = document.querySelectorAll(this.els.rangeInfo);

        rangeInfoElements.forEach((item, i) => {
            item.textContent = formatNumToShow(
                rangeData[i],
                currency,
            );
        });
    };

    handleOpenPopup = () => {
        this.showRangePositions();
        this.showActiveMapCenter();
    };

    init() {
        onAjaxContentLoaded(this.handleOpenPopup);
    }
}
