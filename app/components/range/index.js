import './style.css';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import Collection from '../../js/generic/collection';
import getObjFromDataAttr from '../../js/utils/getObjFromDataAttr';
import formatNumToShow from '../../js/utils/formatNumToShow';

const range = '[data-js-range]';

export default class Ranges extends Collection {
    constructor() {
        super(range, Range);
        this.init();
    }

    // заменил на getInstanceByAttr в Coollecnion
    // getRangeByAttr({ attr, value }) {
    //     return this.collection.find(item => item.instance[attr] === value);
    // }

    init() {
        const els = document.querySelectorAll(range);
        if (els.length) {
            els.forEach(item => {
                this.collection = new Range(item);
            });
        }
    }
}

export class Range {
    constructor(instance) {
        this.instance = instance;
        this.preset = getObjFromDataAttr(this.instance, range);
        this.init();
    }

    getRangeValue = () =>
        [...this.instance.noUiSlider.getTooltips()].map(
            item => item.textContent.split(' ')[1]);

    createStr = (prefix, value, currency) => `${prefix} ${formatNumToShow(value, currency)}`;

    createValue = str => Number(str.split(' ')[1]);

    init() {
        const {
            startPos,
            endPos,
            minVolume,
            maxVolume,
            step,
            margin,
            currency,
            prefixes,
        } = this.preset;

        noUiSlider.create(this.instance, {
            start: [startPos, endPos],
            connect: true,
            range: {
                min: minVolume,
                max: maxVolume,
            },
            step,
            tooltips: [
                {
                    to: value => this.createStr(prefixes[0], value, currency),
                    from: value => this.createValue(value)
                },
                {
                    to: value => this.createStr(prefixes[1], value, currency),
                    from: value => this.createValue(value)
                },
            ],
            margin,
        });
    }
}