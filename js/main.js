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

// function practiceProblem() {
//   data.practice.type = practiceTypes[randomInteger(0, practiceTypes.length - 1)];
//   data.practice.problem = createProblem(data.practice.type);
//   getNewtonData(data.practice.type, data.practice.problem);
//   data.practice.correctAnswer = data.calculator.problem;
//   console.log('data.practice:', data.practice)
// }

// var $problemType = document.querySelector('.problem-type')
// var $problemPrompt = document.querySelector('.problem-prompt')
// var $problemType = document.querySelector('.problem-type')

// function changePracticeProblemView(type) {
//   $problemType.textContent = practicePrompts[type].type;
//   $problemPrompt.textContent = practicePrompts[type].prompt;
// }

// function createProblem(type) {
//   var problem = '';
//   if (type === 'simplify') {
//     problem = '(' + getPolynomial(2, type) + ')(' + getPolynomial(3, type) + ')';
//     return problem;
//   } else if (type === 'factor') {
//     problem = getPolynomial(3, type);
//     return problem;
//   }
// }

// function getPolynomial(maxPolySize, type) {
//   if (maxPolySize < 1) {
//     return null;
//   }
//   var size;
//   if (type === 'simplify') {
//     size = randomInteger(1, maxPolySize);
//   } else if (type === 'factor') {
//     size = maxPolySize;
//   }
//   console.log('size =', size)
//   var sign;
//   var integer;
//   var f = factorConstants();
//   var polynomial = [];
//   for (var i = 0; i < size; i++) {
//     if (type === 'simplify') {
//       integer = randomInteger(0, 10);
//     } else if (type === 'factor') {
//       integer = f[i];
//     }
//     console.log('integer' + (i + 1) + ' =', integer)
//     if (integer !== 0) {
//       if (i === 0) {
//         polynomial.unshift('' + integer)
//       } else if (i === 1) {
//         if (integer === 1) {
//           polynomial.unshift('x');
//         } else if (integer === -1) {
//           polynomial.unshift('-x');
//         } else {
//           polynomial.unshift(integer + 'x');
//         }
//       } else {
//         if (i === 1) {
//           polynomial.unshift('x^' + i)
//         } else if (integer === -1) {
//           polynomial.unshift('-x');
//         } else {
//           polynomial.unshift(integer + 'x^' + i)
//         }
//       }
//     }
//   }
//   if (type === 'simplify') {
//     if (polynomial.length <= 1) {
//       integer = randomInteger(1, 10);
//       sign = randomInteger(0, 1);
//       if (sign === 0) {
//         sign = '-';
//       } else {
//         sign = '+';
//       }
//       if (integer === 1) {
//         polynomial = [sign + 'x'];
//       } else {
//         polynomial = [sign + integer + 'x'];
//       }
//     } else {
//       for (i = 0; i < polynomial.length; i++) {
//         sign = randomInteger(0, 1);
//         console.log('Sign', sign)
//         if (sign === 0) {
//           polynomial[i] = '-' + polynomial[i];
//         } else {
//           polynomial[i] = '+' + polynomial[i];
//         }
//       }
//     }
//   }
//   if (type === 'factor') {
//     for (i = 1; i < polynomial.length; i++) {
//       if (polynomial[i][0] !== '-') {
//         polynomial[i] = '+' + polynomial[i];
//       }
//     }
//   }
//   if (polynomial[0][0] === '+') {
//     polynomial[0] = polynomial[0].slice(1);
//   }
//   return polynomial.join('');
// };

// function randomInteger(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// function factorConstants() {
//   var integers = [randomInteger(1, 5), randomInteger(1, 5), randomInteger(1, 5)];
//   var sign;
//   var a;
//   var b;
//   var c;
//   for (var i = 0; i < integers.length; i++) {
//     sign = randomInteger(0, 1);
//     if (sign === 0) {
//       integers[i] = -integers[i]
//     }
//   }
//   a = integers[0];
//   b = integers[0] * (integers[1] + integers[2]);
//   c = integers[0] * integers[1] * integers[2];
//   return [c, b, a];
// };
