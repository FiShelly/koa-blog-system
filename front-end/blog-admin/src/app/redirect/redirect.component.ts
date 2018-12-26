import {Component, OnInit, AfterViewInit} from '@angular/core';
import {StorageService} from '../shared-services/utils/storage.service';
import {UserService} from '../shared-services/model/user.service';
import {User} from '../models';
import {Router} from '@angular/router';
import {EventBusService} from '../shared-services/eventBus/event-bus.service';

@Component({
    selector: 'app-redirect',
    templateUrl: './redirect.component.html',
    styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit, AfterViewInit {
    
    global: any = (<any>window).environment;
    
    constructor(
        private userService: UserService,
        private storageService: StorageService,
        private router: Router,
        private eventBus: EventBusService
    ) {
        console.log('eeee');
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit(): void {
        this.userService.getOAuthUser().subscribe({
            next: (item: User) => {
                item.avatar = `${this.global.apiURL.materialView}${item.headImg}`;
                this.eventBus.emit('logined', item);
                this.storageService.create(false).setItem('logined-user', item);
                this.router.navigateByUrl('admin/post/list');
            },
            error: (error) => {
                this.router.navigateByUrl('login');
            }
        });
    }
    
}
