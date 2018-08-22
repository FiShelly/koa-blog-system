import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {User} from '../../models';
import {UserService} from '../../shared-service/model/user.service';
import {StorageService} from '../../shared-service/utils/storage.service';

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
        private storageService: StorageService) {
        this.hide = true;
    }

    ngOnInit() {
        this.author = this.storageService.create(true).getItem('author');
        if (this.author) {
            this.hide = false;
        }
        this.getAuthor();
    }

    getAuthor() {
        this.authorService.getUser().subscribe({
            next: (author) => {
                console.log(author);
                this.author = author;
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
