define(['jquery',
        'handlebars',
        'text!fenix_ui_tiles_manager/html/templates.html',
        'i18n!fenix_ui_tiles_manager/nls/translate',
        'text!fenix_ui_tiles_manager/config/tiles_configuration.json',
        'bootstrap',
        'sweetAlert'], function ($, Handlebars, templates, translate, tiles_configuration) {

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

        /* Cast the tiles configuration, if needed. */
        this.CONFIG.tiles_configuration = tiles_configuration;
        if (typeof this.CONFIG.tiles_configuration == 'string')
            this.CONFIG.tiles_configuration = $.parseJSON(this.CONFIG.tiles_configuration);

        console.log(this.CONFIG.tiles_configuration);

        $('#' + this.CONFIG.placeholder_id).html('tiles manager');

    };

    return TILES_MANAGER;

});