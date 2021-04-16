/* exported data */

var data = {
  calculator: {
    type: '',
    problem: '',
    result: null
  },
  practice: {
    simplify: [],
    factor: [],
    derive: [],
    integrate: []
  },
  response: null
};

// var responses = {
//   correct: 'Correct!',
//   incorrect: 'Incorrect',
//   simplify: 'Please ues "^" for exponents and use parenthesis when dividing polynomials.',
//   factor: 'Please ues "^" for exponents and use parenthesis when dividing polynomials.',
//   derive: 'Please ues "^" for exponents and use parenthesis when dividing polynomials.',
//   integrate: 'Please ues "^" for exponents and use parenthesis when dividing polynomials.',
//   trig: 'Please ues "^" for exponents and use parenthesis when dividing polynomials. Type "pi" when using pi.',
//   log: 'Please ues "^" for exponents and use parenthesis when dividing polynomials.'
// }

// function getNewtonData(type, problem) {
//   var xhr = new XMLHttpRequest();
//   problem = encodeURIComponent(problem);
//   xhr.open('GET', 'https://newton.now.sh/api/v2/' + type + '/' + problem);
//   xhr.responseType = 'json';
//   xhr.addEventListener('load', function () {
//     data.calculator.result = xhr.response.result;
//   });
//   xhr.send();
// }
