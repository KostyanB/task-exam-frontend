import Evented from './generic/evented'

export default class SvgUse extends Evented {
    constructor() {
        super('SvgUse');
        this.init();
    }
    init() {
        const self = this;
        ( function( window, document )
        {
            let file = window.SITE_TEMPLATE_PATH
                ? window.SITE_TEMPLATE_PATH + '/frontend/assets/icons.svg'
                : './icons.svg'
            ;
            
            const revision = window.INLINE_SVG_REVISION || false;
            
            if (window.SITE_TEMPLATE_PATH) {
                file = `${window.SITE_TEMPLATE_PATH}/frontend/assets/icons.svg?revision=${revision ? revision : 0}`;
            }
            
            if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect ) {
                return true;
            }
            
            var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
                request,
                data,
                insertIT = function()
                {
                    var g = document.createElement('div');
                    g.id = 'svg-sprite';
                    g.className = 'hidden';
                    document.body.appendChild(g);
                    document.getElementById('svg-sprite').insertAdjacentHTML( 'afterbegin', data );
                    window.svg4everybody({
                        polyfill: true // polyfill <use> elements for External Content
                    });
                    
                    self.markAsInited();
                },
                insert = function()
                {
                    if( document.body ) {
                        insertIT();
                    }
                    else {
                        document.addEventListener( 'DOMContentLoaded', insertIT );
                    }
                };
            
            try
            {
                request = new XMLHttpRequest();
                request.open( 'GET', file, true );
                request.onload = function()
                {
                    if( request.status >= 200 && request.status < 400 )
                    {
                        data = request.responseText;
                        insert();
                        if( isLocalStorage )
                        {
                            localStorage.setItem('inlineSVGdata', data);
                            localStorage.setItem('inlineSVGrev', revision);
                        }
                    }
                };
                request.send();
            }
            catch( e ) {
                console.error(e);
            }
            
        }( window, document ) );
    }
}
