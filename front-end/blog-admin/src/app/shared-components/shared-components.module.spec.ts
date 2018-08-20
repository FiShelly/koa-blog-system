import { SharedComponentsModule } from './shared-components.module';

describe('SharedComponentsModule', () => {
  let shareComponentsModule: SharedComponentsModule;

  beforeEach(() => {
    shareComponentsModule = new SharedComponentsModule();
  });

  it('should create an instance', () => {
    expect(shareComponentsModule).toBeTruthy();
  });
});
