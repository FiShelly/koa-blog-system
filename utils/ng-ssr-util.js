require('zone.js/dist/zone-node');
const domino = require('domino');
const {readFileSync} = require('fs');
const {renderModuleFactory} = require('@angular/platform-server');
const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader');
const {join} = require('path');

let template = null;
const win = domino.createWindow(template);

global['window'] = win;
global['document'] = win.document;

const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('../public/blog-index/server/main');

function ngSsrUtil (ctx, csrf_token) {

    if (!template) {
        template = readFileSync(join(ctx._dir_path, 'public/blog-index/browser', 'index.html')).toString();
    }

    return renderModuleFactory(AppServerModuleNgFactory, {
        // Our index.html
        document: template.replace('${CSRF}', csrf_token),
        url: ctx.request.url,
        // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
        extraProviders: [
            provideModuleMap(LAZY_MODULE_MAP),
            {
                provide: 'koaCtx',
                useValue: ctx
            }
        ]
    });
}

module.exports = ngSsrUtil;