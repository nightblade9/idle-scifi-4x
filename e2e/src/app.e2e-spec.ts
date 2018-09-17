import { AppPage } from './app.po';
import { by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have a button to harvest Resource A', () => {
    page.navigateTo();
    // Automatically asserts that the element exists
    page.getHarvesingSection().findElement(by.id("harvestResourceA"));
  });
});
