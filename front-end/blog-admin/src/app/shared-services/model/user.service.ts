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
        return this.hc.post<User>(this.apiURL.login, user);
    }
    
    public getLogout(): Observable<any> {
        return this.hc.get<any>(this.apiURL.logout);
    }
    
    public getUser(account: string): Observable<any> {
        return this.hc.get<any>(this.apiURL.userResFul, {
            params: {
                account
            }
        });
    }
    
    public putUser(user: User): Observable<any> {
        return this.hc.put<User>(this.apiURL.userResFul, user);
    }
}
