'use strict';

// Section 10 Functions

/*
// #127 Default Parameters

const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // es5 way for default value
  // numPassengers = numPassengers || 1;
  // price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 299);
createBooking('LH123', 4);
createBooking('LH123', 8);
// cannot skip params
createBooking('LH123', undefined, 299); // trick to get default value

// #128 How Passing Arguments Works: Values and Reference

const flight = 'LH234';
const tina = {
  name: 'tina fang',
  passport: 13829102,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH666';
  passenger.name = 'Ms.' + passenger.name;
  if (passenger.passport === 13829102) {
    console.log('check in');
  } else {
    console.log('wrong passport');
  }
};

checkIn(flight, tina); // flightNum is a copy of original num
console.log(flight); // reference type, use the same memory heap
console.log(tina);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000);
};

newPassport(tina);
checkIn(flight, tina);

// passing by value
// passing by reference --- js don't really have

// # 129 First Class vs Higher Order Function
// # 130 Functions Accepting Callback Functions

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// higher order function
const transformer = function (str, fn) {
  console.log(`original ${str}`);
  console.log(`transformed str: ${fn(str)}`);

  console.log(`transformed function: ${fn.name}`);
};

// callback funtions, do not call here, call later in the function
transformer('JavaScript is the best!', upperFirstWord);

transformer('JavaScript is the best!', oneWord);

const high5 = function () {
  console.log('haihaihaih');
};

// it will be called when you click the button in the page
document.body.addEventListener('click', high5);

['tina', 'kim', 'aurora'].forEach(high5);

// # 131 Functions returning functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} + ${name}`);
  };
};

// change it to arrow function
const greet1 = greeting => name => console.log(`${greeting} + ${name}`);

// the greeterHey function is exactly the returned function
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Kim');

greet('Hello')('TIna'); // call it together!

// # 132 the call and apply method

// manually set the `this` keyword

const ChinaSouth = {
  airLine: 'ChinaSouth',
  dataCode: 'CZ',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airLine} flight ${this.dataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.dataCode}${flightNum}`, name });
  },
};

ChinaSouth.book(3231, `tina`);
ChinaSouth.book(3232, `kim`);

console.log(ChinaSouth.bookings);

const chengduAirline = {
  airLine: 'ChengDu',
  dataCode: 'CD',
  bookings: [],
};

// external function, easy to reuse.
const book = ChinaSouth.book;

// does not work, because this keyword will point to undefined.
// book(3232, `kim`);

// Call method
book.call(chengduAirline, 3232, `kim`);
book.call(ChinaSouth, 1111, `kim`);
console.log(ChinaSouth.bookings);

const swiss = {
  airLine: 'Swiss Airline',
  dataCode: 'SA',
  bookings: [],
};

book.call(swiss, 564, `aurora`);

// Apply method
const flightData = [394, 'tinafang'];
book.apply(swiss, flightData);
// equals to call with destructure
book.call(swiss, ...flightData);

// Bind method

const bookSW = book.bind(swiss); // will not call book, but create a new function
const bookCD = book.bind(chengduAirline);
const bookCZ = book.bind(ChinaSouth);
bookSW(231, `aurorrrra`);
bookCD(1111, `kimmmmm`);
bookCZ(231, `fionaaaaa`);

const bookSW23 = book.bind(swiss, 23); // preset params
bookSW23(`tom`);
bookSW23(`alice`);

// With Event Listeners

ChinaSouth.planes = 300;

ChinaSouth.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// ChinaSouth.buyPlane();

// using bind method to specify which object `this` keyword point to
document
  .querySelector('.buy')
  .addEventListener('click', ChinaSouth.buyPlane.bind(ChinaSouth));

// Partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.2); // if there is no this keyword, use NULL
console.log(addVAT(200));
console.log(addVAT(100));

// another way to do it
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);

console.log(addVAT2(200));
console.log(addVAT2(100));

// #135 IIFE Immediate Invoked Function Expressions

const runOnce = function () {
  console.log('This will never run again!');
};
runOnce();

// IIFE!! don't give it a name :)
// transform a statement to an expression
// this data 23 is encapsulated inside of the function scope.
(function () {
  console.log('This will never run again!');
  const isPrivate = 23; // cannot get the access in the scope, it's private
})();

(() => console.log('This will ALSO never run again!'))();

// const cannot be accessed, var can, ignore the block here {}
{
  const isPrivate = 22;
  var notPrivate = 46;
}
console.log(isPrivate);
console.log(notPrivate);

// #136 Closures 闭包

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

// #137 More Closure Examples

// Example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g(); // a and f are remembered/ in the backpack
f(); // 46
console.dir(f);

// re-assign f function
h();
f();

console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`we are now boarding all ${n} passengers`);
    console.log(`there are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // if there is not perGroup 180, will use 1000 instead

boardPassengers(180, 3);

// callback function
// setTimeout(function () {
//   console.log('TIMER');
// }, 1000);

*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  header.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
