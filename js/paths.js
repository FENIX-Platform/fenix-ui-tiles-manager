define(function() {

    var config = {
        paths: {
            FENIX_UI_TILES_MANAGER: 'fenix-ui-tiles-manager',
            fenix_ui_tiles_manager: '../'
        },
        shim: {
            bootstrap: {
                deps: ['jquery']
            }
        }
    };

    return config;

});