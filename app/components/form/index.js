import './style.css';
import Forms from '../../js/forms/forms';

export default class TaskForm extends Forms {
    surname = '[data-task-form-surname]';

    constructor() {
        super();
        this.surnameInput = document.querySelector(this.surname);

        this.surnameInput && this.init();
    }

    normaliseSurname() {
        this.surnameInput.value = this.surnameInput.value.replace(
            /[^а-яё-\s]/gi,
            '',
        );
    }

    init() {
        this.surnameInput.addEventListener('input', () =>
            this.normaliseSurname(),
        );
    }
}
