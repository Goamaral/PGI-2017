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

async function updateTutorsList(input) {
  let params = {
    suggestion: input.value,
    csrf: input.attributes.csrf.value
  };

  let response = await ajax('POST', '/tutors-list-ajax', params);
  document.getElementsByTagName('tutors_list')[0].innerHTML = response;
}

function ajax(method, url, params) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);

    if (method == 'POST') {
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader('X-CSRF-Token', params.csrf);
      delete params.csrf;
    }

    let request = '';
    for (let prop in params) {
      if(request.length == 0) {
        request += prop + '=' + params[prop];
      } else {
        request += '&' + prop + '=' + params[prop];
      }
    }

    xhr.send(request);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.responseText);
      }
    };
  });
}

function seeTutorProfile(card) {
  let userID = card.attributes['user-id'].value;

  location.href = '/tutorProfile?userID=' + userID;
}
