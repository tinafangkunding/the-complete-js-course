'use strict';

/* input
underscore_case
 first_name
Some_Variable
  calculate_AGE
delayed_departure
*/

const convertStr = function (str) {
  const singleStr = str.split('\n');
  let emoji = 1;
  for (const s of singleStr) {
    let lowerStr = s.toLowerCase().trim();
    const [a, b] = lowerStr.split('_');
    let newStr = a + b[0].toUpperCase() + b.slice(1);
    // padding with emoji
    newStr = newStr.padEnd(20, ' ') + '√'.repeat(emoji);
    emoji++;
    console.log(newStr);
  }
  return 0;
};

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  convertStr(text);
  // console.log(text);
});
