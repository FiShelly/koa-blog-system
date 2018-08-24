import {util} from './normal';

export class MyStorage {

    _map: any = {};

    constructor() {
    }

    setItem(key: string, value: any) {
        this._map[key] = value;
    }

    getItem(key: string): any {
        return this._map[key];
    }

    removeItem(key: string) {
        delete this._map[key];
    }

    clear() {
        this._map = {};
    }

    get length() {
        return Object.keys(this._map).length;
    }

    key(num) {
        return util.randomString();
    }
}
