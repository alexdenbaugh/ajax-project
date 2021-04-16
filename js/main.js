var $pResult = document.querySelector('.result-text');

function getNewtonData(type, problem) {
  var xhr = new XMLHttpRequest();
  problem = encodeURIComponent(problem);
  xhr.open('GET', 'https://newton.now.sh/api/v2/' + type + '/' + problem);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.calculator.result = xhr.response.result;
    // updateResult(xhr.status);
  });
  xhr.send();
}

var $formCalculator = document.querySelector('#form-calculator');

$formCalculator.addEventListener('submit', function () {
  event.preventDefault();
  $pResult.classList.remove('red-text');
  $pResult.classList.add('black-text');
  $pResult.textContent = 'Solving...';
  data.calculator.type = $formCalculator.elements.type.value;
  data.calculator.problem = $formCalculator.elements.problem.value;
  data.calculator.result = null;
  // formatCheck()
  getNewtonData(data.calculator.type, data.calculator.problem);
});

// function updateResult(status) {
//   if (status === 400 || (!data.calculator.result && data.calculator.result !== 0 && isNaN(data.calculator.result))) {
//     $pResult.textContent = responses[data.calculator.type];
//     $pResult.classList.remove('black-text');
//     $pResult.classList.add('red-text');
//   } else {
//     $pResult.textContent = data.calculator.result;
//   }
// }

// function formatCheck() {
//   var problem = data.calculator.problem;
//   var check = false;
//   for (var i = 0; i < typeCheck.length; i++) {
//     if (problem.startsWith(typeCheck[i])) {
//       check = true;
//       break
//     }
//   }
//   if (check === false) {
//     return
//   }
//   if (data.calculator.type === 'log') {
//     problem = problem.slice(3);
//     problem = problem.slice(0, problem.length - 1);
//     problem = problem.replace('(', '|');
//   } else if (data.calculator.type === 'trig') {
//     data.calculator.type = problem.slice(0, problem.indexOf('('));
//     problem = problem.slice(problem.indexOf('(') + 1, problem.length - 1)
//   }
//   data.calculator.problem = problem
// }
