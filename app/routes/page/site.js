const normal = require('../../../utils/normal');
const deepClone = normal.deepClone;
const articleService = require('../../services/articleService');
const router = require('koa-router')();
const XML = require('xml');

function createSiteMap (ids, host) {
    const xmlData = [{
        urlset: [
            {
                _attr: {
                    'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
                    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                    'xsi:schemaLocation': 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd'
                }
            },
            {
                url: [
                    {
                        loc: `${host}`
                    },
                    {
                        changefreq: 'daily'
                    },
                    {
                        priority: '1.00'
                    }
                ]
            },
            {
                url: [
                    {
                        loc: `${host}/index`
                    },
                    {
                        changefreq: 'daily'
                    },
                    {
                        priority: '1.00'
                    }
                ]
            },
            {
                url: [
                    {
                        loc: `${host}article`
                    },
                    {
                        changefreq: 'daily'
                    },
                    {
                        priority: '1.00'
                    }
                ]
            },
            {
                url: [
                    {
                        loc: `${host}typetag`
                    },
                    {
                        changefreq: 'daily'
                    },
                    {
                        priority: '1.00'
                    }
                ]
            },
            {
                url: [
                    {
                        loc: `${host}about`
                    },
                    {
                        changefreq: 'daily'
                    },
                    {
                        priority: '1.00'
                    }
                ]
            }
        ]
    }];

    ids.forEach(function (val) {
        val = val.id;
        const mapItem = {
            url: [
                {
                    loc: `${host}article/${val}`
                },
                {
                    changefreq: 'daily'
                },
                {
                    priority: '0.69'
                }
            ]
        };
        xmlData[0].urlset.push(mapItem);
    });

    return xmlData;
}

router.get('/map', async function (ctx, next) {
    ctx.type = 'text/xml;charset=UTF-8';
    let articles = await articleService.findAll({
        status: 'publish'
    }, ['id']);
    articles = deepClone(articles);
    articles = createSiteMap(articles, ctx._server_config.host);
    articles = XML(articles);

    // articles = `${articles}`;
    ctx.body = articles;
});

module.exports = router;
