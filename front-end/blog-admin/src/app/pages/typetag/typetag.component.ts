import {Component, OnInit, AfterViewInit} from '@angular/core';
import {MaterialService} from '../../shared-services/model/material.service';
import {TypetagService} from '../../shared-services/model/typetag.service';
import {Typetag} from '../../models';
import {ModalService} from '../../shared-services/modal/modal.service';
import * as moment from 'moment';
import {util} from '../../shared-services/utils/normal';

@Component({
    selector: 'app-typetag',
    templateUrl: './typetag.component.html',
    styleUrls: ['./typetag.component.scss']
})
export class TypetagComponent implements OnInit, AfterViewInit {

    keyword: string = '';

    currentObj: any = {
        total: 0,
        type: 'type',
        title: '分类'
    };

    listOperations: object = {
        width: 140,
        text: '操作',
        list: [
            {
                name: 'edit',
                text: '修改'
            },
            {
                name: 'delete',
                text: '删除'
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
            name: 'kw_text',
            isForceHTML: true,
            text: '名称',
            width: 400
        },
        {
            name: 'count',
            text: '文章数目',
            width: 120,
            defaultText: '0'
        },
        {
            name: 'time',
            text: '创建时间',
            width: 180
        }
    ];

    typeList: Typetag[] = [];
    tagList: Typetag[] = [];

    loading: boolean = true;

    constructor(
        private materialService: MaterialService,
        private typetagService: TypetagService,
        private modalService: ModalService
    ) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.refresh(this.currentObj.type);
    }


    changeTypeAndTag() {
        setTimeout(() => {
            this.currentObj.title = this.currentObj.type === 'type' ? '分类' : '标签';
            this.refresh(this.currentObj.type);
        });
    }

    private commonAlert(title, msg) {
        this.modalService.modal.alert({
            input: {
                title: title,
                text: msg,
            }
        });
    }

    onAdd($e) {
        const title = this.currentObj.title;
        this.modalService.modal.prompt({
            input: {
                title: `新增${title}`,
                text: `请输入${title}名称`,
            },
            output: {
                okCallback: (v) => {
                    this.addTypeOrTag(v);
                }
            }
        });
    }

    addTypeOrTag(name: string) {
        const typeTag = new Typetag();
        typeTag.name = name;
        typeTag.type = this.currentObj.type;
        this.typetagService.postTypeTag(typeTag).subscribe({
            next: (item) => {
                this.commonAlert('提示', '添加成功');
                this.refresh(typeTag.type, true);
            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            }
        });
    }

    search() {
        this.refresh(this.currentObj.type, true);
    }

    refresh(type: string, isForce?: boolean) {
        if (this[`${type}List`].length > 0 && !isForce) {
            this.currentObj.total = this[`${type}List`].length;
            return;
        }
        this.loading = true;
        this.typetagService.getList(type, this.keyword).subscribe({
            next: (item) => {
                this[`${type}List`] = item.list.map(v => {
                    v.kw_text = util.hightLightKw(v.name, this.keyword);
                    v.time = moment.unix(v.date).format('YYYY-MM-DD HH:mm');
                    return v;
                });
                this.currentObj.total = item.list.length;
            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    handleEdit(typeTag: Typetag, newVal) {
        typeTag.name = newVal;
        this.typetagService.putTypeTag(typeTag).subscribe({
            next: (item) => {
                this.commonAlert('提示', '编辑成功');
                this.refresh(typeTag.type, true);
            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            }
        });
    }

    handleDelete(typeTag: Typetag) {
        this.typetagService.deleteTypeTag(typeTag).subscribe({
            next: (item) => {
                this.commonAlert('提示', '删除成功');
                this.refresh(typeTag.type, true);
            },
            error: (e) => {
                this.commonAlert('警告', e.message);
            }
        });
    }

    onOperation(e) {
        const title = this.currentObj.title;
        switch (e.op) {
            case 'edit':
                this.modalService.modal.prompt({
                    input: {
                        title: `编辑${title}`,
                        text: `请输入新的${title}名称`,
                        value: e.item.name
                    },
                    output: {
                        okCallback: (v) => {
                            this.handleEdit(e.item, v);
                        }
                    }
                });
                break;
            case 'delete':
                this.modalService.modal.confirm({
                    input: {
                        title: '提示',
                        text: `确定删除名为${e.item.name}的${title}吗？`
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
