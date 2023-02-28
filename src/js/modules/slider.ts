export class Slider {
  page: HTMLDivElement;
  slides: HTMLCollection;
  btns: NodeListOf<HTMLAnchorElement>;
  slideIndex: number;
  hanson?: HTMLDivElement;

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

    if (this.hanson !== undefined) {
      if (n === 3) {
        this.hanson.style.opacity = '0';
        this.hanson.classList.add('animated');
        setTimeout(() => {
          (<HTMLDivElement>this.hanson).style.opacity = '1';
          (<HTMLDivElement>this.hanson).classList.add('slideInUp');
        }, 3000);
      } else {
        this.hanson.classList.remove('slideInUp');
      }
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
    if (document.querySelector('.hanson')) {
      this.hanson = document.querySelector('.hanson')!;
    }
    this.btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.plusSlides(1);
      });

      (<HTMLAnchorElement>(
        (<HTMLDivElement>btn.parentNode).previousElementSibling
      )).addEventListener('click', (ev) => {
        ev.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

    this.showSlides(this.slideIndex);
  }
}
