class FormValidador {
  constructor(form) {
    this.form = form;
  }

  validate() {
    let errors = false;
    const formInputs = this.form.querySelectorAll('input');

    const errorIsEmpty = this.isEmpty(formInputs);

    if (!errorIsEmpty) {
      errors = false;

      return;
    }
    errors = true;
    console.log(errors);
    return;
  }

  isEmpty(array) {
    let errors = false;
    this.clear(array);
    for (let item of array) {
      if (!item.value) {
        errors = true;
        const error = this.errorMsg(item.dataset.key);
        item.parentNode.appendChild(error);
      }
    }

    return errors;
  }

  errorMsg(id) {
    const p = document.createElement('p');
    p.innerHTML = `Campo ${id.toUpperCase()} não deve ficar vazio`;
    p.classList.add('error-msg');
    return p;
  }

  clear(array) {
    for (let item of array) {
      const p = item.parentNode.querySelector('.error-msg');
      if (p) {
        item.parentNode.removeChild(p);
      }

      //
    }
  }
}

const form = document.querySelector('form');
const formValidator = new FormValidador(form);

document.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault();

  formValidator.validate();
});
