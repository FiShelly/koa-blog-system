import {Component, Inject, OnInit, Optional} from '@angular/core';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit {

  constructor(
      @Optional() @Inject('koaCtx') private ctx: any
  ) {
      if (this.ctx) {
          this.ctx.status = 404;
      }
  }

  ngOnInit() {
  }

}
