import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';
    check = ['checkBox1', 'checkBox2'];
    labels = ['checkBox1', 'checkBox2', 'checkBox3', 'checkBox4'];
    radio = 0;
    cbDisabled: Boolean = false;
    switch: Boolean = false;
    
    constructor() {
    }
    
    clickEvent($event: Event) {
        console.log('click event ', $event);
    }
    
    changeEvent($event: Event) {
    }
}
