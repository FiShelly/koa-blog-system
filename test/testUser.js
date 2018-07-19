const userController = require('../app/controllers/userController');


async function testCreate () {
    const user = await userController.create();
    console.log(user);
}

async function testFindOneByLoginId () {
    const user = await userController.findUserByLoginId({
        request: {
            account: 'account-test11'
        }
    });
    console.log(user);
}

async function testLogin () {
    const user = await userController.login({
        request: {
            account: 'account-test11',
            password: 'test1-password'
        }
    });
    console.log(user);
}

async function testUpdate () {
    const user = await userController.updateUser({
        request: {
            id: 1,
            name: 'name-test11-update'
        }
    });
}

async function testUpdatePwd () {
    const user = await userController.updatePwd({
        params: {
            id: 1
        },
        request: {
            oldPassword: 'password-test1',
            newPassword: 'test1-password'
        }
    });
    console.log(user);
}

// testUpdatePwd();
// testUpdate();
// testLogin();
testFindOneByLoginId();
// testCreate();