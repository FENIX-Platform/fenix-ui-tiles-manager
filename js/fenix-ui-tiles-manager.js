define([
        'require',
    'jquery',
        'handlebars',
        'text!fenix_ui_tiles_manager/html/templates.html',
        'i18n!fenix_ui_tiles_manager/nls/translate',
        'text!fenix_ui_tiles_manager/config/tiles_configuration.json',
        'FENIX_UI_PATHS',
        'bootstrap',
        'sweetAlert'], function (Require, $, Handlebars, templates, translate, tiles_configuration, FENIX_UI_PATHS) {

    'use strict';

    function TILES_MANAGER() {

        this.CONFIG = {
            lang: 'E',
            placeholder_id: 'placeholder',
            url_images: Require.toUrl('FENIX_UI_TILES_MANAGER_IMAGES')
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

        /* Load template. */
        //var source = $(templates).filter('#tiles_manager_structure').html();
        //var template = Handlebars.compile(source);
        //var dynamic_data = {};
        //var html = template(dynamic_data);
        //$('#' + this.CONFIG.placeholder_id).html(html);

        /* Load tiles. */
        this.show_tiles();

    };

    TILES_MANAGER.prototype.show_tiles = function(tile_code) {

        /* Clear the presentation area. */
        $('#tiles_container').empty();

        /* Fix the tile code, if needed. */
        tile_code = tile_code == null ? 'main' : tile_code;

        /* Iterate over sub modules. */
        for (var i = 0 ; i < this.CONFIG.tiles_configuration[tile_code].tiles.length ; i++) {

            /* Read sub-module code. */
            var sub_tile_code = this.CONFIG.tiles_configuration[tile_code].tiles[i];

            /* Render the sub-module. */
            switch (this.CONFIG.tiles_configuration[sub_tile_code]['type']) {
                case 'section':
                    this.show_section(sub_tile_code);
                    break;
                case 'module':
                    this.show_module(tile_code);
                    break;
            }

        }


    };

    TILES_MANAGER.prototype.show_section = function(tile_code) {

        /* This... */
        var _this = this;

        /* Tile object. */
        var tile = this.CONFIG.tiles_configuration[tile_code];

        /* Define template variables. */
        var source = $(templates).filter('#main_tile_structure').html();
        var template = Handlebars.compile(source);
        var dynamic_data = {
            main_tile_id: tile.id,
            module_tile_id: tile.id,
            tile_img: this.CONFIG.url_images + tile.img,
            tile_title: this.show_label(tile.tile_title),
            tile_description: this.show_label(tile.tile_description),
            tile_button: this.show_label(tile.tile_button)
        };
        var html = template(dynamic_data);

        /* Append the tile to the interface. */
        $('#' + this.CONFIG.placeholder_id).append(html);
        //$('#' + this.CONFIG.placeholder_id).append(html);

        $('#' + tile.id).click(function() {
            _this.show_tiles(this.id);
        });

    };

    TILES_MANAGER.prototype.show_label = function(label_code) {
        return translate[label_code] != null ? translate[label_code] : label_code;
    };

    TILES_MANAGER.prototype.show_module = function(tile_code) {

        /* This... */
        var _this = this;

        /* Tile object. */
        var tile = this.CONFIG.tiles_configuration[tile_code];

        /* Define template variables. */
        var source = $(templates).filter('#module_tile_structure').html();
        var template = Handlebars.compile(source);
        var dynamic_data = {
            main_tile_id: tile.id,
            module_tile_id: tile.id,
            tile_img: this.CONFIG.url_images + this.CONFIG.lang + tile.img,
            tile_title: tile.title,
            tile_description: tile.description,
            tile_button: tile.button
        };
        var html = template(dynamic_data);

        /* Append the tile to the interface. */
        //$('#tiles_container').append(html);
        $('#' + this.CONFIG.placeholder_id).append(html);

        $('#' + tile.id).click(function() {
            _this.show_tiles(this.id);
        });

    };

    return TILES_MANAGER;

});