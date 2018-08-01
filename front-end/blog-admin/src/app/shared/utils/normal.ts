const brower = ((u) => {
    return {
        trident: u.indexOf('Trident') > -1,
        presto: u.indexOf('Presto') > -1,
        webKit: u.indexOf('AppleWebKit') > -1,
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
        iPhone: u.indexOf('iPhone') > -1,
        iPad: u.indexOf('iPad') > -1,
        webApp: u.indexOf('Safari') === -1,
        wechat: u.indexOf('MicroMessenger') > -1
    };
})(navigator.userAgent);

const deepCopy = (data) => {
    return JSON.parse(JSON.stringify(data));
};

const validator = {
    isEmpty(obj) {
        if (Array.isArray(obj)) {
            return !obj.length;
        } else if (typeof obj === 'object') {
            return !obj;
        } else if (obj === undefined) {
            return true;
        }
        return false;
    },
    isNumeric(obj) {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    },
    numberic(obj) {
        return this.isNumeric(obj);
    },
    email(obj) {
        return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(obj);
    },
    chinese(obj) {
        return /^[\u4e00-\u9fa5]{0,}$/.test(obj);
    },
    english(obj) {
        return /^[a-zA-Z]+$/.test(obj);
    },
    url(obj) {
        return /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/.test(obj);
    },
    idcard(obj) {
        return /(^\d{15}$)|(^\d{17}(x|X|\d)$)/.test(obj);
    },
    mobile(obj) {
        return /^1(3|4|5|7|8)[0-9]\d{8}$/.test(obj);
    },
    document(obj) {
        return /\.doc(x?)$|\.xls(x?)$|\.ppt(x?)$|\.wps$|\.pdf$|\.txt$/i.test(obj);
    },
    image(obj) {
        return /\.png|\.jpg$|\.jpeg$|\.bmp$|\.gif$/i.test(obj);
    },
    video(obj) {
        return /\.wmv$|\.avi$|\.mkv$|\.mp4$|\.rmvb$/i.test(obj);
    },
    audio(obj) {
        return /\.mp3/i.test(obj);
    },
    archive(obj) {
        return /\.rar$|\.zip$|\.7z$|\.gzip$|\.tar$|\.iso$/i.test(obj);
    }
};

export {
    validator,
    deepCopy,
    brower
};
