import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-my-image-inturn',
    templateUrl: './my-image-inturn.component.html',
    styleUrls: ['./my-image-inturn.component.scss']
})
export class MyImageInturnComponent implements OnInit {

    constructor() {
    }

    static loadImage(url: string) {
        const img = new Image();
        img.onload = function () {
        };
        img.src = url;
    }

    ngOnInit() {
        const dom = <HTMLElement>document.querySelector('.image-inturn');
        let idx = Math.round(Math.random() * 36 + 1);
        let nextImage = `/images/photo/photo\%20(${idx}).jpg`;
        dom.style.backgroundImage = `url('${nextImage}')`;
        MyImageInturnComponent.loadImage(nextImage);
        setInterval(() => {
            dom.style.backgroundImage = `url('${nextImage}')`;
            idx = Math.round(Math.random() * 36 + 1);
            nextImage = `/images/photo/photo\%20(${idx}).jpg`;
            MyImageInturnComponent.loadImage(nextImage);
        }, 30000);
    }

}
