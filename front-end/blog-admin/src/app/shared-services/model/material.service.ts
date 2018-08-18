import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';
import {Material} from '../../models';
import {HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import {filter, last, map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MaterialService extends CommonService {
    
    public getList(data): Observable<any> {
        return this.hc.get<any>(this.apiURL.materialResFul, {
            params: {
                limit: data.limit,
                offset: data.offset,
                keyword: data.keyword
            }
        });
    }
    
    public delete(id): Observable<any> {
        return this.hc.delete<any>(`${this.apiURL.materialResFul}${id}`);
    }
    
    public put(material: Material): Observable<any> {
        return this.hc.put<any>(`${this.apiURL.materialResFul}${material.id}`, material);
    }
    
    private createFormData(material: any) {
        const formData = new FormData();
        Object.keys(material).forEach((x) => {
            formData.append(x, material[x]);
        });
        return formData;
    }
    
    public upload(material: any): Observable<any> {
        material = this.createFormData(material);
        const req = new HttpRequest('POST', this.apiURL.materialResFul, material, {
            reportProgress: true
        });
        return this.hc.request(req).pipe(
            filter((event: HttpEvent<any>) => {
                return event.type === HttpEventType.Sent ||
                    event.type === HttpEventType.UploadProgress ||
                    event.type === HttpEventType.Response;
            }),
            map(event => this.getEventMessage(event))
        );
    }
    
    private getEventMessage(event: HttpEvent<any>) {
        switch (event.type) {
            case HttpEventType.Sent:
                return {type: event.type, status: 'start', progress: '开始上传'};
            
            case HttpEventType.UploadProgress:
                return {type: event.type, status: 'loading', progress: `${Math.round(100 * event.loaded / event.total)}%`};
            
            case HttpEventType.Response:
                return {type: event.type, status: 'complete', progress: '完成上传'};
            
        }
    }
}
