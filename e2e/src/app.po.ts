import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHarvesingSection() {
    return element(by.id('manual-harvesting')).getWebElement();
  }
}
