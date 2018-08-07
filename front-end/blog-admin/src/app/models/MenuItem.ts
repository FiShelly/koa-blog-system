/**
 * Created by ddxfc on 2017/4/8.
 */
export class MenuItem {
    icon: string;
    text: string;
    isLink: boolean;
    link: string;
    type: string;
    
    constructor(args) {
        Object.keys(args).forEach(val => {
            this[val] = args[val];
        });
    }
}
