/* global data, responses, typeCheck, practiceTypes, practicePrompts, derivativeTypes, trigProblemTypes, integralTypes, trigProblemTypes */

var $pResult = document.querySelector('.result-text');

function getNewtonData(type, problem, feature) {
  var xhr = new XMLHttpRequest();
  problem = encodeURIComponent(problem);
  xhr.open('GET', 'https://newton.now.sh/api/v2/' + type + '/' + problem);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (feature === 'calculator') {
      data.calculator.result = xhr.response.result;
      updateResult(xhr.status, xhr.response.result);
    } else if (feature === 'practice') {
      data.practice.correctAnswer = xhr.response.result;
    }
  });
  xhr.send();
}

var $formCalculator = document.querySelector('#form-calculator');

$formCalculator.addEventListener('submit', function () {
  event.preventDefault();
  $pResult.classList.remove('red-text');
  $pResult.textContent = 'Solving...';
  data.calculator.type = $formCalculator.elements.type.value;
  data.calculator.problem = $formCalculator.elements.problem.value;
  data.calculator.result = null;
  formatCheck();
  getNewtonData(data.calculator.type, data.calculator.problem, 'calculator');
});

function updateResult(status, response) {
  if (data.calculator.type === 'log' && isNaN(data.calculator.result)) {
    $pResult.textContent = responses[data.calculator.type];
    $pResult.classList.add('red-text');
  } else if (status >= 400 || (!data.calculator.result && data.calculator.result !== 0) || response.includes('error')) {
    $pResult.textContent = responses[data.calculator.type];
    $pResult.classList.add('red-text');
  } else {
    $pResult.textContent = data.calculator.result;
  }
}

function formatCheck() {
  var problem = data.calculator.problem;
  var check = false;
  for (var i = 0; i < typeCheck.length; i++) {
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
var $practiceSettingsError = document.querySelector('.practice-settings-error');

function viewChanger(dataView) {
  if (dataView === 'hide-menu') {
    $menu.classList.add('hidden');
  } else if (dataView === 'show-menu') {
    $menu.classList.remove('hidden');
  } else if (dataView === 'show-settings-error') {
    $practiceSettingsError.classList.remove('hidden');
  } else if (dataView === 'hide-settings-error') {
    $practiceSettingsError.classList.add('hidden');
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
  if (event.target.classList.contains('view-changer')) {
    var dataView = event.target.getAttribute('data-view');
    viewChanger(dataView);
  }
});

var $practiceForm = document.querySelector('#form-practice');
var $practiceSubmitButton = document.querySelector('#practice-submit-button');
$practiceForm.addEventListener('submit', function () {
  event.preventDefault();
  $practiceSubmitButton.classList.add('hidden');
  data.practice.userAnswer = $practiceForm.elements.answer.value;
  if (compareUserAndCorrect(data.practice.userAnswer, data.practice.correctAnswer)) {
    correctOrIncorrect('correct');
    data.practice.result = 'correct';
  } else {
    correctOrIncorrect('incorrect');
    data.practice.result = 'incorrect';
  }
});

var $practiceResponse = document.querySelector('.practice-response');
var $practiceResponseH1 = document.querySelector('#practice-response');
var $correctAnswer = document.querySelector('#correct-answer');
var $practiceAnswerDiv = document.querySelector('#result-window-container');

function correctOrIncorrect(result) {
  if (result === 'correct') {
    $practiceResponse.classList.remove('hidden');
    $practiceResponseH1.textContent = 'Correct!';
    $practiceResponseH1.className = 'green-text';
    $practiceAnswerDiv.className = 'result-window green-border';
    $correctAnswer.classList.add('hidden');
  } else if (result === 'incorrect') {
    $practiceResponse.classList.remove('hidden');
    $practiceResponseH1.textContent = 'Incorrect';
    $practiceResponseH1.className = 'red-text';
    $practiceAnswerDiv.className = 'result-window red-border';
    $correctAnswer.classList.remove('hidden');
    $correctAnswer.textContent = 'Correct Answer: ';
    insertSuperscripts($correctAnswer, data.practice.correctAnswer);
  } else {
    $practiceResponse.classList.add('hidden');
    $practiceAnswerDiv.className = 'result-window';
  }
}

var $nextQuestion = document.querySelector('#next-question-button');
$nextQuestion.addEventListener('click', function (event) {
  if (event.target !== $nextQuestion) {
    return;
  }
  // console.log('practice.type', data.practice.type)
  // var saveProgress = {settings, type, problem, userAnswer, correctAnswer, result} = data.practice;
  // console.log('saveprogress', saveProgress)
  // data.progress[saveProgress.type].push(saveProgress);
  // console.log('data.progress[data.practice.type]', data.progress[data.practice.type])
  // console.log('data.progress', data.progress);
  $practiceForm.elements.answer.value = '';
  $practiceSubmitButton.classList.remove('hidden');
  practiceProblem();
  correctOrIncorrect();
});

function practiceProblem() {
  data.practice.type = data.practice.settings[randomInteger(0, data.practice.settings.length - 1)];
  data.practice.problem = createProblem(data.practice.type);
  getNewtonData(data.practice.type, data.practice.problem, 'practice');
  changePracticeProblemView(data.practice.type);
}

var $problemType = document.querySelector('.problem-type');
var $problemPrompt = document.querySelector('.problem-prompt');
var $problem = document.querySelector('.problem');

function changePracticeProblemView(type) {
  $problemType.textContent = practicePrompts[type].type;
  $problemPrompt.textContent = practicePrompts[type].prompt;
  var $equationBlock = document.createElement('div');
  $equationBlock.className = 'equation-block';
  if (type === 'derive') {
    var $derivaDiv = document.createElement('div');
    $derivaDiv.className = 'd-dx-derivative';
    var $derivativeNumerator = document.createElement('h2');
    $derivativeNumerator.className = 'grey-text numerator';
    $derivativeNumerator.textContent = 'd';
    var $derivativeDenominator = document.createElement('h2');
    $derivativeDenominator.className = 'grey-text denominator';
    $derivativeDenominator.textContent = 'dx';
    $derivaDiv.append($derivativeNumerator, $derivativeDenominator);
    $equationBlock.append($derivaDiv);
  } else if (type === 'integrate') {
    var $integralSignDiv = document.createElement('div');
    $integralSignDiv.className = 'integral-sign';
    var $integralSign = document.createElement('h2');
    $integralSign.className = 'grey-text integral';
    $integralSign.textContent = '∫';
    $integralSignDiv.append($integralSign);
    $equationBlock.append($integralSignDiv);
    var $integrateDivEnd = document.createElement('div');
    $integrateDivEnd.className = 'd-dx-integral';
    var $integralNumerator = document.createElement('h2');
    $integralNumerator.className = 'grey-text numerator';
    $integralNumerator.textContent = 'dx';
    $integrateDivEnd.append($integralNumerator);
  }
  var $equationDiv = document.createElement('div');
  var $equationH2 = document.createElement('h2');
  $equationH2.className = 'grey-text';
  insertSuperscripts($equationH2, data.practice.problem);
  $equationDiv.appendChild($equationH2);
  $equationBlock.appendChild($equationDiv);
  if (type === 'integrate') {
    $equationBlock.appendChild($integrateDivEnd);
  }
  $problem.replaceChildren($equationBlock);
}

function insertSuperscripts(element, textContent) {
  var terms = textContent.split('^(');
  var $supList = [];
  if (terms.length === 1) {
    element.append(textContent);
  } else {
    element.textContent = terms[0];
    for (var i = 1; i < terms.length; i++) {
      $supList.push(document.createElement('sup'));
      $supList[i - 1].textContent = terms[i].substring(0, terms[i].indexOf(')'));
      element.append($supList[i - 1], terms[i].substring(terms[i].indexOf(')') + 1));
    }
  }
}

function createProblem(type) {
  if (type === 'simplify') {
    return '(' + getPolynomial(2, type) + ')(' + getPolynomial(3, type) + ')';
  } else if (type === 'factor') {
    return getPolynomial(3, type);
  } else if (type === 'derive') {
    return getDerivativeProblem();
  } else if (type === 'integrate') {
    return getIntegralProblem();
  }
}

function getPolynomial(maxPolySize, type) {
  if (maxPolySize < 1) {
    return null;
  }
  var size;
  if (type === 'simplify') {
    size = randomInteger(1, maxPolySize);
  } else if (type === 'factor') {
    size = maxPolySize;
  }
  var sign;
  var integer;
  var f;
  if (type === 'factor') {
    f = factorConstants();
  }
  var polynomial = [];
  for (var i = 0; i < size; i++) {
    if (type === 'simplify') {
      integer = randomInteger(0, 10);
    } else if (type === 'factor') {
      integer = f[i];
    }
    if (integer !== 0) {
      if (i === 0) {
        polynomial.unshift('' + integer);
      } else if (i === 1) {
        if (integer === 1) {
          polynomial.unshift('x');
        } else if (integer === -1) {
          polynomial.unshift('-x');
        } else {
          polynomial.unshift(integer + 'x');
        }
      } else {
        if (integer === 1) {
          polynomial.unshift('x^(' + i + ')');
        } else if (integer === -1) {
          polynomial.unshift('-x^(' + i + ')');
        } else {
          polynomial.unshift(integer + 'x^(' + i + ')');
        }
      }
    }
  }
  if (type === 'simplify') {
    if (polynomial.length <= 1) {
      integer = randomInteger(1, 10);
      sign = randomInteger(0, 1);
      if (sign === 0) {
        sign = '-';
      } else {
        sign = '+';
      }
      if (integer === 1) {
        polynomial = [sign + 'x'];
      } else {
        polynomial = [sign + integer + 'x'];
      }
    } else {
      for (i = 0; i < polynomial.length; i++) {
        sign = randomInteger(0, 1);
        if (sign === 0) {
          polynomial[i] = '-' + polynomial[i];
        } else {
          polynomial[i] = '+' + polynomial[i];
        }
      }
    }
  }
  if (type === 'factor') {
    for (i = 1; i < polynomial.length; i++) {
      if (polynomial[i][0] !== '-') {
        polynomial[i] = '+' + polynomial[i];
      }
    }
  }
  if (polynomial[0][0] === '+') {
    polynomial[0] = polynomial[0].slice(1);
  }
  return polynomial.join('');
}

function getDerivativeProblem() {
  var category = derivativeTypes[randomInteger(0, derivativeTypes.length - 1)];
  var problem;
  var sign = randomInteger(0, 1);
  var trigType = trigProblemTypes[randomInteger(0, trigProblemTypes.length - 1)];
  if (category === 'poly') {
    return getPolynomial(3, 'simplify');
  } else if (category === 'trig') {
    problem = randomInteger(2, 9) + trigType + '(' + getPolynomial(2, 'simplify') + ')';
    if (sign === 0) {
      return '-' + problem;
    } else {
      return problem;
    }
  } else if (category === 'trigExponent') {
    return trigType + '(' + getPolynomial(2, 'simplify') + ')' + '^(2)';
  }
}

function getIntegralProblem() {
  var category = integralTypes[randomInteger(0, integralTypes.length - 1)];
  var problem;
  var sign = randomInteger(0, 1);
  var trigType = trigProblemTypes[randomInteger(0, trigProblemTypes.length - 1)];
  if (category === 'poly') {
    return getPolynomial(3, 'simplify');
  } else if (category === 'trig') {
    problem = randomInteger(2, 9) + trigType + '(' + getPolynomial(2, 'simplify') + ')';
    if (sign === 0) {
      return '-' + problem;
    } else {
      return problem;
    }
  } else if (category === 'exponent') {
    return '(' + getPolynomial(3, 'simplify') + ')^(' + 2 + ')';
  }
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function factorConstants() {
  var integers = [randomInteger(1, 5), randomInteger(1, 5), randomInteger(1, 5)];
  var sign;
  var a;
  var b;
  var c;
  for (var i = 0; i < integers.length; i++) {
    sign = randomInteger(0, 1);
    if (sign === 0) {
      integers[i] = -integers[i];
    }
  }
  a = integers[0];
  b = integers[0] * (integers[1] + integers[2]);
  c = integers[0] * integers[1] * integers[2];
  return [c, b, a];
}

var $practiceSettingsForm = document.querySelector('#practice-settings');

$practiceSettingsForm.addEventListener('submit', function () {
  event.preventDefault();
  data.practice.settings = practiceTypes.filter(function (type) {
    if (event.target.elements[type].checked) {
      return true;
    } else {
      return false;
    }
  });
  if (data.practice.settings.length > 0) {
    practiceProblem();
    var dataView = event.submitter.getAttribute('data-view');
    viewChanger('hide-settings-error');
    viewChanger(dataView);
  } else {
    viewChanger('show-settings-error');
  }
});

function compareUserAndCorrect(user, answer) {
  user = user.split('');
  answer = answer.split('');
  user = user.filter(char => {
    if (char === '(' || char === ')') {
      return false;
    } else {
      return true;
    }
  });
  answer = answer.filter(char => {
    if (char === '(' || char === ')') {
      return false;
    } else {
      return true;
    }
  });
  user.sort();
  answer.sort();
  user = user.join('');
  answer = answer.join('');
  user = user.trimStart();
  answer = answer.trimStart();
  if (user === answer) {
    return true;
  } else {
    return false;
  }
}
