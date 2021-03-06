import {Component, OnInit, OnDestroy} from '@angular/core';
import {MyMeta, Post} from '../../models';
import {Router} from '@angular/router';
import {PostService} from '../../shared-service/model/post.service';
import {StorageService} from '../../shared-service/utils/storage.service';
import {validator} from '../../shared-service/utils/normal';
import {EventBusService} from '../../shared-service/eventBus/event-bus.service';
import {TransferState, makeStateKey} from '@angular/platform-browser';

const ARTICLE_LIST_KEY = makeStateKey('cache-article-list');
const LIMIT = 9;

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {

    postList: Post[] = [];
    hide: boolean = true;
    global: any = (<any>window).environment;
    noMore: boolean = false;
    private _scrollHander: EventListenerObject;

    constructor(
        private transferState: TransferState,
        private postService: PostService,
        private storageService: StorageService,
        private router: Router,
        private eventBus: EventBusService
    ) {
        this._scrollHander = this.scrollHandler.bind(this);
        const meta = new MyMeta();
        meta.title = '文章列表 - Fishelly Idx.';
        meta.keyword = 'Fishelly个人网站的文章列表页面,前端技术分享,前端学习经验,前端技术网站,全栈开发,Front end developer,Fullstack,JavaScript,ECMAScript,HTML(5),CSS(3)';
        meta.description = '一个开源自用的个人网站的文章列表页面。在这里，我会记录自己在前端路上的学习经验,技术分享；以及遇到的问题和解决方案。同时，会向着全栈方向不断靠近。';
        this.eventBus.emit('update-meta', meta);
    }

    ngOnInit() {
        let cachePosts = null;

        cachePosts = this.transferState.get(ARTICLE_LIST_KEY, null);

        if (!cachePosts && this.storageService.create(true).getItem('is-browser')) {
            cachePosts = this.storageService.create(false).getItem(ARTICLE_LIST_KEY);
        }

        if (validator.isEmpty(cachePosts)) {
            this.getPostList();
        } else {
            this.postList = cachePosts;
            this.bindScroll();
        }
    }

    ngOnDestroy() {
        this.removeScroll();
    }

    getPostList(): void {
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
                this.transferState.set(ARTICLE_LIST_KEY, this.postList);
                this.storageService.create(false).setItem(ARTICLE_LIST_KEY, this.postList);
            },
            error: (err) => {
                console.log(err);
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

    gotoPost(post: Post): void {
        this.router.navigateByUrl(`/article/${post.id}`);
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
                this.getPostList();
            }
        }
    }

    removeScroll() {
        window.removeEventListener('scroll', this._scrollHander, false);
    }


}
