import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {Post} from '../../models';

@Injectable({
    providedIn: 'root'
})
export class CommentService extends CommonService {

    private createUrl(post: any, url?: string) {
        url = url || this.apiURL.commentResFul;
        return `${url}${post.id}`;
    }

    public getList(id: number): Observable<any> {
        return this.hc.get<any>(
            `${this.createUrl({id})}/all`,
        );
    }

    public postComment(comment: Comment): Observable<any> {
        return this.hc.post<any>(this.apiURL.commentResFul, comment);
    }
}
