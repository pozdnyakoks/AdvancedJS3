import { Slider } from './slider';

export class MainSlider extends Slider {
  constructor(btns) {
    super(btns);
  }

  showSlides(n) {
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
          this.hanson.style.opacity = '1';
          this.hanson.classList.add('slideInUp');
        }, 3000);
      } else {
        this.hanson.classList.remove('slideInUp');
      }
    }

    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].style.display = 'none';
    }

    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  render() {
    if (document.querySelector('.hanson')) {
      this.hanson = document.querySelector('.hanson');
    }

    this.btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.plusSlides(1);
      });

      btn.parentNode.previousElementSibling
        .addEventListener('click', (ev) => {
          ev.preventDefault();
          this.slideIndex = 1;
          this.showSlides(this.slideIndex);
        });
    });

    this.showSlides(this.slideIndex);
  }
}
