'use strict';

var axios = require('axios');

window.onload = function() {
  // Register
  document.getElementById('register').onclick = function (ev) {
    var params = new FormData(document.getElementById('registerForm'));
    if (params.get('password') == params.get('confirm_password')) {
      axios.post('/register', params)
        .then(function (res) {
          if (!res.data.sts) {
            alert('user ja registado');
            console.log(res);
          } else alert('user registado com sucesso');
        });
    } else {
      alert('Passwords não coincidem');
      console.log(res);
    }
  };

  // Login
  document.getElementById('login').onclick = function (ev) {
    var params = new FormData(document.getElementById('loginForm'));
    axios.post('/login', params)
      .then(function (res) {
        if (!res.data.sts) {
          alert('Password ou email incorretos');
          console.log(res);
        } else alert('login bem sucedido');
      });
  };
};
