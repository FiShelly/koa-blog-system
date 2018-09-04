import {Component, OnInit, AfterViewInit} from '@angular/core';
import {EventBusService} from '../../shared-services/eventBus/event-bus.service';
import {StorageService} from '../../shared-services/utils/storage.service';
import {ModalService} from '../../shared-services/modal/modal.service';
import {PostService} from '../../shared-services/model/post.service';
import {Router} from '@angular/router';
import {util} from '../../shared-services/utils/normal';
import {Post, Typetag} from '../../models';
import * as moment from 'moment';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, AfterViewInit {

    keyword: string = '';
    status: string = 'all';

    dataTotal: number = 0;
    listOperations: object = {
        width: 120,
        text: '操作',
        list: [
            {
                name: 'publish',
                text: '发布',
                disable: ['delete', 'publish']
            },
            {
                name: 'edit',
                text: '修改'
            },
            {
                name: 'delete',
                text: '删除',
                disable: ['delete']
            }
        ]
    };
    listFormat: object = [
        {
            name: 'id',
            text: '#',
            width: 60
        },
        {
            name: 'kw_text',
            isForceHTML: true,
            text: '文章标题',
            width: 300
        },
        {
            name: 'type',
            text: '文章分类',
            width: 140
        },
        {
            name: 'time',
            text: '发布时间',
            width: 140
        },
        {
            name: 'readCount',
            text: '阅读数',
            width: 60,
            defaultText: '0'
        },
        {
            name: 'commentCount',
            text: '评论数',
            width: 60,
            defaultText: '0'
        },
        {
            name: 'status_str',
            text: '状态',
            width: 75
        },
    ];
    dataPage: any = {
        current: 1,
        total: 1,
        limit: 20
    };
    loading: boolean = true;
    postList: Post[] = [];
    statusMap: object = {};
    statusArray: any[] = [
        {text: '全部', value: 'all'},
        {text: '草稿', value: 'draft'},
        {text: '已发布', value: 'publish'},
        {text: '已删除', value: 'delete'},
    ];

    constructor(
        private postService: PostService,
        private eventBusService: EventBusService,
        private modalService: ModalService,
        private storageService: StorageService,
        private router: Router,
    ) {
        this.statusArray.forEach((val: any) => {
            this.statusMap[val.value] = `<span class="${val.value}-status   ">${val.text}</span>`;
        });
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

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.refresh();
    }

    changePage($e: number) {
        this.refresh($e - 1);
    }

    search() {
        setTimeout(() => {
            this.refresh();
        });
    }

    changeStatus() {
        this.refresh();
    }

    refresh(page: number = 0) {
        this.loading = true;
        this.postService.getList({
            status: this.status,
            keyword: this.keyword,
            limit: this.dataPage.limit,
            offset: page * this.dataPage.limit,
        }).subscribe({
            next: (data) => {
                this.postList = data.list.map(val => {
                    val.kw_text = util.hightLightKw(val.title, this.keyword);
                    val.status_str = this.statusMap[val.status];
                    val.time = moment.unix(val.date).format('YYYY-MM-DD HH:mm');
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

    handleDelete(post: Post) {
        this.postService.deletePost(post).subscribe({
            next: (item) => {
                this.commonAlert('提示', '删除成功');
                this.refresh();
            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            }
        });
    }

    handlePublish(post: Post) {
        this.postService.putStatus(post, 'publish').subscribe({
            next: (item) => {
                this.commonAlert('提示', '发布成功');
                this.refresh();
            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            }
        });
    }

    onOperation(e) {
        switch (e.op) {
            case 'edit':
                this.router.navigateByUrl(`/admin/post/edit/${e.item.id}`);
                break;
            case 'delete':
                this.modalService.modal.confirm({
                    input: {
                        title: '提示',
                        text: `确定删除标题为${e.item.title}的文章吗？`
                    },
                    output: {
                        okCallback: () => {
                            this.handleDelete(e.item);
                        }
                    }
                });
                break;
            case 'publish':
                this.modalService.modal.confirm({
                    input: {
                        title: '提示',
                        text: `确定发布标题为${e.item.title}的文章吗？`
                    },
                    output: {
                        okCallback: () => {
                            this.handlePublish(e.item);
                        }
                    }
                });
                break;
        }
    }

}
