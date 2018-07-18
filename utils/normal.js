const errorMap = {
    'login-invalidate': '登录失败：账号密码错误',
    'mysql-error': '数据库错误',
    'input-invalidate': '输入不合法',
    'input-invalidate-empty': '输入参数为空',
    'input-invalidate-oldPwd':'旧密码输入不正确'
};

const deepClone = function (data) {
    return JSON.parse(JSON.stringify(data));
};

const packData = function (code, status, data) {
    if (status === 'success') {
        return {
            code: code,
            status: status,
            data: deepClone(data)
        }
    }   else {
        return {
            code: code,
            status: status,
            msg: errorMap[data]
        }
    }
};

module.exports = {packData, deepClone};