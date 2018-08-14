import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {UnifyResponseInterceptor} from './UnifyResponseInterceptor';
import {UnifyResquestInterceptor} from './UnifyResquestInterceptor';

export const HTTP_INTERCEPTOR_PROVIDERS = [
    {
        provide: HTTP_INTERCEPTORS, useClass: UnifyResquestInterceptor, multi: true
    },
    {
        provide: HTTP_INTERCEPTORS, useClass: UnifyResponseInterceptor, multi: true
    }
];
