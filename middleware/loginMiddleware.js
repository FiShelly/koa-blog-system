const allowed = ['/login'];
const packData = require('../utils/normal').packData;

function isIgnore (url) {
    return url.includes('/api/') || allowed.filter(val => url.includes(val)).length > 0;
}

module.exports = function () {
    return async function (ctx, next) {
        let url = ctx.url;
        if (!isIgnore(url) && !ctx.session.user) {
            ctx.body = packData(401, 'error', 'no-logined');
            return false;
        }
        await next();
    }
};