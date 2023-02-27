export class Slider {
  constructor(page: string, btns: string) {
    this.page = document.querySelector(page);
    this.slides = this.page.children;
  }
}
