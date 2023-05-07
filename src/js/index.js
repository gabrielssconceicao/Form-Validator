class FormValidador {
  constructor(form) {
    this.form = form;
  }

  validate() {
    let errors = false;
    const formInputs = this.form.querySelectorAll('input');

    this.clear(formInputs);
    const IsEmptyError = this.isEmpty(formInputs);
    const lengthError = this.validateValues(formInputs);

    if (IsEmptyError || lengthError) {
      errors = true;
    }

    return errors;
  }

  isEmpty(array) {
    let errors = false;

    for (let item of array) {
      if (!item.value) {
        errors = true;
        this.addError(item, 'não deve ficar vazio');
      }
    }

    return errors;
  }

  validateValues(array) {
    let errors = false;
    const passwordArray = [];
    for (let item of array) {
      if (
        item.type !== 'password' &&
        (item.value.length < 3 || item.value.length > 255)
      ) {
        errors = true;
        this.addError(item, 'deve ter entre 3 e 255 caracteres');
      }

      if (item.type === 'email') {
        const regex = new RegExp(
          /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
          'gm'
        );

        if (!regex.test(item.value)) {
          errors = true;
          this.addError(item, 'inválido');
        }
      }

      if (item.type === 'password') {
        if (item.value.length < 3 || item.value.length > 50) {
          errors = true;
          this.addError(item, 'deve ter entre 3 e 50 caracteres');
        }
        passwordArray.push(item);
      }
    }

    if (passwordArray[0].value !== passwordArray[1].value) {
      for (let item of passwordArray) {
        errors = true;
        this.addError(item, ' As senhas são diferentes', true);
      }
    }

    return errors;
  }

  errorMsg(id = '', msg) {
    const p = document.createElement('p');
    p.innerHTML = `${id.toUpperCase()} ${msg}`;
    p.classList.add('error-msg');
    return p;
  }

  addError(item, errorMsg, show = false) {
    let dataKey = item.dataset.key;
    if (show) {
      dataKey = '';
    }
    const error = this.errorMsg(dataKey, errorMsg);
    item.parentNode.appendChild(error);
  }

  clear(array) {
    for (let item of array) {
      while (item.nextSibling) {
        item.parentNode.removeChild(item.nextSibling);
      }
    }
  }
}

const form = document.querySelector('form');
const formValidator = new FormValidador(form);

document.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault();

  const error = formValidator.validate();

  if (!error) {
    form.submit();
    window.alert('Formulário enviado');
  }
});
