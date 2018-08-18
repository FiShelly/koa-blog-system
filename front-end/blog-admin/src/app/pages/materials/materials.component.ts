import {Component, OnInit, AfterViewInit} from '@angular/core';
import {MaterialService} from '../../shared-services/model/material.service';
import {ModalService} from '../../shared-services/modal/modal.service';
import {Material} from '../../models';
import {HttpEventType} from '@angular/common/http';
import {util} from '../../shared-services/utils/normal';

// import {moment} from 'moment';

@Component({
    selector: 'app-materials',
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit, AfterViewInit {
    
    dataPage: any = {
        current: 1,
        total: 1,
        limit: 8
    };
    keyword: string = '';
    materials: Material[] = [];
    global: any = (<any>window).environment;
    dataTotal: number = 0;
    loading: boolean = true;
    
    constructor(
        private materialService: MaterialService,
        private modalService: ModalService
    ) {
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
        this.refresh();
    }
    
    refresh(page: number = 0) {
        this.loading = true;
        this.materialService.getList({
            keyword: this.keyword,
            limit: this.dataPage.limit,
            offset: page * this.dataPage.limit,
        }).subscribe({
            next: (data) => {
                this.materials = data.list.map(val => {
                    val.kw_text = util.hightLightKw(val.name, this.keyword);
                    val.src = `${this.global.apiURL.materialView}${val.id}`;
                    return val;
                });
                this.dataTotal = data.total;
                this.dataPage.total = data.total % this.dataPage.limit === 0 ?
                    data.total / this.dataPage.limit :
                    Math.ceil(data.total / this.dataPage.limit);
                this.dataPage.current = page + 1;
            },
            error: (error) => {
                this.modalService.modal.alert({
                    input: {
                        title: '警告',
                        text: error.message,
                    }
                });
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
    
    updateImage($e, item: Material) {
        $e.stopPropagation();
        this.modalService.modal.prompt({
            input: {
                title: '提示',
                text: '请输入新的素材名称',
                value: item.name
            },
            output: {
                okCallback: (v) => {
                    item.name = v;
                    this.materialService.put(item).subscribe({
                        next: () => {
                            this.refresh(this.dataPage.current - 1);
                            this.modalService.modal.alert({
                                input: {
                                    title: '提示',
                                    text: '修改素材名称成功'
                                }
                            });
                        },
                        error: (error) => {
                            this.modalService.modal.alert({
                                input: {
                                    title: '警告',
                                    text: error.message,
                                }
                            });
                        }
                    });
                }
            }
        });
    }
    
    deleteImage(item) {
        this.materialService.delete(item.id).subscribe({
            next: () => {
                this.refresh();
                this.modalService.modal.alert({
                    input: {
                        title: '提示',
                        text: '删除成功',
                    }
                });
            },
            error: (error) => {
                this.modalService.modal.alert({
                    input: {
                        title: '警告',
                        text: error.message,
                    }
                });
            }
        });
    }
    
    onSelectFile(files) {
        const filesArray = [].map.call(files, (val) => {
            const obj: any = new Material();
            obj.file = val;
            obj.name = val.name;
            obj.ext = val.name.split('.');
            obj.ext = obj.ext[obj.ext.length - 1];
            obj.status = 'start';
            obj.progress = '开始上传';
            const reader = new FileReader();
            reader.readAsDataURL(val);
            reader.onload = (e: any) => {
                obj.src = e.target.result;
            };
            return obj;
        });
        let completeCnt = 0;
        filesArray.forEach(val => {
            this.materials.unshift(val);
            this.materialService.upload(val).subscribe({
                next: (e) => {
                    val.status = e.status;
                    val.progress = e.progress;
                    if (e.type === HttpEventType.Response) {
                        completeCnt += 1;
                        if (completeCnt === filesArray.length) {
                            this.refresh();
                        }
                    }
                }
            });
        });
        
    }
}
