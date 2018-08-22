import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {StorageService} from '../../shared-service/utils/storage.service';
import {CommentService} from '../../shared-service/model/comment.service';
import {PostService} from '../../shared-service/model/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Comment, Post} from '../../models';
import * as moment from 'moment';

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
export class ArticleDetailComponent implements OnInit {

    article: Post = new Post();
    comments: Comment[] = [];
    comment: Comment = new Comment();
    remember: boolean;
    issubmit: boolean;
    global: any = (<any>window).environment;

    constructor(
        private storageService: StorageService,
        private commentService: CommentService,
        private articleService: PostService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.article.id = Number(this.route.snapshot.paramMap.get('id'));
        this.getArticle();
        this.updateCount();
        this.getComment();
        this.setVisitor();
    }

    setVisitor() {
        const ssVisitor = this.storageService.create(true).getItem('visitor');
        if (ssVisitor) {
            this.comment.visitor = ssVisitor;
            this.remember = true;
        }
    }

    getArticle() {
        this.articleService.getPost(this.article.id).subscribe({
            next: (data) => {
                this.article = data;
                this.article.coverSrc = `${this.global.apiURL.materialView}${data.coverImg}`;
            },
            error: (err) => {
                alert(err.message);
            }
        });
    }

    updateCount() {
        this.articleService.increment(this.article.id).subscribe();
    }

    gotoTypetag(type, flag): void {
        this.storageService.setItem('cache-type-tag', {name: type, type: flag});
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

    submitComment() {
        this.issubmit = true;
        if (this.remember) {
            this.storageService.setItem('visitor', this.comment.visitor);
        } else {
            this.storageService.setItem('visitor', '');
        }
        if (this.comment.content.indexOf('<quote') !== -1) {
            this.comment.init();
            this.comment.quotes.name = this.comment.content.match(/<quote-name>([\s\S]*?)<\/quote-name>/)[1];
            this.comment.quotes.content = this.comment.content.match(/<quote-content>([\s\S]*?)<\/quote-content>/)[1];
            this.comment.content = this.comment.content.replace(/<quote-name>([\s\S]*?)<\/quote-content>\n/, '');
        }
        this.comment.date = moment().format('YYYY-MM-DD HH:mm');
        this.comment.article = {id: this.article.id, title: this.article.title};
        const comment: Comment = new Comment();
        this.comments.push(Object.assign(comment, this.comment));
        this.commentService.postComment(this.comment).subscribe({
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
