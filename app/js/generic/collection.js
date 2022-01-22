/**
 * Класс для коллекций
 * Коллекция нужна для хранения экземпляров одного класса, получения/удаления этого экземпляра
 */

export default class Collection {
    /**
     * Сама коллекция экземпляров
     * @type {Array}
     * @private
     */
    _collection = [];

    /**
     * MutationObserver для отслеживания и удаления из коллекции динамически удаляемых экземпляров
     * @type{MutationObserver}
     */
    collectionObserver;

    /**
     * Конфигурация для MutationObserver
     * @type {MutationObserverInit}
     */
    collectionObserverConfig =  {
        attributes: false,
        childList: true,
        subtree: true
    };

    /**
     * Селектор по которому отслеживается динамически изменяемый контент
     * @type{String}
     */
    collectionObserverInstance;

    /**
     * Класс, экземпляр которого будет создан при появлении в DOM-дереве
     * @type{Class}
     */
    collectionObserverClass;

    /**
     *
     * @param instance{String} - см. collectionObserverInstance
     * @param _class{Class} - см. collectionObserverClass
     */
    constructor(instance, _class) {
        this.collectionObserverInstance = instance;
        this.collectionObserverClass = _class;

        this.collectionObserve();
    }

    /**
     * Добавляет экземпляр в коллекцию. По-умолчанию проверяет, существует ли экземпляр с таким instance.
     * Если существует, то добавления не происходит (возможно, стоит что-то делать в таком случае)
     * @param newCollectionItem{Class}
     */
    set collection(newCollectionItem) {
        const itemInCollection = this.getByDOMElement(newCollectionItem.instance);

        if (!itemInCollection) {
            this._collection = [...this._collection, newCollectionItem];
        }
    }

    /**
     * Публичная коллекция
     * @return {Array}
     */
    get collection() {
        return this._collection
    }

    /**
     * Ищет внутри коллекции по DOM-элементу. У экзепляров класса должен быть параметр instance, по нему идет проверка
     * @param DOMElement{Element}
     * @returns {Class}
     */
    getByDOMElement(DOMElement) {
        return this.collection.find(item => item.instance.isEqualNode(DOMElement))
    }

    /**
     * Ищет внутри коллекции по атрибуту и его значению
     */
    getInstanceByAttr({ attr, value }) {
        return this.collection.find(item => item.instance.getAttribute(attr) === value);
    }
    /**
     * Удаление из коллекции по экземпляру класса
     * @param collectionItem{Class}
     */
    removeFromCollection(collectionItem) {
        const collectionItemIndex = this.collection.indexOf(collectionItem);
        this._collection.splice(collectionItemIndex, 1);
    }

    /**
     * Удаление из коллекции по DOMElement'у
     * @param DOMElement{Element}
     */
    removeFromCollectionByDOMElement(DOMElement) {
        const collectionItemIndex = this.collection.findIndex(collectionItem => collectionItem.instance.isEqualNode(DOMElement));
        this._collection.splice(collectionItemIndex, 1);
    }

    /**
     * Инициализириует MutationObserver и запускает наблюдение
     */
    collectionObserve() {
        this.collectionObserver = new MutationObserver(this.collectionObserveCallback.bind(this));
        this.collectionObserver.observe(document.body, this.collectionObserverConfig);
    }

    /**
     * Callback-наблюдатель
     * @param mutationsList{MutationRecord}
     * @param observer{MutationObserver}
     */
    collectionObserveCallback(mutationsList, observer) {
        this.collectionObserveRemoving();
        this.collectionObserveAdding();
    }

    /**
     * Метод проверяет присутствует ли DOMElement на странице после изменений
     * и в случае отсутствия удаляет его из коллекции
     */
    collectionObserveRemoving() {
        this.collection.forEach(collectionItem => {
            if (!document.contains(collectionItem.instance)) {
                this.removeFromCollection(collectionItem)
            }
        });
    }

    /**
     * Метод проверяет появился ли DOMElement на странице после изменений
     * и в случае его появления добавляет его в коллекцию
     */
    collectionObserveAdding() {
        if (this.collectionObserverInstance) {
            const instances = document.querySelectorAll(this.collectionObserverInstance);

            for (let instance of instances) {
                const itemInCollection = this.getByDOMElement(instance);

                if (!itemInCollection && this.collectionObserverClass) {
                    this.collection = new this.collectionObserverClass(instance);
                }
            }
        }
    }
}