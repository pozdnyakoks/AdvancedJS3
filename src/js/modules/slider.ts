export class Slider {
  page: HTMLDivElement;
  slides: HTMLCollection;
  btns: NodeListOf<HTMLAnchorElement>;
  slideIndex: number;

  constructor(page: string, btns: string) {
    this.page = document.querySelector(page)!;
    this.slides = this.page.children;
    this.btns = document.querySelectorAll(btns);
    this.slideIndex = 1;
  }

  showSlides(n: number) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = this.showSlides.length;
    }

    for (let i = 0; i < this.slides.length; i++) {
      (<HTMLDivElement>this.slides[i]).style.display = 'none';
    }

    (<HTMLDivElement>this.slides[this.slideIndex - 1]).style.display = 'block';
  }

  plusSlides(n: number) {
    this.showSlides((this.slideIndex += n));
  }

  render() {
    this.btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.plusSlides(1);
      });
    });

    this.showSlides(this.slideIndex);
  }
}
