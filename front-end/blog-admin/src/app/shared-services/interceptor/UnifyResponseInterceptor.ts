import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class UnifyResponseInterceptor implements HttpInterceptor {
    
    constructor(
        private router: Router
    ) {
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(map(event => {
            if (event instanceof HttpResponse) {
                const item = event.body;
                if (event.status === 200) {
                    if (item.code === 200) {
                        return event.clone({
                            body: item.data
                        });
                    } else {
                        if (item.code === 401.1 || item.code === 401) {
                            this.router.navigateByUrl('/login');
                        }
                        throw new Error(item.msg);
                    }
                }
            }
            return event;
        }));
    }
}
