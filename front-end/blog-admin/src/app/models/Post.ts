/**
 * Created by ddxfc on 2017/4/8.
 */
export class Post {
    constructor() {
    
    }
    
    id: string;
    title: string;
    kw_text: string;
    type: number;
    tag: number[] = [];
    abstract: string;
    date: string;
    time: string;
    articleHtml: string;
    articleMd: string = '';
    readCount: number;
    commentCount: number;
    coverImg: string;
    status: string;
    coverSrc: string;
}
