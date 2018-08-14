import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {User} from '../../models';
import {HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService extends CommonService {
    
    public postLogin(user: User): Observable<any> {
        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        
        return this.hc.post<User>(this.apiURL.login, user, header);
            // .pipe(tap((item) => {
        // }));
    }
}
