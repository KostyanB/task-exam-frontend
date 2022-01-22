function requireAll(r) {
    r.keys().forEach(r);
}

requireAll(require.context('./icons', true, /\.svg$/));

// Load plugins
import 'jquery'
import IMask from 'imask'

import svg4everybody from 'svg4everybody'
window.svg4everybody = svg4everybody;

import objectFitImages from 'object-fit-images'
window.objectFitImages = objectFitImages;

import imagesLoaded from 'imagesloaded'
window.imagesLoaded = imagesLoaded;

// load modules
import Utils from './js/utils/utils'
import SvgUse from './js/svgUse'
import Tabs from './js/tabs'
import Sliders from './js/sliders'
import Modals from './js/modals'
import Forms from './js/forms/forms'

// Load components

// import ExampleComponent from "./components/_example";
import './components/breadcrumbs'
import './components/pagination'

// Task components
import Ranges from './components/range'
import SliderInfo from './components/sliderInfo'
import OpenPopup from './js/openPopup'
import YaMaps from './components/yaMap'
import TaskForm from './components/form'

import './components/buttons'
import './components/navigation'
import './components/info'
import './components/slider'

// Load styles
import './styles/app.js';

// Run components

window.App = {
    lang: 'ru'
};

if (window.SITE_LANG) {
    App.lang = window.SITE_LANG;
}


document.addEventListener('DOMContentLoaded', function() {
    objectFitImages();

    App.Utils = new Utils();
    App.Forms = new Forms();
    App.SvgUse = new SvgUse();
    App.Sliders = new Sliders();
    App.Tabs = new Tabs();
    App.Modals = new Modals();
    // Init task components
    App.Ranges = new Ranges();
    App.SliderInfo = new SliderInfo();
    App.OpenPopup = new OpenPopup();
    App.YaMaps = new YaMaps();
    App.TaskForm = new TaskForm();

    $('.inputmask').each(function () {
        IMask($(this)[0], {mask: "+{7} (000) 000-0000"});
    });

    // prevent copying

    $('.no-select').on('selectstart', false);

    $(".no-select img").on('mousedown', false);
});