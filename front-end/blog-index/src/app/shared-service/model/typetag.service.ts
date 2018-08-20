import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {Typetag} from '../../models';
import {t} from '@angular/core/src/render3';

@Injectable({
    providedIn: 'root'
})
export class TypetagService extends CommonService {

    public getList(type: string, keyword: string): Observable<any> {
        return this.hc.get<Typetag>(`${this.apiURL.typetagResFul}${type}`);
    }

}
