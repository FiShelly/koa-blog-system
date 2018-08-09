import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import {Subscribable} from 'rxjs/src/internal/types';
import {Subscription} from 'rxjs/src/internal/Subscription';


/**
 * 事件总线，组件之间可以通过这个服务进行通讯
 */
@Injectable({
    providedIn: 'root'
})
export class EventBusService {
    $bus = new Subject<Event>();
    $busObs = this.$bus.asObservable();
    _map: object = {};
    
    constructor() {
    }
    
    emit(name: string, data: any) {
        const event = new Event(name, data);
        this.$bus.next(event);
    }
    
    on(name: string, func: any) {
        this._map[name] = this._map[name] ? this._map[name] : [];
        const subscribe = this.$busObs.pipe(filter((event: Event) => event.type === name))
            .subscribe(func);
        this._map[name].push(subscribe);
    }
    
    off(name) {
        const subArray = this._map[name] || [];
        subArray.forEach(val => {
            val.unsubscribe();
        });
        delete this._map[name];
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

