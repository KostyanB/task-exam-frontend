## Тестово-экзаменационное задание на позицию frontend-разработчик


## О приложении

* Реализована тестово-экзаменационная страница по [макету в Figma](), ( [Скрин макета](http://joxi.ru/zANXG6Zt1wnagm) ), в соответствии с [требованиями]() к выполнению
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
