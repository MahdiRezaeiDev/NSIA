const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.styles([
    'public/css/bootstrap_rtl.min.css',
    'node_modules/print-js/dist/print.css',
    
],'public/css/public.css');
mix.scripts([
    'node_modules/angular/angular.min.js',
    'node_modules/bootstrap/js/dist/js/boostrap.min.js',
    'node_modules/print-js/dist/print.js',
    
],'public/js/public.js');

mix.styles([
    'resources/css/ui-grid.min.css',
    'resources/css/ui-grid.selection.min.css',
    'resources/css/ui-grid.tree-base.css',
    'resources/css/ui-grid.tree-view.css',
    'node_modules/viewerjs/dist/viewer.min.css'
],'public/css/admin.css');
mix.scripts([
    'node_modules/angular/angular.min.js',
    'node_modules/print-js/dist/print.js',
    'public/js/moment.js',
    'node_modules/angular-ui-grid/ui-grid.min.js',
    'node_modules/angular-ui-grid/ui-grid.pagination.min.js',
    'node_modules/angular-ui-grid/ui-grid.selection.min.js',
    'node_modules/angular-ui-grid/ui-grid.tree-base.min.js',
    'node_modules/angular-ui-grid/ui-grid.tree-view.min.js',
    'node_modules/viewerjs/dist/viewer.min.js',
],'public/js/admin.js');
mix.js('resources/js/app.js', 'public/js');
