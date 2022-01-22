import { instance as fileAttachInstance } from "./fileAttach";

export default class FormSend {
    constructor() {
        let self = this;

        $(document).on('form::valid', '[data-form]:not([data-form-no-ajax])', function() {
            const form = $(this);
            const formData = new FormData(form[0]);

            self.send(form, formData);
        });
    }

    extendFiles(form, formData) {
        const $files = form.find(fileAttachInstance);

        $files.each((index, fileElem) => {
            const fileAttacher = App.Forms.FileAttachCollection.getByDOMElement(fileElem);
            const $input = fileAttacher.$input;
            const name = $input.attr('name');

            if (fileAttacher.isMultiple) {
                formData.delete(name);

                fileAttacher.files.forEach(file => {
                    formData.append(name, file.file);
                });
            }
        });
    }

    resetFiles(form) {
        const $files = form.find(fileAttachInstance);

        $files.each((index, fileElem) => {
            const fileAttacher = App.Forms.FileAttachCollection.getByDOMElement(fileElem);
            fileAttacher.clear();
        });
    }

    send(form, formData) {
        const self = this;
        if (!form.attr('data-ajax-no-loader')) {
            /*App.Loader.showLoader();*/
        }

        const haveFiles = !!form.find(fileAttachInstance).length;
        if (haveFiles) {
            this.extendFiles(form, formData);
        }

        $.ajax({
            type: "POST",
            data: formData,
            url: form.attr('data-ajax-url') || (window.SITE_TEMPLATE_PATH ? window.SITE_TEMPLATE_PATH + "/ajax/form.php" : ''),
            processData: false,
            contentType: false,
            beforeSend: function () {
                // Удаляем блок с ошибками перед отправкой
                form.find('.form-row--errors').remove();
            },
            success: function (data) {
                if (!form.attr('data-ajax-no-loader')) {/*App.Loader.hideLoader();*/}

                const parsedData = JSON.parse(data);

                if (parsedData.errors) {
                    // Кидаем ошибки в начало формы
                    form.prepend('<div class="form-row form-row--errors"></div>');
                    const errorsBlock = form.find('.form-row--errors');

                    // Каждую ошибку добавляем в алерт
                    parsedData.errors.forEach(function (item) {
                        errorsBlock.prepend('<div class="alert alert--red">' + item + '</div>');
                    });
                } else {
                    form.trigger('form::successful', parsedData);

                    // Очищаем форму
                    if (!form.attr('data-ajax-noclean')) {
                        form[0].reset();
                        self.resetFiles(form);
                    }

                    $.fancybox.close();

                    if (parsedData.modal_success) {
                        $.fancybox.open({
                            src: parsedData.modal_success,
                            type: 'html'
                        });

                        return;
                    }

                    $.fancybox.open({
                        src  : form.attr('data-ajax-success-form') || '#modal-success',
                        type : 'inline'
                    });
                }
            },
            error: function () {
                form[0].reset();
                self.resetFiles(form);

                $.fancybox.close();

                $.fancybox.open({
                    src  : '#modal-error',
                    type : 'inline'
                });
            }
        });
    }
}