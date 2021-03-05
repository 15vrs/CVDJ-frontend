import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { Wiremock } from './wiremock';

describe('CVDJ App', () => {
  let page: AppPage;
  let wiremock: Wiremock;

  beforeEach(() => {
    page = new AppPage();
    wiremock = new Wiremock();
  });

  it('should display landing page', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Computer Vision DJ');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
