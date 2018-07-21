const commentController = require('../app/controllers/commentController');
const moment = require('moment');

async function testCreate () {
    const comment = await commentController.create({
        request: {
            body:{
                comment: 1,
                content: 'This is comment content',
                date: moment().unix(),
                visitor: JSON.stringify({email: 'ad@m.in', name: 'Fishelly', index: 'http://www.fishelly.top'}),
                quotes: ''
            }
        }
    });
    console.log(comment);
}

async function testFindOneById () {
    const comment = await commentController.findOneById({
        params: {
            id: 1
        }
    });
    console.log(comment);
}

async function testRemove () {
    const comment = await commentController.remove({
        params: {
            id: 1
        }
    });
    console.log(comment);
}

async function testFindAll () {
    const comment = await commentController.findAll({});
    console.log(comment);
}

async function testFindAllByPage () {
    const comment = await commentController.findAllByPage({
        request: {
          body:{
              offset: 0,
              limit: 20
          }
        }
    });
    console.log(comment);
}

async function testUpdate () {
    const comment = await commentController.update({
        params: {
            id: 1
        },
        request: {
            body:{
                content: 'new-title-1',
            }
        }
    });
    console.log(comment);
}

// testCreate();
// testFindOneById();
// testFindAll();
// testFindAllByPage();
// testUpdate();
// testRemove();