/**
 * Created by ddxfc on 2017/4/8.
 */
import {Visitor} from './Visitor';
import {Quotes} from './Quotes';
import {Post} from './Post';

export class Comment {
    _id: string;
    id: string;
    kw_text: string = '';
    article: number;
    article_data: Post;
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
