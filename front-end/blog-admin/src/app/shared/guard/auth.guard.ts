import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageService} from '../utils/storage.service';
import {validator} from '../utils/normal';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
    constructor(
        private storage: StorageService,
        private router: Router,
    ) {
    
    }
    
    guardLogin(url: string) {
        const loginedUser = this.storage.create(false).getItem('logined-user');
        if (validator.isEmpty(loginedUser)) {
            this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const url: string = state.url;
        return this.guardLogin(url);
    }
    
    canLoad(route: Route): boolean {
        const url = `/${route.path}`;
        return this.guardLogin(url);
    }
}
