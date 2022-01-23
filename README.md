## Тестово-экзаменационное задание на позицию frontend-разработчик


## О приложении

* Реализована тестово-экзаменационная страница по [макету в Figma](https://www.figma.com/file/9s1RtO7rBXUVK9DouLv465/%D0%9F%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5-%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B8-%D1%8D%D0%BA%D0%B7%D0%B0%D0%BC%D0%B5%D0%BD%D0%B0%D1%86%D0%B8%D1%8F-%D0%BF%D0%BE-front-end?node-id=0%3A1), ( [Скрин макета](https://github.com/KostyanB/task-exam-frontend/blob/master/task/task_screen.jpg) ), в соответствии с [требованиями](https://github.com/KostyanB/task-exam-frontend/blob/master/task/%D0%97%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5.pdf) к выполнению
* После запуска перейти на вкладку "Задание"

## Стек

* Native JS ООП, HTML шаблонизатор EJS, постпроцессор PostCSS, Yandex.Maps API, SwiperJS, IMaskJS, NouisliderJS, SVG Sprites, jQuery Fancybox
* Компонентный подход к построению структуры приложения
* Файлы конфигурации вынесены в data-атрибуты, содержащие JSON-конфиги с объектами настроек (параметры карты, обработка
формы и т.п.)


## Установка

* Скопировать файлы репозитория в рабочую папку
* Запуск developer mode командой `npm start`
* В браузере перейти по адресу `http://localhost:8080/`
* Если проблемы с установкой и запуском npm start:

- удалить package-lock.json,
- удалить node_modules,
- npm uninstall babel-core,
- npm uninstall babel-loader,
- npm i
- npm install babel-loader
