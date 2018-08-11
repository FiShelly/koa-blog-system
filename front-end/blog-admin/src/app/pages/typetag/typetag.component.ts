import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-typetag',
    templateUrl: './typetag.component.html',
    styleUrls: ['./typetag.component.scss']
})
export class TypetagComponent implements OnInit {
    
    
    listOperations: object = {
        width: 150,
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
            width: 100
        },
        {
            name: 'title',
            text: '名称',
            width: 450
        },
        {
            name: 'cnt',
            text: '文章数目',
            width: 120
        },
        {
            name: 'time',
            text: '创建时间',
            width: 180
        }
    ];
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
}
