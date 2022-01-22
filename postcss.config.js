// PostCss plugins
const { browserslist } = require('./package');

module.exports = {
    plugins: {
        'postcss-easy-import': {},
        // 'postcss-inline-svg': {},
        'autoprefixer': {
            'browsers': browserslist
        },
        'postcss-mixins': {},
        'postcss-for': {},
        'postcss-nested': {},
        // 'postcss-pxtorem': {
        //     selectorBlackList: ['html'],
        // },
        'postcss-extend': {},
        'postcss-custom-media': {},
        //'postcss-css-variables': {},   // Включаем, если нужен IE 11
        'postcss-color-function': {},
        'postcss-flexbugs-fixes': {},
        'postcss-input-style': {},
        'postcss-object-fit-images': {},
        'postcss-gradient-transparency-fix': {},
        'postcss-100vh-fix': {}
    }
};