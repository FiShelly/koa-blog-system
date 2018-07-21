const normalUtil = require('../../utils/normal');
const packData = normalUtil.packData;
const validator = normalUtil.validator;
const userService = require('../services/userService');
const md5 = require('md5');

const login = async function (ctx) {
    const request = ctx.request.body;
    const account = request.account;
    let password = request.password;
    if (validator.isEmpty(password) || validator.isEmpty(account)) {
        return packData(412, 'error', 'input-invalidate-empty');
    }
    password = md5(password);
    try {
        const user = await userService.findOne({account});
        if (user.password === password) {
            delete user.dataValues.password;
            return packData(200, 'success', user);
        } else {
            return packData(401.1, 'error', 'login-invalidate');
        }
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }
};

const create = async function (ctx) {
    try {
        const user = await userService.create();

        return packData(200, 'success', user);
    } catch (e) {
        return packData(500, 'error', 'mysql-error');
    }

};

const findUserByLoginId = async function (ctx) {
    const request = ctx.request.body;
    const params = ctx.params;
    const account = params.account;
    if (!account) {
        return packData(412, 'error', 'input-invalidate-empty');
    }
    try {
        const user = await userService.findOne({account});
        if (user) {
            delete user.dataValues.password;
        }
        return packData(200, 'success', user);
    } catch (e) {
        console.log(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const updateUser = async function (ctx) {
    const request = ctx.request.body;
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
    const request = ctx.request.body;
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
