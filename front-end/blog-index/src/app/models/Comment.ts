/**
 * Created by ddxfc on 2017/4/8.
 */
import {Visitor} from './Visitor';
import {Quotes} from './Quotes';

export class Comment {
    _id: string;
    id: string;
    article: number;
    content: string = '';
    date: number;
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
