require('zone.js/dist/zone-node');
const domino = require('domino');
const {readFileSync} = require('fs');
const {renderModuleFactory} = require('@angular/platform-server');
const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader');
const {join} = require('path');
const DIST_FOLDER = join(process.cwd(), 'public');

const template = readFileSync(join(DIST_FOLDER, 'blog-index/browser', 'index.html')).toString();
const win = domino.createWindow(template);

global['window'] = win;
global['document'] = win.document;

const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('../public/blog-index/server/main');


function ngSsrUtil (url) {
    return renderModuleFactory(AppServerModuleNgFactory, {
        // Our index.html
        document: template,
        url: url,
        // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
        extraProviders: [
            provideModuleMap(LAZY_MODULE_MAP)
        ]
    });
}

module.exports = ngSsrUtil;