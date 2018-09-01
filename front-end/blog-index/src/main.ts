import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

(<any>window).environment = environment;

if (environment.production) {
    enableProdMode();
}

function error(msg, url, line) {
    // 收集上报数据的信息
    const REPORT_URL = `${environment.apiURL.cgiError}?type=cli-error&report=`;
    // 收集错误信息，发生错误的脚本文件网络地址，用户代理信息，时间
    const m: any = {
        url,
        line,
        agent: navigator.userAgent,
        time: +new Date
    };
    if (msg instanceof ErrorEvent) {
        m.error = {
            msg: msg.message,
            lineno: msg.lineno,
            filename: msg.filename,
            type: msg.type
        };
    } else {
        m.error = msg;
    }
    // 组装错误上报信息内容URL
    url = REPORT_URL + JSON.stringify(m);
    let img = new Image;
    img.onload = img.onerror = function () {
        img = null;
    };
    // 发送数据到后台cgi
    img.src = url;
}

// 监听错误上报
window.onerror = function (msg, url, line) {
    error(msg, url, line);
};

document.addEventListener('DOMContentLoaded', () => {
    platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.log(err));
});

window.onload = () => {
    setTimeout(() => {
        (function _performanc1e() {
            const REPORT_URL = `${environment.apiURL.cgiTime}?type=cli-time&report=`;
            const perf = window.performance;
            const points = ['navigationStart', 'unloadEventStart', 'unloadEventEnd',
                'redirectStart', 'redirectEnd', 'fetchStart', 'domainLookupStart',
                'connectStart', 'requestStart', 'responseStart', 'responseEnd',
                'domLoading', 'domInteractive', 'domContentLoadedEventEnd',
                'domComplete', 'loadEventStart', 'loadEventEnd'];
            const timing = perf.timing;
            if (perf && timing) {
                const arr = [];
                const navigationStart = timing[points[0]];
                for (let i = 0, l = points.length; i < l; i++) {
                    arr[i] = timing[points[i]] - navigationStart;
                }
                const obj: any = {};
                points.forEach((val, idx) => {
                    obj[val] = arr[idx];
                });
                const url = REPORT_URL + JSON.stringify(obj);
                let img = new Image;
                img.onload = img.onerror = function () {
                    img = null;
                };
                img.src = url;
            }
        })();
    });
};


