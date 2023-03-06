export class Form {
  constructor(form) {
    this.forms = document.querySelectorAll(form);
    this.inputs = document.querySelectorAll('input');
    this.message = {
      loading: 'Loading',
      success: 'Thank you! We will connect with you soon',
      failure: 'Something went wrong..'
    };
    this.path = 'assets/question.php';
  }

  clearInputs() {
    this.inputs.forEach(input => {
      input.value = '';
    });
  }

  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');
    mailInputs.forEach(input => {
      input.addEventListener('keypress', (e) => {
        const emailMask = /[^a-z 0-9 @ \.]/gi;
        if (e.key.match(emailMask)) {
          e.preventDefault();
        }
      });
    });
  }

  initMask() {
    const setCursorPosition = (pos, elem) => {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        const range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };

    const createMask = (event) => {
      const el = event.target;
      const matrix = '+1 (___) ___-____';
      let i = 0;
      const regNotANumber = /\D/g;
      const def = matrix.replace(regNotANumber, '');
      let val = el.value.replace(regNotANumber, '');

      if (def.length >= val.length) {
        val = def;
      }

      const regAny = /./g;
      el.value = matrix.replace(regAny, (a) => {
        const regSym = /[_\d]/;
        return regSym.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
            ? ''
            : a;
      });

      if (event.type === 'blur') {
        if (el.value.length === 2) {
          el.value = '';
        }
      } else {
        setCursorPosition(el.value.length, el);
      }
    };

    const inputs = document.querySelectorAll('[name="phone"]');

    inputs.forEach((input) => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }

  async postData(url, data) {
    let res = await fetch(url, {
      method: 'POST',
      body: data
    });

    return await res.text()
  }

  init() {
    this.checkMailInputs();
    this.initMask();
    this.forms.forEach(form => {
      form.addEventListener('submit', (ev) => {
        ev.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.style.cssText = `
          margin-top: 15px;
          font-size: 18px;
          color: grey;
        `;
        form.parentNode.appendChild(statusMessage);

        statusMessage.textContent = this.message.loading;

        const formData = new FormData(form);
        this.postData(this.path, formData)
          .then(res => {
            statusMessage.textContent = this.message.success;
          })
          .catch(() => {
            statusMessage.textContent = this.message.failure;
          })
          .finally(() => {
            this.clearInputs();
            setTimeout(() => {
              statusMessage.remove()
            }, 6000);
          })
      })
    })
  }
}
