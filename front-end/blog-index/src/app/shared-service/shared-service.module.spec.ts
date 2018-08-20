import { SharedServiceModule } from './shared-service.module';

describe('SharedServiceModule', () => {
  let sharedServiceModule: SharedServiceModule;

  beforeEach(() => {
    sharedServiceModule = new SharedServiceModule();
  });

  it('should create an instance', () => {
    expect(sharedServiceModule).toBeTruthy();
  });
});
