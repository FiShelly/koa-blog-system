import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-post-publish',
    templateUrl: './post-publish.component.html',
    styleUrls: ['./post-publish.component.scss']
})
export class PostPublishComponent implements OnInit {
    labels = ['checkBox1', 'checkBox2', 'checkBox3', 'checkBox4'];
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
}
