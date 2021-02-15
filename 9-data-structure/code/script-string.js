'use strict';

// # 120 working with strings
// part 3
console.log('a+very+nice+string'.split('+')); // will store into a new array
console.log('tina fang and kim'.split(' '));

// join and split
const [fristName, lastName] = 'Tina fang'.split(' ');
const newName = ['Ms.', fristName, lastName.toUpperCase()].join(' ');
console.log(newName);

// way 1
const capitalizeName1 = function (name) {
  const newname = []; // empty array
  const nameArray = name.split(' ');
  for (let subname of nameArray) {
    subname = subname[0].toUpperCase() + subname.slice(1);
    newname.push(subname);
  }
  console.log(newname.join(' '));
};

// way 2
const capitalizeName2 = function (name) {
  let newname = ''; // empty array
  const nameArray = name.split(' ');
  for (let subname of nameArray) {
    subname = subname[0].toUpperCase() + subname.slice(1) + ' ';
    newname += [subname];
  }
  console.log(newname);
};

// way 3
const capitalizeName3 = function (name) {
  const newname = []; // empty array
  const nameArray = name.split(' ');
  for (const subname of nameArray) {
    newname.push(subname.replace(subname[0], subname[0].toUpperCase()));
  }
  console.log(newname.join(' '));
};

capitalizeName1('jessica ann simth davis');
capitalizeName2('tina fang kim shu');
capitalizeName3('letong wei luyuan di');

// Padding 在前面用字符填充
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+'));
console.log('tinafang'.padStart(25, '+')); // the num is the total length of the string
console.log(message.padEnd(25, '+'));
console.log('tinafang'.padEnd(25, '+')); // the num is the total length of the string
/* result
+++++++++++Go to gate 23!
+++++++++++++++++tinafang
Go to gate 23!+++++++++++
tinafang+++++++++++++++++
*/

// you will never see the credit num, it will be replace by ****
const maskCreditCard = function (number) {
  let str = String(number);
  // const str = number + '';
  const last = str.slice(-4);
  console.log(last.padStart(str.length, '*'));
  return 0;
};

maskCreditCard(4399102918291273);
maskCreditCard(1827391318273738);
maskCreditCard(2847971632817274);
maskCreditCard(3627361830830917);

// Repeat
const message2 = 'bad weather... all delayed... ';

console.log(message2.repeat(3));

const planesInLine = function (n) {
  console.log(`there are ${n} planes in line ${'p'.repeat(n)}`);
};
planesInLine(3);
planesInLine(5);
planesInLine(7);

// concat, reverse, etc...

/*
// part 2
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// fix capitalzation in name
const passenger = 'tiNa'; // Tina
const passengerLower = passenger.toLowerCase();

const passengerNew = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerNew);

// check user email, comparing
const email = 'hello@tina.io';
const loginEmail = 'Hello@Tina.Io \n';

const trimmedEmail = loginEmail.toLowerCase().trim(); // 修剪
console.log(trimmedEmail);
console.log(email === trimmedEmail);

// replacing
const priceUS = '288,97$';
const priceCNY = priceUS.replace('$', '￥').replace(',', '.');
console.log(priceCNY);

const announcement = 'all passenger come to boarding door 23, boarding door 23';

console.log(announcement.replace('door', 'gate'));
// console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate')); // regular expression

// Bolleans
const plane2 = 'Airbus A320neo';
console.log(plane2.includes('A320'));
console.log(plane2.startsWith('A'));

if (plane2.startsWith('Airbus') && plane2.endsWith('neo')) {
  console.log('it is the airbus neo family');
}

const checkBaggage = function (items) {
  const baggage = items.toLowerCase(); // lowercase makes it easy to compare
  if (baggage.includes('knife') || baggage.includes('gun'))
    console.log('you are not allowed onboard');
  else console.log('welcome!');
};

checkBaggage('laptop, food, pocket Knife');
checkBaggage('socks, camera');
checkBaggage('snacks, GUN');

// part 1
console.log(...plane);
console.log('B329'[0]);

console.log(airline.length);
console.log('B329'.length);

console.log(airline.indexOf('r')); //6
console.log(airline.lastIndexOf('r')); //10
console.log(airline.lastIndexOf('Portugal')); //8, get -1 if not found

console.log(airline.slice(4, 10)); // return a new string

console.log(airline.slice(0, airline.indexOf(' '))); // get the 1st word
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // get the 1st word

console.log(airline.slice(-2)); // get the 1st word
console.log(airline.slice(1, -1)); // get the 1st word

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  // const seatNum = seat[seat.length - 1];
  const seatNum = seat.slice(-1);
  seatNum === 'B' || seatNum === 'E'
    ? console.log('middle')
    : console.log('not middle');
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('tina'));
console.log(typeof new String('tina')); // is an object under the hood
*/
