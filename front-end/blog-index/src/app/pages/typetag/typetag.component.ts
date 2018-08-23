import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Post, Typetag} from '../../models';
import {TypetagService} from '../../shared-service/model/typetag.service';
import {StorageService} from '../../shared-service/utils/storage.service';
import {PostService} from '../../shared-service/model/post.service';
import {Router} from '@angular/router';

const LIMIT = 9;

@Component({
    selector: 'app-typetag',
    templateUrl: './typetag.component.html',
    styleUrls: ['./typetag.component.scss'],
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
export class TypetagComponent implements OnInit, OnDestroy {

    typetags: Typetag[] = [];
    postList: Post[] = [];
    typetag: Typetag = new Typetag();
    hide: boolean = true;
    page: number = 1;
    ls: number = 9;
    private _scrollHander: EventListenerObject;
    global: any = (<any>window).environment;

    constructor(private typetagService: TypetagService,
                private storageService: StorageService,
                private postService: PostService,
                private router: Router) {
        this._scrollHander = this.scrollHandler.bind(this);
    }

    ngOnInit() {
        const cachePostList = this.storageService.create(false).getItem('cache-post-list');
        const cacheTypeTags = this.storageService.create(false).getItem('cache-type-tag-list');
        const cacheTypeTag = this.storageService.create(false).getItem('cache-type-tag');
        if (!cacheTypeTag) {
            if (cachePostList) {
                this.postList = cachePostList;
                this.hide = false;
                this.bindScroll();
            } else {
                this.getArticles();
            }
        } else {
            this.typetag = cacheTypeTag;
        }
        if (cacheTypeTags) {
            this.typetags = cacheTypeTags;
            this.getArticleByOtherPage();
        } else {
            this.getTypetags();
        }
    }

    // ngOnDestroy(){
    // }


    ngOnDestroy() {
        this.removeScroll();
    }

    gotoArticle(post: Post): void {
        this.router.navigateByUrl(`/article/${post.id}`);
    }

    onSelectType($event, type): void {
        this.storageService.create(false).setItem('cache-type-tag', type);

        this.postList = [];
        this.hide = true;
        this.typetag = type;
        this.getArticlesByQuery(type);
    }

    getArticlesByQuery(type): void {
        this.hide = true;
        const args: any = {};
        if (type.type === 'type') {
            args.type = type.id;
        } else {
            args.tag = type.id;
        }
        this.postService.getListByTypeTag(args).subscribe({
            next: (data) => {
                this.postList = data.list.map(val => {
                    val.coverSrc = `${this.global.apiURL.materialView}${val.coverImg}`;
                    return val;
                });
            },
            error: (error) => {
                alert(error.message);
            },
            complete: () => {
                this.hide = false;
            }
        });
    }

    getArticles(): void {
        this.hide = true;
        this.page = this.storageService.create(false).getItem('page') || 0;
        this.postService.getList({
            limit: LIMIT,
            offset: this.page * LIMIT
        }).subscribe({
            next: (data: any) => {
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

    getTypetags(): void {
        this.typetagService.getList().subscribe({
            next: (data) => {
                this.typetags = data.list;
                this.storageService.create(false).setItem('cache-type-tag-list', this.typetags);
                this.getArticleByOtherPage();
            },
            error: (err) => {
                alert(err.message);
            }
        });
    }

    getArticleByOtherPage(): void {
        let typetag = this.storageService.create(false).getItem('cache-type-tag');

        if (typetag) {
            typetag = this.typetags.filter(val => val.name === typetag.name).pop();
            this.getArticlesByQuery(typetag);
        }
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
                this.getArticles();
            }
        }
    }

    removeScroll() {
        window.removeEventListener('scroll', this._scrollHander, false);
    }

}