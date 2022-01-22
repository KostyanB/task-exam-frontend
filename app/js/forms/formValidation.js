export default class FormValidation {
    form = '[data-form]';
    formInput = '[data-input-required]';
    formInputError = '[data-input-error]';
    formInputPlaceholder = '[data-input-placeholder]';
    termsInput = '[data-input-required-terms]';

    emptyMsg = {
        default: {
            ru: 'Заполните поле!',
            en: 'Fill in the field'
        },
        file: {
            ru: 'Укажите файл',
            en: 'Specify a file'
        },
    };

    invalidMsg = {
        default: {
            ru: 'Неверный формат',
            en: 'Wrong format'
        },
        password: {
            ru: 'Не совпадают',
            en: 'Do not match'
        }
    };

    constructor() {
        this.bindEvents();
    }

    formTermsInput () {
        return this.termsInput.substring(1,this.termsInput.length - 1)
    }

    formInputSelector () {
        return this.formInput.substring(1,this.formInput.length - 1)
    }

    formInputPlaceholderSelector () {
        return this.formInputPlaceholder.substring(1,this.formInputPlaceholder.length - 1)
    }

    bindEvents () {
        const self = this;

        $(document).on('submit', this.form, function () {
            self.validate($(this));

            return false;
        });

        $(document).on('focus click', this.formInput, function () {
            $(this).attr('placeholder', $(this).attr(self.formInputPlaceholderSelector()))
        });

        $(document).on('blur', this.form + ' ' + this.formInput, function () {
            self.validate($(this).closest('form'), $(this))
        });

        $(document).on('change', this.termsInput, function () {
            // self.termsToggle($(this));
        });
    }

    validate ($form, inputs) {
        const self = this;
        const $inputs = inputs || $form.find(this.formInput);
        const valid = [];

        $inputs.each(function () {
            const type = $(this).attr(self.formInputSelector()) || 'text';
            const val = $(this).val();

            const formBlock = $(this).closest('.form-block');
            const errorMsg = $(this).attr('data-input-error') || null;

            $(this).removeClass('invalid');
            formBlock.find('.form-block__error').empty();

            if (!val.length) {
                valid.push(self.invalid($(this), errorMsg));
            } else {
                switch (type) {
                    case 'email':
                        valid.push(self.validateEmail(val)
                            ? self.valid($(this))
                            : self.invalid($(this), self.invalidMsg.default[App.lang])
                        );

                        break;
                    case 'phone':
                        valid.push(self.validatePhone(val)
                            ? self.valid($(this))
                            : self.invalid($(this), self.invalidMsg.default[App.lang])
                        );

                        break;
                    case 'checkbox':
                        valid.push(self.validateCheckbox($(this))
                            ? self.valid($(this))
                            : self.invalid($(this))
                        );

                        break;
                    case 'password':
                        valid.push(self.validatePassword($(this))
                            ? self.valid($(this))
                            : self.invalid($(this), self.invalidMsg.password)
                        );

                        break;
                    default:
                        valid.push(self.validateText($(this))
                            ? self.valid($(this))
                            : self.invalid($(this), self.invalidMsg.default[App.lang])
                        );

                        break;
                }
            }
        });

        if (!inputs) {
            let validCount = 0;

            valid.forEach(function (item) {
                item ? validCount++ : null
            });

            if (valid.length === validCount) {
                $form.trigger('form::valid');
            }

            return valid.length === validCount;
        }
    }

    validateEmail (email) {
        const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validatePhone (phone) {
        const cleanPhone = phone.replace(/\s/g, "");
        const re = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s]?[(]?[0-9]{1,3}[)]?([-\s]?[0-9]{3})([-\s]?[0-9]{3,4})/g;
        return re.test(cleanPhone);
    }

    validateCheckbox ($elem) {
        return $elem.prop('checked')
    }

    validatePassword ($elem) {
        const $elems = $elem.closest('form').find('[data-input-required="password"]');
        const passValues = [];

        $elems.each(function () {
            passValues.push($(this).val());
        });

        return passValues[0] === passValues[1];
    }

    validateText ($elem) {
        return !!($elem.val().length);
    }

    invalid (elem, errorMessage) {
        let message = errorMessage || this.emptyMsg.default[App.lang];

        elem.removeClass('valid').addClass('invalid');
        elem.attr('placeholder', message);

        return false;
    }

    valid(elem) {
        elem.removeClass('invalid').addClass('valid');

        return true;
    }
}