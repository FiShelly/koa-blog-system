import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    
    private storage: any;
    
    constructor() {
    }
    
    static check(val: any) {
        return !(typeof val === 'undefined' || typeof val === 'function') && val;
    }
    
    create(type: boolean) {
        if (type) {
            this.storage = window.localStorage;
        } else {
            this.storage = window.sessionStorage;
        }
        return this;
    }
    
    setItem(key: string, val: any) {
        if (StorageService.check(val) && StorageService.check(key)) {
            this.storage.setItem(key, JSON.stringify({data: val}));
        }
    }
    
    getItem(key: string) {
        if (StorageService.check(key)) {
            const val = this.storage.getItem(key);
            
            if (StorageService.check(val)) {
                return JSON.parse(val).data;
            } else {
                return null;
            }
        }
    }
    
    removeItem(key: string) {
        if (StorageService.check(key)) {
            this.storage.removeItem(key);
        }
    }
    
    clear() {
        this.storage.clear();
    }
    
    get length() {
        return this.storage.length;
    }
    
    key(num) {
        this.storage.key(num);
    }
    
}
