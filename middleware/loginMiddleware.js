const packData = require('../utils/normal').packData;
const notAllowed = ['/web/'];

function isNotIgnore (url) {
    return !url.includes('/login') && notAllowed.filter(val => url.includes(val)).length > 0;
}

module.exports = function () {
    return async function (ctx, next) {
        let url = ctx.url;
        if (isNotIgnore(url) && !ctx.session.user) {
            ctx.body = packData(401, 'error', 'no-logined');
            return false;
        }
        await next();
    }
};