import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PostService} from '../../shared-services/model/post.service';
import {ModalService} from '../../shared-services/modal/modal.service';
import {Router} from '@angular/router';
import {StorageService} from '../../shared-services/utils/storage.service';
import {EventBusService} from '../../shared-services/eventBus/event-bus.service';
import {CommentService} from '../../shared-services/model/comment.service';
import {Comment} from '../../models';
import {util} from '../../shared-services/utils/normal';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit {
    
    dataPage: any = {
        current: 1,
        total: 1,
        limit: 20
    };
    keyword: string = '';
    dataTotal: number = 0;
    loading: boolean = true;
    comments: Comment[] = [];
    global: any = (<any>window).environment;
    constructor(
        private eventBusService: EventBusService,
        private modalService: ModalService,
        private storageService: StorageService,
        private commentService: CommentService,
        private router: Router,
    ) {
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit() {
        this.refresh();
    }
    
    private commonAlert(title: string, msg: string, cb?: Function) {
        this.modalService.modal.alert({
            input: {
                title: title,
                text: msg,
            },
            output: {
                okCallback: () => {
                    cb && cb();
                }
            }
        });
    }
    
    changePage($e: number) {
        this.refresh($e - 1);
    }
    
    search() {
        setTimeout(() => {
            this.refresh();
        });
    }
    
    refresh(page = 0) {
        this.loading = true;
        this.commentService.getList({
            keyword: this.keyword,
            limit: this.dataPage.limit,
            offset: page * this.dataPage.limit,
        }).subscribe({
            next: (data) => {
                this.comments = data.list.map((val: Comment) => {
                    val.kw_text = util.hightLightKw(val.content, this.keyword);
                    return val;
                });
                this.dataTotal = data.total;
                this.dataPage.total = data.total % this.dataPage.limit === 0 ?
                    data.total / this.dataPage.limit :
                    Math.ceil(data.total / this.dataPage.limit);
                this.dataPage.current = page + 1;
            },
            error: (error) => {
                this.commonAlert('警告', error.message);
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
    
    handleDelete(id: number) {
        this.commentService.delete(id).subscribe({
            next: (item) => {
                this.commonAlert('提示', '删除成功');
                this.refresh();
            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            }
        });
    }
    
    onDelete($e) {
        this.modalService.modal.confirm({
            input: {
                title: '提示',
                text: `确定删除此条评论吗吗？`
            },
            output: {
                okCallback: () => {
                    this.handleDelete($e.id);
                }
            }
        });
    }
}
