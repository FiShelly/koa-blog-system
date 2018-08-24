import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../utils/storage.service';
import {validator} from '../utils/normal';

const EXCLUDED_METHOD = ['GET', 'HEAD', 'OPTIONS'];

@Injectable()
export class UnifyResquestInterceptor implements HttpInterceptor {
    
    constructor(
        private router: Router,
        private storage: StorageService
    ) {
    }
    
    static isIngore(url: string) {
        return url.includes('/web/user/login');
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!UnifyResquestInterceptor.isIngore(req.url)) {
            const loginUser = this.storage.create(false).getItem('logined-user');
            if (validator.isEmpty(loginUser)) {
                this.router.navigateByUrl('login');
                throw new Error('未登录');
            }
        }
        if (!EXCLUDED_METHOD.includes(req.method.toUpperCase())) {
            const header = {
                headers: new HttpHeaders({
                    'x-csrf-token': (<any>window)._CSRF
                })
            };
            req = req.clone(header);
        }
        
        return next.handle(req);
    }
}

// let hasFile = false;
// Object.keys(data).forEach((x) => {
//     if (data[x] instanceof window.File) {
//         hasFile = true;
//     } else if (data[x] instanceof window.Blob) {
//         hasFile = true;
//     }
// });
// if (hasFile) {
//     let formData = new FormData();
//     Object.keys(data).forEach((x) => {
//         formData.append(x, data[x]);
//     });
//     return formData;
// }
