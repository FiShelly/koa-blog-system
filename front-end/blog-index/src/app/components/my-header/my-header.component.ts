import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-my-header',
    templateUrl: './my-header.component.html',
    styleUrls: ['./my-header.component.scss']
})
export class MyHeaderComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    showMenu($event): void {
        const dom = $event.target;
        if (dom.classList.contains('lines')) {
            dom.parentNode.classList.toggle('close');
        } else {
            dom.classList.toggle('close');
        }
        document.querySelector('#dropdown-menu').classList.toggle('dropdown');
    }

}
