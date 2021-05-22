'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-05-05T17:01:17.194Z',
    '2021-05-09T23:36:17.929Z',
    '2021-05-10T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / 1000 / 60 / 60 / 24);

  // calc days passed
  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  else if (daysPassed === 1) return 'Yesterday';
  else if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const year = date.getFullYear();
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const day = `${date.getDate()}`.padStart(2, 0);
  // return `${day}/${month}/${year}`;

  // replace with the intl format
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  const formattedMov = formatCur(acc.balance, acc.locale, acc.currency);

  labelBalance.textContent = `${formattedMov}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(out, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // Print remaining time in UI
    labelTimer.textContent = `${min}:${sec}`;
    // When 0 second, stop timer and logout users.
    if (time === 0) {
      clearInterval(timer);
      // Display UI and message
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    // Decrese 1s
    time--;
  };

  // setTimeout 5 min
  let time = 30;
  // Call the timer immediately
  tick();
  // Call timer every second
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers, global params
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // set date
    // const now = new Date();
    // console.log(now);
    // const year = now.getFullYear();
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Intl Date
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language; // get the language in your browser
    // console.log(locale);

    // language code table. http://www.lingoes.net/en/translator/langcode.htm
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Check if timer already exist
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value); // rounding the number

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);
      // Add load date
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currentAccount);
    }, 3000);
  }

  // Reset timer
  clearInterval(timer);
  timer = startLogOutTimer();

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
// # 168
console.log(23 === 23.0); // numbers are composed in binary form
console.log(0.1 + 0.2);

// Conversion: Convert string to number
console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23', 10));

console.log(Number.parseInt('2.5rem'));
console.log(Number.parseFloat('2.5rem'));

console.log('---------isNaN---------');
// Check if value is NaN
console.log(Number.isNaN(20)); // is it not a number? false
console.log(Number.isNaN('20')); // it's a value
console.log(Number.isNaN(+'30x')); // try to convert to a number, but it's not a number
console.log(Number.isNaN(23 / 0)); // Infinity

console.log('---------isFinite---------');
// Checking if value is number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'30x'));
console.log(Number.isFinite(23 / 0));

console.log('---------isInteger---------');
// Checking if value is number
console.log(Number.isInteger(20));
console.log(Number.isInteger(20.0));
console.log(Number.isInteger(23 / 0));

console.log('------------------');

// # 169 Math and Rounding

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(25, 1, 2, '32', 3, 1, 1, 2));
console.log(Math.min(25, -1, 2, '32', 3, 1, 1, 2));

console.log(Math.PI * Number.parseFloat('10px') ** 2); //pi*r^2

console.log(Math.trunc(Math.random() * 6) + 1); // one ~ six

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min; // min ~ max

console.log(randomInt(10, 20));

// Rounding Integers
console.log(Math.trunc(23.9)); // round down

console.log(Math.round(23.3)); // 四舍五入
console.log(Math.round(23.9));

console.log(Math.ceil(23.3)); // round up
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3)); // round down
console.log(Math.floor('23.9'));

console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.3)); // -24

// Rounding decimals
console.log((2.7).toFixed(0)); // string
console.log((2.7).toFixed(3));
console.log(+(2.72234343).toFixed(2)); // string to num

// # 170 The Remainder Operator

console.log(5 % 2); //5 remaminder 2 is 1, 余数
console.log(8 % 3);

const isEven = n => n % 2 === 0;

console.log(isEven(3));
console.log(isEven(13));
console.log(isEven(8));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
// Nth time, use remainder operator

// # 171 BigInt! ES 2020

console.log(2 ** 53 - 1); // the biggest num that js can represent
console.log(Number.MAX_SAFE_INTEGER); //9007199254740991

console.log(423423893428974328974238974382974829374382423789n); //BigInt, green
console.log(BigInt(474382423789)); //BigInt, green, constructor function

// Operations
console.log(10000n + 10000n); //BigInt, green
console.log(423423893428974328974238974382974829374382423789n + 1n); //BigInt, green
// console.log(Math.sqrt(16n)); // cannot work

const huge = 313213129313912318312n;
const num = 23;
console.log(huge + BigInt(num));

console.log(20n > 12); //true
console.log(20n === 20); //false
console.log(typeof 20n); // bigint
console.log(20n == '20'); //true

console.log(huge + ' is really big');

// Divisions
console.log(10n / 3n); //3n, the closest big int, cut the decimal part.
console.log(10 / 3); //3.333

// # 172 Creating Dates

const now = new Date();
console.log(now);

console.log(new Date('May 07 2021 19:44:59'));
console.log(new Date('December 24, 2015'));

console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // convert days to ms

// # 174 Working with Dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); //Date to ISO String
console.log(future.getTime());

console.log(new Date(2142228180000)); //timestamp

console.log(Date.now());

future.setFullYear(2040);
console.log(future);

const future = new Date(2037, 10, 19, 15, 23);

console.log(Number(future));
// console.log(+future);

// const now = new Date();
// const days = (Number(future) - Number(now)) / 1000 / 60 / 60 / 24;
//

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / 1000 / 60 / 60 / 24;

const days = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14, 10, 8));

console.log(days);

// # 175&176 Internationalizing Dates and Numbers (intl)

const num = 312131231.23;

const options = {
  style: 'currency',
  //unit: 'mile-per-hour',
  //unit: 'celsius',
  currency: 'EUR',
  //useGrouping: false,
};

console.log(new Intl.NumberFormat('en-US', options).format(num));
console.log(new Intl.NumberFormat('de-DE', options).format(num));
console.log(new Intl.NumberFormat('ar-SY', options).format(num));
console.log(new Intl.NumberFormat(navigator.language, options).format(num));

// # 177 Timers: setTimeout and setInterval
// async js, and parameters

const ingredients = ['olives', 'cheese'];

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
); // counting time in background
console.log('waiting...');

if (ingredients.includes('cheese')) clearTimeout(pizzaTimer);

*/

// setInterval. cron
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 3000);
