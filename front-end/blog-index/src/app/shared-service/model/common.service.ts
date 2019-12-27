import {Inject, Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    protected apiURL: any = {};

    constructor(
        protected hc: HttpClient,
        @Optional() @Inject('koaCtx') private ctx: any
    ) {
        const apiUrl = (<any>window).environment.apiURL;
        if (this.ctx) {
            const url = this.ctx.request.origin;
            Object.keys(apiUrl).forEach(key => {
                apiUrl[key] = `${url}${apiUrl[key]}`;
            });
        }
        this.apiURL = apiUrl;
    }

}
