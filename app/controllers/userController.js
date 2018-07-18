const packData = require('../../utils/normal').packData;
const userService = require('../services/userService');
const md5 = require('md5');

const login = async function (ctx) {
    const request = ctx.request;
    const account = request.account;
    const password = md5(request.password);
    let user = null;
    try {
        user = await userService.findOne({account});
        if (user.password === password) {
            return packData(200, 'success', {});
        } else {
            return packData(401.1, 'error', 'login-invalidate');
        }
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const create = async function (ctx) {
    const data = {
        account: 'account-test1',
        name: 'name-test1',
        position: 'position-test1',
        signature: 'signature-test1',
        label: 'label-test1',
        introduce: 'introduce-test1',
        password: 'password-test1',
        headImg: 1
    };

    try {
        const user = await userService.create(data);

        return packData(200, 'success', user);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }

};

const findUserByLoginId = async function (ctx) {
    const request = ctx.request;
    const account = request.account;
    if (!account) {
        return packData(412, 'error', 'input-invalidate-empty');
    }
    try {
        const user = await userService.findOne({account});
        return packData(200, 'success', user);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const updateUser = async function (ctx) {
    const request = ctx.request;
    const params = ctx.params;
    const id = params.id;
    if (!id) {
        return packData(412, 'error', 'input-invalidate-empty');
    }
    try {
        const user = await userService.update(request, {id});
        return packData(200, 'success', user);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const updatePwd = async function (ctx) {
    const request = ctx.request;
    const params = ctx.params;
    const id = params.id;
    const oldPwd = md5(request.oldPassword);
    const newPwd = md5(request.newPassword);

    if (!oldPwd || !newPwd) {
        return packData(412, 'error', 'input-invalidate-empty');
    }

    try {
        const user = await userService.findOne({id});
        if (user.password === oldPwd) {
            const result = await userService.update({password: newPwd}, {id});
            return packData(200, 'success', result);
        } else {
            return packData(412, 'error', 'input-invalidate-oldPwd');
        }
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

module.exports = {
    login, create, updateUser, findUserByLoginId, updatePwd
};
