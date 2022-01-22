import { FileAttachCollection } from './fileAttach';
import FormValidation from './formValidation'
import FormSend from './formSend'
import {onAjaxContentLoaded} from "../generic/evented";

export default class Forms {
    FileAttachCollection = new FileAttachCollection();
    FormValidation = new FormValidation();
    FormSend = new FormSend();

    constructor() {
        this.bindEvents();
    }

    /**
     *
     * @param elem{HTMLElement}
     */
    static initFormCaptcha(elem) {
        if (typeof grecaptcha !== "undefined") {
            grecaptcha.render(elem);
        }
    }

    bindEvents() {
        onAjaxContentLoaded((e) => {
            const content = e.detail.content;
            const $captcha = content.find('.g-recaptcha');

            if ($captcha.length) {
                $captcha.each((index, el) => {
                    Forms.initFormCaptcha(el);
                });
            }
        });
    }
}