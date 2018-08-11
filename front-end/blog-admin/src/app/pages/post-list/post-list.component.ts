import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
    
    listOperations: object = {
        width: 100,
        text: '操作',
        list: [
            {
                name: 'edit',
                text: '修改'
            },
            {
                name: 'delete',
                text: '删除'
            }
        ]
    };
    listFormat: object = [
        {
            name: 'id',
            text: '#',
            width: 65
        },
        {
            name: 'title',
            text: '文章标题',
            width: 300
        },
        {
            name: 'cnt',
            text: '文章分类',
            width: 150
        },
        {
            name: 'time',
            text: '发布时间',
            width: 140
        },
        {
            name: 'time',
            text: '阅读数',
            width: 65
        },
        {
            name: 'time',
            text: '评论数',
            width: 65
        },
        {
            name: 'time',
            text: '状态',
            width: 80
        },
    ];
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
}
