import { StrucdirPage } from './app.po';

describe('strucdir App', () => {
  let page: StrucdirPage;

  beforeEach(() => {
    page = new StrucdirPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
