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
    
    public getList(data): Observable<any> {
        return this.hc.get<any>(this.apiURL.articleResFul, {
            params: {
                ...data
            }
        });
    }
    
    public postPost(post: Post): Observable<any> {
        return this.hc.post<Post>(this.apiURL.articleResFul, post);
    }
    
    public getPost(id: number): Observable<any> {
        return this.hc.get<Post>(this.createUrl({id: id}));
    }
    
    public putPost(post: Post, diff): Observable<any> {
        return this.hc.put<Post>(this.createUrl(post), {
            ...post,
            diff: JSON.stringify(diff)
        });
    }
    
    public putStatus(post: Post, status: string): Observable<any> {
        return this.hc.put<Post>(`${this.createUrl(post)}/changestatus`, {
            status: status
        });
    }
    
    public deletePost(post: Post): Observable<any> {
        return this.hc.delete<Post>(this.createUrl(post));
    }
}
