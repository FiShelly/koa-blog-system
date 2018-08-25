import {APP_ID, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {StorageService} from '../../shared-service/utils/storage.service';

@Component({
    selector: 'app-my-image-inturn',
    templateUrl: './my-image-inturn.component.html',
    styleUrls: ['./my-image-inturn.component.scss']
})
export class MyImageInturnComponent implements OnInit {

    constructor(
        private storageService: StorageService
    ) {
    }

    static loadImage(url: string) {
        const img = new Image();
        img.onload = function () {
        };
        img.src = url;
    }

    ngOnInit() {
        if (!this.storageService.create(true).getItem('is-browser')) {
            return;
        }
        const dom = <HTMLElement>document.querySelector('.image-inturn');
        let idx = Math.round(Math.random() * 29 + 1);
        let nextImage = `/public/images-bg/photo_${idx}.jpg`;
        dom.style.backgroundImage = `url('${nextImage}')`;
        MyImageInturnComponent.loadImage(nextImage);
        setInterval(() => {
            dom.style.backgroundImage = `url('${nextImage}')`;
            idx = Math.round(Math.random() * 29 + 1);
            nextImage = `/public/images-bg/photo_${idx}.jpg`;
            MyImageInturnComponent.loadImage(nextImage);
        }, 30000);
    }

}
