export class BasePage {
  constructor(private readonly url: string) {}

  open() {
    return browser.url(this.url);
  }
}
