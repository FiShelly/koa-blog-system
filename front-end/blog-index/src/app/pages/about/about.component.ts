import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MyMeta, User} from '../../models';
import {UserService} from '../../shared-service/model/user.service';
import {StorageService} from '../../shared-service/utils/storage.service';
import {EventBusService} from '../../shared-service/eventBus/event-bus.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateX(0)'})),
            transition('void => *', [
                style({transform: 'translateX(-100%)'}),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({transform: 'translateX(100%)'}))
            ])
        ])
    ],
})
export class AboutComponent implements OnInit {
    hide: boolean;
    author: User;
    global: any = (<any>window).environment;

    constructor(
        private authorService: UserService,
        private storageService: StorageService,
        private eventBus: EventBusService
    ) {
        this.hide = true;
    }

    ngOnInit() {
        if (this.storageService.create(true).getItem('is-browser')) {
            this.author = this.storageService.create(true).getItem('author');
        }
        if (this.author) {
            this.hide = false;
        }
        this.getAuthor();
    }

    setMetaData(data: User) {
        const keyword = Object.keys(data).map(val => data[val]).join(',');
        const meta = new MyMeta();
        meta.title = '关于我 - Fishelly Idx.';
        meta.keyword = `Fishelly个人博客的关于我页面,前端技术分享、学习经验,前端技术博客,全栈开发,Front end developer,Fullstack,JavaScript,ECMAScript,HTML(5),CSS(3)`;
        meta.description = `Hello,I am Fishlly.I like front-end technology.And I hope one of my article can help you. ---${keyword}`;
        this.eventBus.emit('update-meta', meta);
    }

    getAuthor() {
        this.authorService.getUser().subscribe({
            next: (author) => {
                this.author = author;
                this.setMetaData(author);
                this.author.avatar = `${this.global.apiURL.materialView}${author.headImg}`;
                this.hide = false;
                this.storageService.create(true).setItem('author', this.author);
            },
            error: (error) => {
                alert(error.message);
            }
        });

    }
}
