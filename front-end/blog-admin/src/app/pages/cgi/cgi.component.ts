import {Component, OnInit, AfterViewInit} from '@angular/core';
import {EventBusService} from '../../shared-services/eventBus/event-bus.service';
import {StorageService} from '../../shared-services/utils/storage.service';
import {ModalService} from '../../shared-services/modal/modal.service';
import {CgiService} from '../../shared-services/model/cgi.service';
import {Router} from '@angular/router';
import {util} from '../../shared-services/utils/normal';
import {Cgi} from '../../models';
import * as moment from 'moment';

@Component({
    selector: 'app-cgi',
    templateUrl: './cgi.component.html',
    styleUrls: ['./cgi.component.scss']
})
export class CgiComponent implements OnInit, AfterViewInit {
    
    keyword: string = '';
    status: string = 'all';
    
    dataTotal: number = 0;
    listOperations: object = {
        width: 85,
        text: '操作',
        list: [
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
            width: 100
        },
        {
            name: 'content_kw',
            isForceHTML: true,
            text: '内容',
            width: 410
        },
        {
            name: 'ip_kw',
            text: 'ip',
            isForceHTML: true,
            width: 120,
            defaultText: '*'
        },
        {
            name: 'time',
            text: '发布时间',
            width: 138
        },
        {
            name: 'type',
            text: '日志分类',
            width: 100
        }
    ];
    dataPage: any = {
        current: 1,
        total: 1,
        limit: 20
    };
    loading: boolean = true;
    cgiList: Cgi[] = [];
    statusMap: object = {};
    statusArray: any[] = [
        {text: '加载时间', value: 'cli-time'},
        {text: '前端异常', value: 'cli-error'},
    ];
    
    constructor(
        private cgiService: CgiService,
        private eventBusService: EventBusService,
        private modalService: ModalService,
        private storageService: StorageService,
        private router: Router,
    ) {
        this.statusArray.forEach((val: any) => {
            this.statusMap[val.value] = `<span class="publish-status">${val.text}</span>`;
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
    
    refresh(page: number = 0) {
        this.loading = true;
        this.cgiService.getList({
            keyword: this.keyword,
            limit: this.dataPage.limit,
            offset: page * this.dataPage.limit,
        }).subscribe({
            next: (data) => {
                this.cgiList = data.list.map((val: Cgi) => {
                    val.content_kw = util.hightLightKw(val.content, this.keyword);
                    val.ip_kw = util.hightLightKw(val.ip, this.keyword);
                    val.type = this.statusMap[val.type];
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
    
    handleDelete(cgi: Cgi) {
        this.cgiService.delete(cgi.id).subscribe({
            next: (item) => {
                this.commonAlert('提示', '删除成功');
                this.refresh();
            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            }
        });
    }
    
    
    onOperation(e) {
        switch (e.op) {
            case 'delete':
                this.modalService.modal.confirm({
                    input: {
                        title: '提示',
                        text: `确定删除此日志信息吗？`
                    },
                    output: {
                        okCallback: () => {
                            this.handleDelete(e.item);
                        }
                    }
                });
                break;
        }
    }
    
}
