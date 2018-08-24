/**
 * Created by ddxfc on 2017/4/8.
 */
export class Post {
    constructor() {

    }

    id: number;
    title: string;
    kw_text: string;
    seo: string;
    type: any = {};
    tag: any[] = [];
    abstract: string;
    date: number;
    time: string;
    articleHtml: string;
    articleMd: string = '';
    readCount: number;
    commentCount: number;
    coverImg: string;
    status: string;
    coverSrc: string = '';
}
