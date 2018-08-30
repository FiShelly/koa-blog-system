import {Component, OnInit, AfterViewInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {StorageService} from '../../shared-service/utils/storage.service';
import {CommentService} from '../../shared-service/model/comment.service';
import {PostService} from '../../shared-service/model/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Comment, MyMeta, Post} from '../../models';
import * as moment from 'moment';
import {validator} from '../../shared-service/utils/normal';
import {EventBusService} from '../../shared-service/eventBus/event-bus.service';
import {TransferState, makeStateKey} from '@angular/platform-browser';

const ARTICLE_DETAIL_KEY = makeStateKey('article-detail');

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.scss'],
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
export class ArticleDetailComponent implements OnInit, AfterViewInit {

    article: Post = new Post();
    comments: Comment[] = [];
    comment: Comment = new Comment();
    remember: boolean;
    issubmit: boolean;
    global: any = (<any>window).environment;

    constructor(
        private transferState: TransferState,
        private eventBus: EventBusService,
        private storageService: StorageService,
        private commentService: CommentService,
        private articleService: PostService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.article.id = Number(this.route.snapshot.paramMap.get('id'));
    }

    ngAfterViewInit() {
        setTimeout(() => {
            const article = this.transferState.get(ARTICLE_DETAIL_KEY, null as any);
            if (article) {
                if (this.storageService.create(true).getItem('is-browser')) {
                    this.updateCount();
                }
            } else {
                this.getArticle();
                this.getComment();
                this.setVisitor();
            }
        });
    }

    setVisitor() {
        const ssVisitor = this.storageService.create(true).getItem('visitor');
        if (ssVisitor) {
            this.comment.visitor = ssVisitor;
            this.remember = true;
        }
    }

    setMetaData(data: Post) {
        const keyword = Object.keys(data).map(val => data[val]).join(',');
        const meta = new MyMeta();
        meta.title = `${data.title} - Fishelly Idx.`;
        meta.keyword = `${data.seo},${data.title}`;
        meta.description = `${data.abstract}`;
        this.eventBus.emit('update-meta', meta);
    }

    getArticle() {
        this.articleService.getPost(this.article.id).subscribe({
            next: (data) => {
                this.article = data;
                this.setMetaData(data);
                this.article.coverSrc = `${this.global.apiURL.materialView}${data.coverImg}`;
                this.transferState.set(ARTICLE_DETAIL_KEY, this.article);
            },
            error: (err) => {
                alert(err.message);
                this.router.navigateByUrl('/article');
            }
        });
    }

    updateCount() {
        this.articleService.increment(this.article.id).subscribe({
            error: (text) => {
                console.warn(text);
            }
        });
    }

    gotoTypetag(type): void {
        this.storageService.create(false).setItem('cache-type-tag', type);
        this.router.navigate(['/typetag']);
    }

    getComment() {
        this.commentService.getList(this.article.id).subscribe({
            next: (data) => {
                this.comments = data.list;
            },
            error: (err) => {
                alert(err.message);
            }
        });
    }

    quote(comment) {
        this.comment.content = '<quote-name>' + comment.visitor.name + '</quote-name>\n' +
            '<quote-content>' + comment.content + '</quote-content>' + '\n';
        const dom = <HTMLElement>document.querySelector('#comment');
        dom.focus();
    }

    checkData() {
        const comment = this.comment;
        const email = comment.visitor.email;
        const url = comment.visitor.userIdx;
        let content = comment.content;
        if (comment.content.indexOf('<quote') !== -1) {
            comment.init();
            comment.quotes.name = comment.content.match(/<quote-name>([\s\S]*?)<\/quote-name>/)[1];
            comment.quotes.content = comment.content.match(/<quote-content>([\s\S]*?)<\/quote-content>/)[1];
            content = comment.content.replace(/<quote-name>([\s\S]*?)<\/quote-content>\n/, '');
        }
        if (validator.isEmpty(content)) {
            alert('请输入留言内容');
            return false;
        } else if (!validator.isEmpty(email) && !validator.email(email)) {
            alert('请输入正确的邮箱');
            return false;
        } else if (!validator.isEmpty(url) && !validator.url(url)) {
            alert('请输入正确的url');
            return false;
        }
        comment.content = content;
        return true;
    }

    submitComment() {
        if (!this.checkData()) {
            return;
        }
        this.issubmit = true;
        if (this.remember) {
            this.storageService.create(true).setItem('visitor', this.comment.visitor);
        } else {
            this.storageService.create(true).removeItem('visitor');
        }
        this.comment.date = moment().unix();
        this.comment.article = this.article.id;
        const comment: Comment = new Comment();
        this.comments.push(Object.assign(comment, this.comment));
        this.commentService.postComment(comment).subscribe({
            next: () => {
                this.issubmit = false;
                this.comment.content = '';
            },
            error: (err) => {
                alert(err.message);
            }
        });
    }

}
