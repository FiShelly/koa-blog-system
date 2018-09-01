import { Injectable } from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {Cgi} from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CgiService extends CommonService {
    
    private createUrl(cgi: any, url?: string) {
        url = url || this.apiURL.cgiResFul;
        return `${url}${cgi.id}`;
    }
    
    public getList(data): Observable<any> {
        return this.hc.get<any>(this.apiURL.cgiResFul, {
            params: {
                ...data
            }
        });
    }
    
    public delete(id: number): Observable<any> {
        return this.hc.delete<Cgi>(this.createUrl({id}));
    }
    
}
