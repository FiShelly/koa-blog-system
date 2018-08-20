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

    public getUser(account: string = 'fishelly.'): Observable<any> {
        return this.hc.get<User>(this.apiURL.userResFul, {
            params: {
                account
            }
        });
    }
}
