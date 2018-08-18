import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../shared-services/utils/storage.service';
import {UserService} from '../../shared-services/model/user.service';
import {EventBusService} from '../../shared-services/eventBus/event-bus.service';
import {validator} from '../../shared-services/utils/normal';
import {User} from '../../models';
import {ModalService} from '../../shared-services/modal/modal.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    
    global: any = (<any>window).environment;
    user: User;
    typeMap: object = {
        name: '昵称',
        position: '职位',
        signature: '个性签名',
        introduce: '个人简介'
    };
    
    constructor(
        private storageService: StorageService,
        private userService: UserService,
        private eventBusService: EventBusService,
        private modalService: ModalService
    ) {
    }
    
    ngOnInit() {
        this.getUser();
    }
    
    getUser() {
        const loginedUser = this.storageService.create(false).getItem('logined-user');
        if (!validator.isEmpty(loginedUser)) {
            this.user = loginedUser;
            return;
        }
        this.refreshUser();
    }
    
    private errorHandle(error) {
        this.modalService.modal.alert({
            input: {
                title: '警告',
                text: error.message,
            }
        });
    }
    
    refreshUser() {
        this.userService.getUser('fishelly.').subscribe({
            next: (item: User) => {
                item.avatar = `${this.global.apiURL.materialView}${item.headImg}`;
                this.eventBusService.emit('logined', item);
                this.storageService.create(false).setItem('logined-user', item);
            },
            error: this.errorHandle
        });
    }
    
    updateUser() {
        this.userService.putUser(this.user).subscribe({
            next: (item) => {
                this.modalService.modal.alert({
                    input: {
                        text: '修改用户信息成功'
                    },
                    output: {
                        okCallback: () => {
                            this.refreshUser();
                        }
                    }
                });
            },
            error: this.errorHandle
        });
    }
    
    updateAvatar ($event) {
        $event.stopPropagation();
        this.modalService.modal.imageSelect({
            output: {
                okCallback: (item) => {
                    item = item[0];
                    this.user.headImg = item.id;
                    this.user.avatar = `${this.global.apiURL.materialView}${item.id}`;
                    this.updateUser();
                }
            }
        });
    }
    
    onUpdate($event, type) {
        $event.stopPropagation();
        this.modalService.modal.prompt({
            input: {
                title: `修改${this.typeMap[type]}`,
                text: `请输入新的${this.typeMap[type]}`,
                value: this.user[type]
            },
            output: {
                okCallback: (v) => {
                    this.user[type] = v;
                    this.updateUser();
                }
            }
        });
    }
    
}
