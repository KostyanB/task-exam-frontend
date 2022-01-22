import Collection from "../generic/collection";

export const instance = '[data-file-attacher]';

export class FileAttach {
    instance = instance;
    input = '[data-file-attacher-input]';
    addBtn = '[data-file-attacher-add-btn]';
    fileList = '[data-file-attacher-file-list]';

    files = [];

    constructor(instance) {
        this.instance = instance;
        this.$instance = $(instance);
        this.$addBtn = $(instance).find(this.addBtn);
        this.$input = $(instance).find(this.input);
        this.$fileList = $(instance).find(this.fileList);

        this.isMultiple = this.$input[0].hasAttribute('multiple');

        this.bindEvents();
    }

    attach() {
        const input = this.$input[0];

        if (!this.isMultiple) {
            this.clear();
        }

        for (let i = 0; i < input.files.length; i++) {
            const file = input.files[i];
            const index = this.files.length
                ? this.files[this.files.length - 1].index + 1
                : 0
            ;

            const data = {
                name: file.name,
                size: FileAttach.bytesToSize(file.size),
                index
            };

            if (!this.files.find(file => file.file.name === data.name)) {
                const itemTpl = FileAttach.fileTemplate(data);

                this.files.push({
                    index,
                    file
                });

                this.$fileList.append(itemTpl);
            }
        }
    }

    static fileTemplate({name, size, index}) {
        return `
			<li class="file-attacher__list-item" data-file-attacher-file="${index}">
				<div class="file-attacher__list-item-name">${name}</div>
				<span class="file-attacher__list-item-size">${size}</span>
				<a href="#" class="file-attacher__list-item-remove" data-file-attacher-file-remove>Удалить</a>
			</li>
		`;
    }

    removeFile(index) {
        const $file = this.$fileList.find(`[data-file-attacher-file="${index}"]`);
        $file.remove();

        const inArrIndex = this.files.findIndex((el) => el.index === Number(index));
        this.files.splice(inArrIndex, 1);

        if (!this.files.length) {
            this.$fileList.html('');
        }
        this.$input.val('');
    }

    clear() {
        this.files = [];
        this.$fileList.html('');

        if (this.isMultiple) {
            this.$input.val('');
        }
    }

    static bytesToSize(bytes) {
        const sizes = ['Байт', 'Кб', 'Мб', 'Гб', 'Тб'];
        bytes = Number(bytes);

        if (bytes === 0) {
            return '0 Байт';
        }
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    bindEvents() {
        $(this.$input).on('change', () => {
            this.attach();
        });

        $(this.$instance).on('click', (e) => {
            if ($(e.target)[0].hasAttribute('data-file-attacher-file-remove')) {
                e.preventDefault();
                const index = $(e.target).closest('[data-file-attacher-file]').attr('data-file-attacher-file');
                this.removeFile(index);
            }
        });
    }
}

export class FileAttachCollection extends Collection {
    constructor() {
        super(instance, FileAttach);

        this.init();
        this.bindEvents();
    }

    init() {
        $(instance).each((index, el) => {
            this.collection = new FileAttach(el)
        });
    }

    bindEvents() {}
}