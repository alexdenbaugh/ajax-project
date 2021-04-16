var $pResult = document.querySelector('.result-text');

function getNewtonData(type, problem) {
  var xhr = new XMLHttpRequest();
  problem = encodeURIComponent(problem);
  xhr.open('GET', 'https://newton.now.sh/api/v2/' + type + '/' + problem);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.calculator.result = xhr.response.result;
    updateResult(xhr.status);
    // console.log('loaded')
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
  // console.log(data);
  // formatCheck();
  getNewtonData(data.calculator.type, data.calculator.problem);
});

function updateResult(xhr) {
  if (xhr.status === 400) {
    // $pResult.textContent = responses[data.calculator.type];
    $pResult.classList.remove('black-text');
    $pResult.classList.add('red-text');
  } else {
    $pResult.textContent = data.calculator.result;
  }
}

// function formatCheck() {

// }
