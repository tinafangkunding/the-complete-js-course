'use strict';

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section! answers: new Array(4).fill(0),
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // Get answer
    const input = prompt(`${this.question} \n ${this.options}`);
    // Register answer
    // type of answer === 'string'
    if (Number(input) === 0 || 1 || 2 || 3) this.answers[input]++;
    else console.log('invalid input');

    this.displayResults();
    this.displayResults('string');

    //console.log(this.answers);
  },
  displayResults(type = 'array') {
    if (type === 'array') console.log(this.answers);
    else if (type === 'string')
      console.log(`Poll results are ${this.answers.join(', ')}`);
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

//bonus
poll.displayResults.call({ answers: [5, 2, 3] });
