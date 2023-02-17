'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      let response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        form.reset();
        form.classList.remove('_sending');
        return response.json();
      } else {
        form.classList.remove('_sending');
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    }
  }

  let formReq = document.querySelectorAll('._req');
  let pasEr = document.getElementById('errorPasswordMessage');
  let pasReEr = document.getElementById('errorRePasswordMessage');
  let emailEr = document.getElementById('errorEmailMessage');

  function formValidate(form) {
    let error = 0;
    let pas = document.getElementById('inputPassword');

    pasEr.innerHTML = '';
    pasReEr.innerHTML = '';
    emailEr.innerHTML = '';

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (input.value === '') {
          formAddError(input);
          emailEr.innerHTML = 'Укажите E-mail';
          error++;
        } else if (emailTest(input)) {
          formAddError(input);
          emailEr.innerHTML = 'Неверный E-mail';
          error++;
        }
      }
      if (input.classList.contains('_pas')) {
        if (input.value === '') {
          formAddError(input);
          pasEr.innerHTML = 'Укажите пароль';
          error++;
        } else if (input.value.length < 5) {
          formAddError(input);
          pasEr.innerHTML = 'Используйте не менее 5 символов';
          error++;
        }
      }
      if (input.classList.contains('_rePas')) {
        if (input.value === '') {
          formAddError(input);
          pasReEr.innerHTML = 'Укажите пароль';
          error++;
        } else if (input.value !== pas.value) {
          formAddError(input);
          pasReEr.innerHTML = 'Пароли не совпадают';
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.classList.remove('_error');
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});
