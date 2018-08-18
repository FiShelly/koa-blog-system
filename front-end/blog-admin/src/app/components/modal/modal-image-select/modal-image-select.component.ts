import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseModal} from '../base-modal';
import {util} from '../../../shared-services/utils/normal';
import {Material} from '../../../models';
import {MaterialService} from '../../../shared-services/model/material.service';

@Component({
    selector: 'app-modal-image-select',
    templateUrl: './modal-image-select.component.html',
    styleUrls: ['./modal-image-select.component.scss']
})
export class ModalImageSelectComponent extends BaseModal implements OnInit {
    static $alias: string = 'imageSelect';
    text: string = '';
    value: Map<number, Material> = new Map();
    multi: boolean = false;
    dataPage: any = {
        current: 1,
        total: 1,
        limit: 6
    };
    materials: Material[] = [];
    global: any = (<any>window).environment;
    loading: boolean = true;
    errorMessage: string = '';
    
    @Output() okCallback: EventEmitter<any> = new EventEmitter<any>();
    @Output() cancelCallback: EventEmitter<any> = new EventEmitter<any>();
    
    
    constructor(
        private materialService: MaterialService
    ) {
        super();
    }
    
    ngOnInit() {
    }
    
    modalCreated(opts: any) {
        this.title = '选择图片';
        Object.keys(opts).forEach(val => {
            this[val] = opts[val];
        });
        this.refresh();
    }
    
    okHandle() {
        this.close();
        this.okCallback.emit(Array.from(this.value.values()));
    }
    
    cancelHandle() {
        this.close();
        this.cancelCallback.emit();
    }
    
    selectImage($e, item: Material) {
        $e.stopPropagation();
        if (!this.multi) {
            this.value.clear();
        }
        if (this.hasSelected(item)) {
            this.value.delete(item.id);
        } else {
            this.value.set(item.id, item);
        }
    }
    
    changePage($e: number) {
        this.refresh($e - 1);
    }
    
    hasSelected(item: Material) {
        return this.value.has(item.id);
    }
    
    refresh(page: number = 0) {
        this.loading = true;
        this.materialService.getList({
            limit: this.dataPage.limit,
            offset: page * this.dataPage.limit,
            keyword: ''
        }).subscribe({
            next: (data) => {
                this.materials = data.list.map(val => {
                    val.kw_text = util.hightLightKw(val.name, '');
                    val.src = `${this.global.apiURL.materialView}${val.id}`;
                    return val;
                });
                this.dataPage.total = data.total % this.dataPage.limit === 0 ?
                    data.total / this.dataPage.limit :
                    Math.ceil(data.total / this.dataPage.limit);
                this.dataPage.current = page + 1;
            },
            error: (error) => {
                this.errorMessage = error.message;
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
}
