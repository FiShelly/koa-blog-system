import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import {Subscribable} from 'rxjs/src/internal/types';
import {Subscription} from 'rxjs/src/internal/Subscription';
import {util} from '../../shared/utils/normal';

/**
 * 事件总线，组件之间可以通过这个服务进行通讯
 */
@Injectable({
    providedIn: 'root'
})
export class EventBusService {
    bus = new Subject<Event>();
    bus$ = this.bus.asObservable();
    _map: object = {};
    
    constructor() {
    }
    
    emit(name: string, data?: any) {
        const event = new Event(name, data);
        this.bus.next(event);
    }
    
    on(name: string, func: any) {
        const _id = util.randomString();
        this._map[name] = this._map[name] ? this._map[name] : {};
        this._map[name][_id] = this.bus$.pipe(filter((event: Event) => event.type === name))
            .subscribe(func);
        return _id;
    }
    
    off(name: string, id?: string) {
        const subArray = this._map[name] || {};
        if (id) {
            const subItem: Subscription = subArray[id];
            subItem.unsubscribe();
            delete this._map[name][id];
        } else {
            Object.values(subArray).forEach((val: Subscription) => {
                val.unsubscribe();
            });
            delete this._map[name];
        }
    }
}

export class Event {
    type: string;
    data: any;
    
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}

