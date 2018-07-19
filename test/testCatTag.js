const categoryTagController = require('../app/controllers/categoryTagController');
const moment = require('moment');

async function testCreate () {
    const catTag = await categoryTagController.create({
        request: {
            type: 'tag',
            name: 'tag1',
            date: moment().unix(),
            count: 0
        }
    });
    console.log(catTag);
}

async function testFindOneById () {
    const catTag = await categoryTagController.findOneById({
        params: {
            id: 1
        }
    });
    console.log(catTag);
}

async function testRemove () {
    const catTag = await categoryTagController.remove({
        params: {
            id: 1
        }
    });
    console.log(catTag);
}

async function testFindAllByType () {
    const catTag = await categoryTagController.findAllByType({
        params: {
            type: 'tag'
        }
    });
    console.log(catTag);
}

async function testUpdate () {
    const catTag = await categoryTagController.update({
        params: {
            id: 1
        },
        request: {
            name: 'new-tag-1',
        }
    });
    console.log(catTag);
}


async function testIncrement () {
    const catTag = await categoryTagController.increment({
        params: {
            id: 2
        }
    });
    console.log(catTag);
}

// testCreate();
// testFindOneById();
// testFindAllByType();
// testUpdate();
// testRemove();
// testIncrement();