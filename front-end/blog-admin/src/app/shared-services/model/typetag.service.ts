import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {Typetag} from '../../models';
import {t} from '@angular/core/src/render3';

@Injectable({
    providedIn: 'root'
})
export class TypetagService extends CommonService {
    
    private createUrl(typeTag: any, url?: string) {
        url = url || this.apiURL.typetagResFul;
        return `${url}${typeTag.id}`;
    }
    
    public getList(type: string, keyword: string): Observable<any> {
        return this.hc.get<Typetag>(`${this.apiURL.typetagListByType}${type}`, {
            params: {
                keyword
            }
        });
    }
    
    public postTypeTag(typeTag: Typetag): Observable<any> {
        return this.hc.post<Typetag>(this.apiURL.typetagResFul, typeTag);
    }
    
    public getTypeTag(id: number): Observable<any> {
        return this.hc.get<Typetag>(this.createUrl({id: id}));
    }
    
    public putTypeTag(typeTag: Typetag): Observable<any> {
        return this.hc.put<Typetag>(this.createUrl(typeTag), typeTag);
    }
    
    public deleteTypeTag(typeTag: Typetag): Observable<any> {
        return this.hc.delete<Typetag>(this.createUrl(typeTag));
    }
    
    public increment(typeTag: Typetag): Observable<any> {
        return this.hc.put(this.createUrl(typeTag, this.apiURL.typetagIncrement), typeTag);
    }
}
