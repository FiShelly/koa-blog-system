import {Component, OnInit, OnDestroy} from '@angular/core';
import {Post} from '../../models';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PostService} from '../../shared-service/model/post.service';
import {StorageService} from '../../shared-service/utils/storage.service';
import {validator} from '../../shared-service/utils/normal';

const LIMIT = 9;

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss'],
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
    ]
})
export class ArticleListComponent implements OnInit, OnDestroy {

    postList: Post[];
    hide: boolean = true;
    page: number = 1;
    ls: number = 9;
    global: any = (<any>window).environment;
    private _scrollHander: EventListenerObject;

    constructor(private postService: PostService,
                private storageService: StorageService,
                private router: Router) {
        this.postList = [];
        this._scrollHander = this.scrollHandler.bind(this);
    }

    ngOnInit() {
        const cachePosts = this.storageService.create(false).getItem('cache-post-list');
        if (validator.isEmpty(cachePosts)) {
            this.getPostList();
        } else {
            this.postList = cachePosts;
            this.hide = false;
            this.bindScroll();
        }
    }

    ngOnDestroy() {
        this.removeScroll();
    }

    getPostList(): void {
        this.hide = true;
        this.page = this.storageService.create(false).getItem('page') || 0;
        this.postService.getList({
            limit: LIMIT,
            offset: this.page * LIMIT
        }).subscribe({
            next: (data: any) => {
                console.log(data);
                this.postList = [...this.postList, ...data.list.map(val => {
                    val.coverSrc = `${this.global.apiURL.materialView}${val.coverImg}`;
                    return val;
                })];

                this.storageService.create(false).setItem('cache-post-list', this.postList);
                this.storageService.create(false).setItem('page', this.page + 1);
                if (this.postList.length === LIMIT) {
                    this.bindScroll();
                }
            },
            error: (err) => {
                alert(err.message);
            },
            complete: () => {
                this.hide = false;
            }
        });
    }

    gotoPost(post: Post): void {
        // this.storageService.create(false).setItem('article',article);
        this.router.navigateByUrl(`/article/${post.id}`);
    }

    bindScroll() {
        const that = this;
        window.addEventListener('scroll', this._scrollHander, false);
    }

    scrollHandler() {
        const a = document.documentElement.clientHeight;
        const b = Math.floor(document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop);
        const c = document.documentElement.scrollTop === 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
        if (b !== 0) {
            if (a + b >= c - 150) {
                this.removeScroll();
                this.getPostList();
            }
        }
    }

    removeScroll() {
        window.removeEventListener('scroll', this._scrollHander, false);
    }


}
