import { ShareComponentsModule } from './share-components.module';

describe('ShareComponentsModule', () => {
  let shareComponentsModule: ShareComponentsModule;

  beforeEach(() => {
    shareComponentsModule = new ShareComponentsModule();
  });

  it('should create an instance', () => {
    expect(shareComponentsModule).toBeTruthy();
  });
});
