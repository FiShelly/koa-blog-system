import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {Post} from '../../models';
import {util} from '../utils/normal';

@Injectable({
    providedIn: 'root'
})
export class PostService extends CommonService {

    private createUrl(post: any, url?: string) {
        url = url || this.apiURL.articleResFul;
        return `${url}${post.id}`;
    }

    public getListByTypeTag(data: any): Observable<any> {
        return this.hc.get<any>(`${this.apiURL.articleResFul}typetag`, {
            params: data
        });
    }

    public getList(data: any): Observable<any> {
        return this.hc.get<any>(this.apiURL.articleResFul, {
            params: data
        });
    }

    public getPost(id: number): Observable<any> {
        return this.hc.get<Post>(this.createUrl({id: id}));
    }

    public increment(id: number): Observable<any> {
        return this.hc.put<any>(
            `${this.createUrl({id})}/increment`,
            {}
        );
    }
}
