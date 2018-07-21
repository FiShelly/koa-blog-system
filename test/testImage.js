const imageController = require('../app/controllers/imageController');
const moment = require('moment');

async function testCreate () {
    const image = await imageController.create({
        request: {
            name: 'tag1',
            date: moment().unix(),
            ext: 'ext-1',
            size: 1000,
            mime: 'image/png',
            path: '/local/image/tag1.png'
        }
    });
    console.log(image);
}

async function testFindOneById () {
    const image = await imageController.findOneById({
        params: {
            id: 1
        }
    });
    console.log(image);
}

async function testRemove () {
    const image = await imageController.remove({
        params: {
            id: 1
        }
    });
    console.log(image);
}

async function testFindAll () {
    const image = await imageController.findAll({});
    console.log(image);
}

async function testFindAllByPage () {
    const image = await imageController.findAllByPage({
        request: {
            offset: 0,
            limit: 20
        }
    });
    console.log(image);
}

async function testUpdate () {
    const image = await imageController.update({
        params: {
            id: 1
        },
        request: {
            name: 'new-tag-1',
        }
    });
    console.log(image);
}

// testCreate();
// testFindOneById();
// testFindAll();
// testFindAllByPage();
testUpdate();
// testRemove();