import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {User} from '../../models';
import {EventBusService} from '../../shared-services/eventBus/event-bus.service';
import {StorageService} from '../../shared-services/utils/storage.service';
import {validator} from '../../shared-services/utils/normal';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import {filter, pairwise} from 'rxjs/operators';
import {UserService} from '../../shared-services/model/user.service';

@Component({
    selector: 'app-common-header',
    templateUrl: './common-header.component.html',
    styleUrls: ['./common-header.component.scss']
})
export class CommonHeaderComponent implements OnInit, AfterViewInit {
    
    @Input() user: User = new User();
    @Input() mainLink: String = 'http://www.fishelly.top';
    @Input() showRight: boolean = false;
    
    constructor(
        private eventBus: EventBusService,
        private storage: StorageService,
        private router: Router,
        private userService: UserService
    ) {
    }
    
    ngOnInit() {
        this.eventBus.on('logined', (user) => {
            this.showRight = true;
            this.user = user.data;
        });
        
        this.eventBus.on('refresh-user', () => {
            this.refreshUser();
        });
        
    }
    
    ngAfterViewInit() {
        setTimeout(() => {
            this.refreshUser();
        });
    }
    
    refreshUser() {
        const pathName = window.location.pathname;
        if (pathName.includes('login')) {
            this.showRight = false;
            return;
        }
        this.showRight = true;
        console.log(this.user);
        if (validator.isEmpty(this.user.name)) {
            const loginedUser = this.storage.create(false).getItem('logined-user');
            if (!validator.isEmpty(loginedUser)) {
                this.user = loginedUser;
            }
        }
    }
    
    logout() {
        this.userService.getLogout().subscribe(
            {
                error: () => {},
                complete: () => {
                    this.storage.create(false).clear();
                    this.eventBus.emit('logout');
                    this.router.navigateByUrl('/login');
                }
            }
        );
    }
    
}
