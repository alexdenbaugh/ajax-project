/* exported data, responses, typeCheck, practiceTypes, practicePrompts, derivativeTypes, trigProblemTypes, integralTypes, trigProblemTypes */

var data = {
  calculator: {
    type: '',
    problem: '',
    result: null
  },
  practice: {
    settings: [],
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

var typeCheck = ['arcsin', 'arccos', 'arctan', 'sin', 'cos', 'tan', 'log'];

var trigProblemTypes = ['sin', 'cos'];

var practiceTypes = ['simplify', 'factor', 'derive', 'integrate'];

var derivativeTypes = ['poly', 'trig', 'trigExponent'];

var integralTypes = ['poly', 'trig', 'exponent'];

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
