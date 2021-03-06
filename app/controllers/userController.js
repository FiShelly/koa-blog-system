const normalUtil = require('../../utils/normal');
const packData = normalUtil.packData;
const validator = normalUtil.validator;
const redirectData = normalUtil.redirectData;
const userService = require('../services/userService');
const md5 = require('md5');
const rq = require('request-promise');

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
        if (user && user.password === password) {
            delete user.dataValues.password;
            ctx.session.user = user;
            return packData(200, 'success', user);
        } else {
            return packData(401.1, 'error', 'login-invalidate');
        }
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const create = async function (ctx) {
    try {
        const user = await userService.create();

        return packData(200, 'success', user);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }

};

const findUserByLoginId = async function (ctx) {
    // const user = ctx.session.user;
    // const account =  user.account;
    // if (!account) {
    //     return packData(412, 'error', 'input-invalidate-empty');
    // }
    const user = ctx.session.user;
    let account = null;
    if (user) {
        account = user.account;
    } else {
        account = ctx.request.query.account;
    }
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
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const updateUser = async function (ctx) {
    const request = ctx.request.body;
    // const user = ctx.session.user;
    // const id =  user.id;
    const id = request.id;
    if (!id) {
        return packData(412, 'error', 'input-invalidate-empty');
    }
    try {
        delete request.password;
        delete request.account;
        delete request.id;
        const user = await userService.update(request, {id});
        return packData(200, 'success', user);
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const updatePwd = async function (ctx) {
    const request = ctx.request.body;
    const user = ctx.session.user;
    const id = user.id;
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
        ctx.logger.getLogger('error').error(e);
        return packData(500, 'error', 'mysql-error');
    }
};

const logout = async function (ctx) {
    ctx.session.user = null;
    return packData(200, 'success', {});
};

const userInfo = async function (ctx) {
    return packData(200, 'success', ctx.session.user);
};

const oauthLogin = async function (ctx) {
    const request = ctx.request.query;
    const token = request.access_token;
    const api = `${ctx._server_config.oauthAPI}?access_token=${token}`;
    if (!token) {
        return redirectData(412, '/error', 'input-invalidate-empty');
    }
    try {
        const opt = {
            uri: api,
            method: 'GET',
            json: true
        };
        const data = await rq(opt);
        ctx.logger.getLogger('default').info(data);
        if (data.code === 200) {
            ctx.session.user = data.data;
            return redirectData(302, '/redirect');
        }
        return redirectData(data.code, '/error', 'server-error');
    } catch (e) {
        ctx.logger.getLogger('error').error(e);
        return redirectData(500, '/error', 'mysql-error');
    }

};

module.exports = {
    login, create, updateUser, findUserByLoginId, updatePwd, logout, oauthLogin, userInfo
};
