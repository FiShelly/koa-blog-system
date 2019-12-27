import {Component, OnDestroy, OnInit} from '@angular/core';
import {MyMeta, Post, Typetag} from '../../models';
import {TypetagService} from '../../shared-service/model/typetag.service';
import {StorageService} from '../../shared-service/utils/storage.service';
import {PostService} from '../../shared-service/model/post.service';
import {Router} from '@angular/router';
import {EventBusService} from '../../shared-service/eventBus/event-bus.service';
import {TransferState, makeStateKey} from '@angular/platform-browser';

const TYPE_TAG_KEY = makeStateKey('type-tag');
const ARTICLE_LIST_KEY = makeStateKey('cache-article-list');
const LIMIT = 9;

@Component({
    selector: 'app-typetag',
    templateUrl: './typetag.component.html',
    styleUrls: ['./typetag.component.scss']
})
export class TypetagComponent implements OnInit, OnDestroy {

    typetags: Typetag[] = [];
    postList: Post[] = [];
    typetag: Typetag = new Typetag();
    hide: boolean = true;
    private _scrollHander: EventListenerObject;
    global: any = (<any>window).environment;
    noMore: boolean = false;

    constructor(
        private transferState: TransferState,
        private typetagService: TypetagService,
        private storageService: StorageService,
        private postService: PostService,
        private router: Router,
        private eventBus: EventBusService
    ) {
        this._scrollHander = this.scrollHandler.bind(this);
    }

    ngOnInit() {
        let cacheTypeTag = null;
        let cacheTypeTags = this.transferState.get(TYPE_TAG_KEY, null as any);

        if (!cacheTypeTags && this.storageService.create(true).getItem('is-browser')) {
            cacheTypeTag = this.storageService.create(false).getItem('cache-type-tag');
            cacheTypeTags = this.storageService.create(false).getItem('cache-type-tag-list');
        }
        if (!cacheTypeTag) {
            let cachePostList = this.transferState.get(ARTICLE_LIST_KEY, []);
            if (!cachePostList.length) {
                cachePostList = this.storageService.create(false).getItem(ARTICLE_LIST_KEY);
            } else {
                this.storageService.create(false).setItem(ARTICLE_LIST_KEY, cachePostList);
            }
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
            this.setMetaData(this.typetags);
            this.getArticleByOtherPage();
        } else {
            this.getTypetags();
        }
    }

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
                console.log(error.message);
                // alert && alert(error.message);
            },
            complete: () => {
                this.hide = false;
            }
        });
    }

    getArticles(): void {
        this.hide = true;

        this.removeScroll();
        this.postService.getList({
            limit: LIMIT,
            offset: this.postList.length
        }).subscribe({
            next: (data: any) => {
                if (!data.list.length) {
                    this.noMore = true;
                }
                this.postList = [...this.postList, ...data.list.map(val => {
                    val.coverSrc = `${this.global.apiURL.materialView}${val.coverImg}`;
                    return val;
                })];

                this.storageService.create(false).setItem(ARTICLE_LIST_KEY, this.postList);
                this.transferState.set(ARTICLE_LIST_KEY, this.postList);

            },
            error: (err) => {
                console.log(err.message);
                // alert && alert(err.message);
            },
            complete: () => {
                this.hide = false;
                if (!(this.postList.length % LIMIT)) {
                    this.bindScroll();
                }
            }
        });
    }

    setMetaData(data) {
        const keyword = data.map(val => val.name).join(',');
        const meta = new MyMeta();
        meta.title = '分类与标签 - Fishelly Idx.';
        meta.keyword = `Fishelly个人网站标签与分类:${keyword}`;
        meta.description = `Fishelly个人网站的标签与分类页面。${keyword}`;
        this.eventBus.emit('update-meta', meta);
    }

    getTypetags(): void {
        this.typetagService.getList().subscribe({
            next: (data) => {
                this.typetags = data.list;
                this.storageService.create(false).setItem('cache-type-tag-list', this.typetags);
                this.setMetaData(this.typetags);
                this.getArticleByOtherPage();
                this.transferState.set(TYPE_TAG_KEY, this.typetags);
            },
            error: (err) => {
                console.log(err.message);
                // alert && alert(err.message);
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
        if (this.noMore) {
            return;
        }
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
