import { environment } from './environments/environment';

(<any>window).environment = environment;

export { AppServerModule } from './app/app.server.module';
