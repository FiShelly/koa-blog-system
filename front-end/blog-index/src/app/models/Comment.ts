/**
 * Created by ddxfc on 2017/4/8.
 */
import {Visitor} from './Visitor';
import {Quotes} from './Quotes';

export class Comment {
    _id: string;
    id: string;
    article: Object;
    content: string;
    date: string;
    visitor: Visitor;
    quotes: Quotes;
    
    constructor() {
        // this.quotes = new Quotes();
        this.visitor = new Visitor();
    }
    
    init() {
        this.quotes = new Quotes();
    }
}
