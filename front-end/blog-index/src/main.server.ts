import { environment } from './environments/environment';
import {enableProdMode} from '@angular/core';

(<any>window).environment = environment;

if (environment.production) {
    enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
