import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/model/user.service';
import {User} from '../models';
import {validator} from '../shared/utils/normal';
import {StorageService} from '../shared/utils/storage.service';
import {Router} from '@angular/router';
import {EventBusService} from '../shared/eventBus/event-bus.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    
    user: User = new User();
    errorMessage: string = '';
    remember: boolean = false;
    
    constructor(
        private userService: UserService,
        private storageService: StorageService,
        private router: Router,
        private eventBus: EventBusService
    ) {
    }
    
    ngOnInit() {
        const rememberUser = this.storageService.create(true).getItem('remember-user');
        this.remember = !validator.isEmpty(rememberUser);
        if (this.remember) {
            this.user = rememberUser;
        }
    }
    
    checkData() {
        if (validator.isEmpty(this.user.account)) {
            this.errorMessage = '请输入账号';
        } else if (validator.isEmpty(this.user.password)) {
            this.errorMessage = '请输入密码';
        }
        return;
    }
    
    handleLogin() {
        this.errorMessage = '';
        this.checkData();
        if (!validator.isEmpty(this.errorMessage)) {
            return;
        }
        if (this.remember) {
            this.storageService.create(true).setItem('remember-user', this.user);
        }
        this.userService.postLogin(this.user).subscribe({
            next: (item) => {
                this.eventBus.emit('logined', item);
                this.storageService.create(false).setItem('logined-user', item);
                this.router.navigateByUrl('admin/post/list');
            },
            error: (error) => {
                this.errorMessage = error.message;
            }
        });
    }
    
}
