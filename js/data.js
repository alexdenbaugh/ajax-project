/* exported data */

var data = {
  calculator: {
    type: '',
    problem: '',
    result: null
  },
  practice: {
    type: '',
    problem: '',
    userAnswer: '',
    correctAnswer: '',
    result: null
  },
  progress: {
    simplify: [],
    factor: [],
    derive: [],
    integrate: []
  }
};

// eslint-disable-next-line no-unused-vars
var responses = {
  correct: 'Correct!',
  incorrect: 'Incorrect',
  simplify: 'Please use "^" for exponents and use parenthesis when dividing polynomials.',
  factor: 'Please use "^" for exponents and use parenthesis when dividing polynomials.',
  derive: 'Please use "^" for exponents and use parenthesis when dividing polynomials.',
  integrate: 'Please use "^" for exponents and use parenthesis when dividing polynomials.',
  trig: 'Please use following format: sin(x), cos(x), tan(x), arcsin(x), arccos(x), arctan(x). Type “pi” if using pi. Do not include variables in problem.',
  log: 'Please use following format: log2(8). Do not include variables in problem. For log base 10, use log10(x).'
};

// eslint-disable-next-line no-unused-vars
var typeCheck = ['arcsin', 'arccos', 'arctan', 'sin', 'cos', 'tan', 'log'];

// eslint-disable-next-line no-unused-vars
var practiceTypes = ['simplify', 'factor', 'derive', 'integrate'];

// eslint-disable-next-line no-unused-vars
var practicePrompts = {
  simplify: {
    type: 'Simplification',
    prompt: 'Simplify the following equation:'
  },
  factor: {
    type: 'Factoring',
    prompt: 'Factor the following equation:'
  },
  derive: {
    type: 'Derivatives',
    prompt: 'What is the result of the following equation?'
  },
  integrate: {
    type: 'Integrals',
    prompt: 'What is the result of the following equation?'
  }
};
