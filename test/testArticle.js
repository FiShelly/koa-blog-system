const articleController = require('../app/controllers/articleController');
const moment = require('moment');

async function testCreate () {
    const article = await articleController.create({
        request: {
            body: {
                title: 'article-title' + Math.random(),
                type: '1,2,3',
                tag: 'a,s,d',
                abstract: 'abstract' + Math.random(),
                date: moment().unix(),
                articleHTML: 'articleHTML',
                articleMd: 'articleMd',
                coverImg: 1,
                status: 'audit'
            }

        }
    });
    console.log(article);
}

async function testFindOneById () {
    const article = await articleController.findOneById({
        params: {
            id: 1
        }
    });
    console.log(article);
}

async function testRemove () {
    const article = await articleController.remove({
        params: {
            id: 1
        }
    });
    console.log(article);
}

async function testFindAll () {
    const article = await articleController.findAll({});
    console.log(article);
}

async function testFindAllByPage () {
    const article = await articleController.findAllByPage({
        request: {
            boyd: {
                offset: 0,
                limit: 20
            }
        }
    });
    console.log(article);
}

async function testUpdate () {
    const article = await articleController.update({
        params: {
            id: 1
        },
        request: {
            boyd: {
                title: 'new-title-1',
            }
        }
    });
    console.log(article);
}

// testCreate();
// testFindOneById();
// testFindAll();
// testFindAllByPage();
// testUpdate();
// testRemove();