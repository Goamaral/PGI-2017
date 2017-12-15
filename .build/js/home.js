'use strict';

var axios = require('axios');

window.onload = function() {
  document.getElementById('register').onclick = function (ev) {
    var params = new FormData(document.getElementById('registerForm'));
    axios.post('/register', params)
      .then(function (res) {
        console.log(res);
      });
  };
};
