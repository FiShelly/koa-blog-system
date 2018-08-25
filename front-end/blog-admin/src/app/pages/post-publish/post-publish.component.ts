import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {TypetagService} from '../../shared-services/model/typetag.service';
import {PostService} from '../../shared-services/model/post.service';
import {EventBusService} from '../../shared-services/eventBus/event-bus.service';
import {ModalService} from '../../shared-services/modal/modal.service';
import {StorageService} from '../../shared-services/utils/storage.service';
import {util, validator} from '../../shared-services/utils/normal';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MarkDownComponent} from '../../components/mark-down/mark-down.component';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Post, Typetag} from '../../models';

@Component({
    selector: 'app-post-publish',
    templateUrl: './post-publish.component.html',
    styleUrls: ['./post-publish.component.scss']
})
export class PostPublishComponent implements OnInit, AfterViewInit {
    @ViewChild(MarkDownComponent)
    private markdown: MarkDownComponent;
    
    global: any = (<any>window).environment;
    typeList: Typetag[] = [];
    tagList: Typetag[] = [];
    loading: boolean = false;
    post: Post;
    postId: string = '';
    org_post: Post;
    
    constructor(
        private typetagService: TypetagService,
        private postService: PostService,
        private eventBusService: EventBusService,
        private modalService: ModalService,
        private storageService: StorageService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.post = new Post();
    }
    
    ngOnInit() {
        this.postId = this.route.snapshot.paramMap.get('id');
    }
    
    ngAfterViewInit() {
        this.getTypetag('type');
        this.getTypetag('tag');
        if (!validator.isEmpty(this.postId)) {
            this.getPost();
        }
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
    
    getPost() {
        this.loading = true;
        this.postService.getPost(Number(this.postId)).subscribe({
            next: (item: Post) => {
                item.type = Number.parseInt(`${item.type}`);
                item.tag = item.tag.map(val => Number.parseInt(`${val}`));
                item.coverSrc = `${this.global.apiURL.materialView}${item.coverImg}`;
                this.post = item;
                this.org_post = util.deepCopy(this.post);
            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
    
    getTypetag(type: string) {
        this.loading = true;
        this.typetagService.getList(type, '').subscribe({
            next: (item) => {
                this[`${type}List`] = item.list;
            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
    
    onSelectImage($event) {
        $event.stopPropagation();
        this.modalService.modal.imageSelect({
            output: {
                okCallback: (item) => {
                    item = item[0];
                    this.post.coverImg = item.id;
                    this.post.coverSrc = `${this.global.apiURL.materialView}${item.id}`;
                }
            }
        });
    }
    
    getContent(status) {
        const content = this.markdown.getContent();
        this.post.status = status;
        this.post.articleMd = content.md;
        this.post.articleHtml = content.html;
    }
    
    onGotoList() {
        this.router.navigateByUrl('/admin/post/list');
    }
    
    checkData(): boolean {
        const post = this.post;
        let errorText = '';
        if (validator.isEmpty(post.title)) {
            errorText = '标题不能为空';
        } else if (validator.isEmpty(post.abstract)) {
            errorText = '摘要不能为空';
        } else if (validator.isEmpty(post.type)) {
            errorText = '请选择分类';
        } else if (validator.isEmpty(post.tag)) {
            errorText = '请选择标签';
        } else if (!post.date) {
            errorText = '请选择发布时间';
        }
        if (!validator.isEmpty(errorText)) {
            this.commonAlert('警告', errorText);
            return true;
        }
        return false;
    }
    
    compare() {
        const cur = this.post;
        const org = this.org_post;
        const diff = [];
        //    [1,2,3] [2,3,4]
        if (cur.type !== org.type) {
            diff.push({
                id: org.type,
                type: 'type',
                op: 'subtract'
            },{
                id: cur.type,
                type: 'type',
                op: 'increment'
            });
        }
        const org_filter = org.tag.filter(val => !cur.tag.includes(val));
        const cur_filter = cur.tag.filter(val => !org.tag.includes(val));
        
        org_filter.forEach(val => {
            diff.push({
                id: val,
                type: 'tag',
                op: 'subtract'
            });
        });
    
        cur_filter.forEach(val => {
            diff.push({
                id: val,
                type: 'tag',
                op: 'increment'
            });
        });
        
        return diff;
    }
    
    modifyPost(status: string) {
        const diff = this.compare();
        this.postService.putPost(this.post, diff).subscribe({
            next: () => {
                this.commonAlert(
                    '提示',
                    status === 'draft' ? '文章保存草稿成功' : '文章发布成功',
                    () => {
                        this.onGotoList();
                    }
                );

            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            }
        });
    }
    
    onPublish(status: string) {
        this.getContent(status);
        if (this.checkData()) {
            return;
        }
        if (this.postId) {
            this.modifyPost(status);
            return;
        }
        this.postService.postPost(this.post).subscribe({
            next: () => {
                this.commonAlert(
                    '提示',
                    status === 'draft' ? '文章保存草稿成功' : '文章发布成功',
                    () => {
                        this.onGotoList();
                    }
                );
                
            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            }
        });
    }
}
