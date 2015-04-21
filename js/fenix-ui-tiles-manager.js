define(['require',
        'jquery',
        'handlebars',
        'text!fenix_ui_tiles_manager/html/templates.html',
        'i18n!fenix_ui_tiles_manager/nls/translate',
        'text!fenix_ui_tiles_manager/config/tiles_configuration.json',
        'bootstrap',
        'sweetAlert'], function (Require, $, Handlebars, templates, translate, tiles_configuration) {

    'use strict';

    function TILES_MANAGER() {

        this.CONFIG = {
            lang: 'en',
            tile_ids: [],
            accordion_id: 'accordion_id',
            placeholder_id: 'placeholder',
            url_images: Require.toUrl('FENIX_UI_TILES_MANAGER_IMAGES'),
            accordion_elements_placeholder: 'accordion_elements_placeholder'
        };

    }

    TILES_MANAGER.prototype.init = function(config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Fix the language, if needed. */
        this.CONFIG.lang = this.CONFIG.lang != null ? this.CONFIG.lang : 'en';

        /* Cast the tiles configuration, if needed. */
        this.CONFIG.tiles_configuration = tiles_configuration;
        if (typeof this.CONFIG.tiles_configuration == 'string')
            this.CONFIG.tiles_configuration = $.parseJSON(this.CONFIG.tiles_configuration);

        /* Load template. */
        var source = $(templates).filter('#tiles_manager_structure').html();
        var template = Handlebars.compile(source);
        var dynamic_data = {
            accordion_id: this.CONFIG.accordion_id,
            accordion_elements_placeholder: this.CONFIG.accordion_elements_placeholder
        };
        var html = template(dynamic_data);
        $('#' + this.CONFIG.placeholder_id).html(html);

        /* Create accordion elements. */
        this.create_accordion_elements();

    };

    TILES_MANAGER.prototype.create_accordion_elements = function(tile_code) {

        /* Clear the presentation area. */
        $('#' + this.CONFIG.accordion_elements_placeholder).empty();

        /* Fix the tile code, if needed. */
        tile_code = tile_code == null ? 'main' : tile_code;

        /* Load template. */
        var source = $(templates).filter('#accordion_element').html();
        var template = Handlebars.compile(source);

        /* Iterate over sub modules. */
        for (var i = 0 ; i < this.CONFIG.tiles_configuration[tile_code].tiles.length ; i++) {

            /* Load section's configuration. */
            var section_code = this.CONFIG.tiles_configuration[tile_code].tiles[i];
            var tiles_placeholder = section_code + '_tiles_placeholder';
            var dynamic_data = {
                tiles_placeholder: tiles_placeholder,
                accordion_id: this.CONFIG.accordion_id,
                element_content: section_code + '_content',
                element_id: this.CONFIG.tiles_configuration[section_code].id,
                element_label: this.show_label(this.CONFIG.tiles_configuration[section_code].tile_title)
            };
            var html = template(dynamic_data);
            $('#' + this.CONFIG.accordion_id).append(html);

            /* Create tiles. */
            for (var j = 0 ; j < this.CONFIG.tiles_configuration[section_code].tiles.length ; j++)
                this.create_tile(tiles_placeholder, this.CONFIG.tiles_configuration[section_code].tiles[j]);

        }

        /* Expand GHG module. */
        $('#ghg_content').addClass('in');

    };

    TILES_MANAGER.prototype.create_tile = function(tiles_placeholder, tile_code) {

        /* Load template. */
        var source = $(templates).filter('#tile_structure').html();
        var template = Handlebars.compile(source);
        var dynamic_data = {
            tile_id: this.CONFIG.tiles_configuration[tile_code].id,
            tile_button_id: this.CONFIG.tiles_configuration[tile_code].id + '_button' ,
            tile_title: this.show_label(this.CONFIG.tiles_configuration[tile_code].tile_title),
            tile_button: this.show_label(this.CONFIG.tiles_configuration[tile_code].tile_button),
            tile_description: this.show_label(this.CONFIG.tiles_configuration[tile_code].tile_description),
            url_image: this.CONFIG.url_images + this.CONFIG.lang + '/' + this.CONFIG.tiles_configuration[tile_code].img
        };
        var html = template(dynamic_data);
        $('#' + tiles_placeholder).append(html);

        /* Register tile. */
        this.CONFIG.tile_ids.push({
            id: dynamic_data.tile_id,
            button_id: dynamic_data.tile_button_id,
            require_module: this.CONFIG.tiles_configuration[tile_code].require
        });

    };

    TILES_MANAGER.prototype.show_label = function(label_code) {
        return translate[label_code] != undefined ? translate[label_code] : label_code;
    };

    return TILES_MANAGER;

});