const fs = require('fs');
const path = require('path');

function mkDirSync(path, dir) {

    const dirArr = path.split('/');
    let index = 0;
    let pathUrl = `${dir}/`;

    return function make () {
        if (index > dirArr.length - 1) {
            return;
        }
        pathUrl += `${dirArr[index]}/`;
        try {
            index++;
            fs.mkdirSync(pathUrl);
        } catch (err) {
            if (err.code === "EEXIST") {
                make();
            }
        }
    }

}

function readImage (filePath) {
    // 创建可读流
    let data = [];
    return new Promise((res, rej) => {
        const readerStream = fs.createReadStream(filePath);
        readerStream.on('data', function (chunk) {
            data.push(chunk);
        });
        readerStream.on('end', function () {
            const finalData = Buffer.concat(data); // 合并Buffer
            res(finalData);
        });
        readerStream.on('error', (err) => {
            rej(err);
        });
    });
}

function stat (path) {
    return new Promise(function (resolve, reject) {
        fs.stat(path, function (err, stat) {
            if (err) {
                reject(err);
            } else {
                resolve(stat);
            }
        });
    });
}

module.exports = {
    readImage, stat,mkDirSync
};