'use strict';
let forms = document.getElementsByTagName('form');

function registerMenu() {
  forms[0].style.display = 'none';
  forms[1].style.display = 'block';
}

function loginMenu() {
  forms[1].style.display = 'none';
  forms[0].style.display = 'block';
}
