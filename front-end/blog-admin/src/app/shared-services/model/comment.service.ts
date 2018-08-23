import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {Comment} from '../../models';

@Injectable({
    providedIn: 'root'
})
export class CommentService extends CommonService {
    
    private createUrl(post: any, url?: string) {
        url = url || this.apiURL.commentResFul;
        return `${url}${post.id}`;
    }
    
    public getList(data): Observable<any> {
        return this.hc.get<any>(this.apiURL.commentResFul, {
            params: {
                ...data
            }
        });
    }
    
    public delete(id: number): Observable<any> {
        return this.hc.delete<Comment>(this.createUrl({id}));
    }
}
