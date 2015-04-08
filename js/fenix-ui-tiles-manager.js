define(['jquery',
        'handlebars',
        'text!fenix_ui_tiles_manager/html/templates.html',
        'i18n!fenix_ui_tiles_manager/nls/translate',
        'bootstrap',
        'sweetAlert'], function ($, Handlebars, templates, translate) {

    'use strict';

    function TILES_MANAGER() {

        this.CONFIG = {
            lang: 'E',
            placeholder_id: 'placeholder'
        };

    }

    TILES_MANAGER.prototype.init = function(config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Fix the language, if needed. */
        this.CONFIG.lang = this.CONFIG.lang != null ? this.CONFIG.lang : 'E';

    };

    return TILES_MANAGER;

});