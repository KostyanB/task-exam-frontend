export const ajaxContentLoadedEvent = 'ajaxContentLoaded';

/**
 * Класс для событий
 *
 * Пример подписки на успешную инициализацию класса:
 *
 * document.addEventListener('SvgUseModuleLoaded', function(e) {
 *  console.debug(e);
 * });
 */
export default class Evented {
    event;
    loaded = false;

    constructor(eventName) {
        this.event = document.createEvent('Event');
        this.event.initEvent(`${eventName}ModuleLoaded`, true, true);
    }

    preInit() {}

    postInit() {}

    markAsInited() {
        this.loaded = true;
        document.dispatchEvent(this.event);
    }
}

/**
 * Функция для инициализации события выполнения запроса (AJAX, Fetch, etc.)
 * @param data{Object}
 */
export function dispatchAjaxContentLoaded(data) {
    document.dispatchEvent(
        new CustomEvent(ajaxContentLoadedEvent, {
            detail: data
        })
    );
}

/**
 * Функция для подписки на событие выполнения запроса (AJAX, Fetch, etc.)
 * @param callback{Function}
 */
export function onAjaxContentLoaded(callback) {
    document.addEventListener(ajaxContentLoadedEvent, e => callback(e))
}
