var $pResult = document.querySelector('.result-text');

function getNewtonData(type, problem) {
  var xhr = new XMLHttpRequest();
  problem = encodeURIComponent(problem);
  xhr.open('GET', 'https://newton.now.sh/api/v2/' + type + '/' + problem);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.calculator.result = xhr.response.result;
    updateResult(xhr.status);
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
  formatCheck();
  getNewtonData(data.calculator.type, data.calculator.problem);
});

function updateResult(status) {
  if (status === 400 || (!data.calculator.result && data.calculator.result !== 0 && isNaN(data.calculator.result))) {
    // eslint-disable-next-line no-undef
    $pResult.textContent = responses[data.calculator.type];
    $pResult.classList.remove('black-text');
    $pResult.classList.add('red-text');
  } else {
    $pResult.textContent = data.calculator.result;
  }
}

function formatCheck() {
  var problem = data.calculator.problem;
  var check = false;
  // eslint-disable-next-line no-undef
  for (var i = 0; i < typeCheck.length; i++) {
    // eslint-disable-next-line no-undef
    if (problem.startsWith(typeCheck[i])) {
      check = true;
      break;
    }
  }
  if (check === false) {
    return;
  }
  if (data.calculator.type === 'log') {
    problem = problem.slice(3);
    problem = problem.slice(0, problem.length - 1);
    problem = problem.replace('(', '|');
  } else if (data.calculator.type === 'trig') {
    data.calculator.type = problem.slice(0, problem.indexOf('('));
    problem = problem.slice(problem.indexOf('(') + 1, problem.length - 1);
  }
  data.calculator.problem = problem;
}

var $views = document.querySelectorAll('.view');
var $menu = document.querySelector('.hamburger-menu');

function viewChanger(dataView) {
  if (dataView === 'hide-menu') {
    $menu.classList.add('hidden');
  } else if (dataView === 'show-menu') {
    $menu.classList.remove('hidden');
  } else {
    for (var i = 0; i < $views.length; i++) {
      if ($views[i].getAttribute('data-view') === dataView) {
        $views[i].classList.remove('hidden');
      } else {
        $views[i].classList.add('hidden');
      }
    }
    $menu.classList.add('hidden');
  }
}

document.addEventListener('click', function () {
  // eslint-disable-next-line no-empty
  if (!event.target.classList.contains('view-changer')) {

  } else {
    var dataView = event.target.getAttribute('data-view');
    viewChanger(dataView);
  }
});

// var $problemType = document.querySelector('.problem-type')
// var $problemPrompt = document.querySelector('.problem-prompt')
// var $problemType = document.querySelector('.problem-type')

// function changePracticeProblem(type) {
//   $problemType.textContent = practicePrompts[type].type;
//   $problemPrompt.textContent = practicePrompts[type].prompt;
// }

// function practiceProblem() {

// }

// function getPolynomial(maxSize) {
//   var x = 'x';

// }

// function randomPositiveInteger(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }
