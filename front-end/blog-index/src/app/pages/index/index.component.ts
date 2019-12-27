import {Component, OnInit} from '@angular/core';
import {EventBusService} from '../../shared-service/eventBus/event-bus.service';
import {MyMeta} from '../../models';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    constructor(
        private eventBus: EventBusService
    ) {
        const meta = new MyMeta();
        meta.title = '首页 - Fishelly Idx.';
        meta.keyword = 'Fishelly的个人网站,前端技术分享,前端学习经验,前端技术网站,全栈开发,Front end developer,Fullstack,JavaScript,ECMAScript,HTML(5),CSS(3)';
        meta.description = '一个开源自用的个人网站。在这里，我会记录自己在前端路上的学习经验,技术分享；以及遇到的问题和解决方案。同时，会向着全栈方向不断靠近。';
        eventBus.emit('update-meta', meta);
    }

    ngOnInit() {
    }

}
