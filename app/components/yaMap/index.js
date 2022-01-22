import Collection from '../../js/generic/collection';
import getObjFromDataAttr from '../../js/utils/getObjFromDataAttr';

const yaMap = '[data-js-map-options]';
const taskMapAPI = 'f0806622-1125-4d92-ad8e-00a2b43767dc&';

export class YaMap {

    constructor(instance) {
        this.map;
        this.yaMap = yaMap;
        this.instance = instance;
        this.options = getObjFromDataAttr(this.instance, this.yaMap);

        (this.instance && this.options) && this.createMap();
    }

    getCenter() {
        return this.map.getCenter();
    }

    createMap() {
        this.map = new ymaps.Map(this.options.containerId, {
            center: this.options.center,
            zoom: 14
        }, {
            searchControlProvider: 'yandex#search'
        });

        // this.createPlacemarkCollection()
        const taskCollection = new ymaps.GeoObjectCollection({}, {
            preset: 'islands#violetCircleDotIcon'
        });

        this.options.placemarks.forEach(item => {
            taskCollection.add(new ymaps.Placemark(item, {}));
        });

        this.map.geoObjects.add(taskCollection);

        taskCollection.events
            .add('mouseenter', e => {
                e.get('target').options.set('preset', 'islands#yellowCircleDotIcon');
            })
            .add('mouseleave', e => {
                e.get('target').options.unset('preset');
            })
            .add('click', e => {
                const target = e.get('target').geometry.getCoordinates();

                this.map.panTo(target);
            });

    }

    createPlacemarkCollection = () => {
        console.log('col');
        const taskCollection = new ymaps.GeoObjectCollection({}, {
            preset: 'islands#violetCircleDotIcon'
        });

        this.options.placemarks.forEach(item => {
            taskCollection.add(new ymaps.Placemark(item, {}));
        });

        this.map.geoObjects.add(taskCollection);

        this.addListeners(taskCollection);
    }

    addListeners = (taskCollection) => {
        taskCollection.events
            .add('mouseenter', e => {
                e.get('target').options.set('preset', 'islands#yellowCircleDotIcon');
            })
            .add('mouseleave', e => {
                e.get('target').options.unset('preset');
            })
            .add('click', e => {
                const target = e.get('target').geometry.getCoordinates();

                this.map.panTo(target);
            });
    }
}

export default class YaMaps extends Collection {
    constructor() {
        super();
        this.yaMap = yaMap;
        this.isAPILoading = false;
        this.instances = document.querySelectorAll(this.yaMap);

        if (this.instances.length) {
            this.getApi()
        }

        this.bindEvents();
    }

    addIsReadyApiEvent() {
        const event = new CustomEvent('readyMapApi')
        document.dispatchEvent(event);
    }

    getApi() {
        if (this.isAPILoading) {
            return;
        }

        this.isAPILoading = true;

        const script = document.createElement('script');
        const lang = (App.lang === 'ru') ? 'ru_RU' : 'en_US';
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${taskMapAPI}&lang=${lang}&onload=App.YaMaps.addIsReadyApiEvent`;
        script.setAttribute('defer', 'true');
        script.async = true;

        document.head.append(script);
    }

    // заменил на getInstanceByAttr в Coollecnion
    // getMapByAttr({ attr, value }) {
    //     return this.collection.find(item => item.instance[attr] === value);
    // }

    createMapsCollection() {
        this.instances.forEach(item => {
            this.collection = new YaMap(item)
        })
    }

    bindEvents() {
        document.addEventListener('readyMapApi', () => this.createMapsCollection())
    }
}