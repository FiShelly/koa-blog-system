const router = require('koa-router')();
const {renderModuleFactory} = require('@angular/platform-server');
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('../../../public/blog-index/server/main');
const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader');
const {readFileSync} = require('fs');
const {join} = require('path');
const DIST_FOLDER = join(process.cwd(), 'public');
require('zone.js/dist/zone-node');

router.get('/', async function (ctx, next) {
    const template = readFileSync(join(DIST_FOLDER, 'blog-index/browser', 'index.html')).toString();
    ctx.body = await renderModuleFactory(AppServerModuleNgFactory, {
        // Our index.html
        document: template,
        url: ctx.request.url,
        // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
        extraProviders: [
            provideModuleMap(LAZY_MODULE_MAP)
        ]
    });
});

router.get('/dashboard', async function (ctx, next) {
    console.log('edc');
    const template = readFileSync(join(DIST_FOLDER, 'blog-index/browser', 'index.html')).toString();
    ctx.body = await renderModuleFactory(AppServerModuleNgFactory, {
        // Our index.html
        document: template,
        url: ctx.request.url,
        // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
        extraProviders: [
            provideModuleMap(LAZY_MODULE_MAP)
        ]
    });
});

module.exports = router;