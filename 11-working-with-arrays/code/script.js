'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account0 = {
  owner: 'Kim Shu',
  movements: [2200, 4950, -400, 30000, -650, -130, 700, 13000],
  interestRate: 1.2, // %
  pin: 1111,
};

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account0, account1, account2, account3, account4];

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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // empty the old content, like .textContent = 0

  // copy a new movements array with slice
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov} $</div>
      </div>    
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html); // see the official documents
    // if use before end, the order/sort will be reversed
  });
};

// displayMovements(account1.movements);

let flag = false;
// Sorting Arrays
btnSort.addEventListener('click', function (e) {
  // currentAccount.movements.sort((a, b) => a - b);
  // displayMovements(currentAccount.movements, );
  e.preventDefault();
  displayMovements(currentAccount.movements, !flag);
  flag = !flag;
});

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0); // save balance
  labelBalance.textContent = `${acc.balance} $`;
};

//calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} $`;

  const outcomes = acc.movements
    .filter(mov => mov <= 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${outcomes} $`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} $`;
};

//calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0]) // return the 1st letter
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  // display movements
  displayMovements(acc.movements);
  // display balance
  calcDisplayBalance(acc);
  // display summary
  calcDisplaySummary(acc);
};

// # 156 event handler for login
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // prevent form from sumitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  // optional chaining, error handling
  // this equales to currentAccount && currentAccount.pin === Number(inputLoginPin.value)
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // successfully login, desplay msg, update UI
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    //containerApp = document.querySelector('.app');
    containerApp.style.opacity = 100;
    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); //blur the focus

    updateUI(currentAccount);

    console.log('LOGIN');
  }
});

// # 157 transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); //prevent reloading
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(receiverAcc);

  // clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur(); //blur the focus

  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAccount.balance &&
    receiverAcc.username !== currentAccount.username
  ) {
    // transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // update ui
    updateUI(currentAccount);
  }
});

// 159 use some to do loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

// 158 findindex method - close account

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // .indexOf(23) can only find and return true and false.
    console.log(index);
    // delete account : remove from the array
    accounts.splice(index, 1);
    // logout
    containerApp.style.opacity = 0;
  }
});

/*
// # 162 More ways of creating and filling Arrays

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7);
// x.fill(1);
x.fill(1, 3, 5); // start from index 3, end to 5
console.log(x);

arr.fill(23, 4, 6);
console.log(arr);

// Array.from() dynamiclly create an array
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, index) => index + 1); // don't use cur at all
console.log(z);

const dice = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)); // don't use cur at all
console.log(dice);

// show the values in a node using querySelectorAll
document
  .querySelector('.balance__value')
  .addEventListener('click', function () {
    const movementsUI = Array.from(
      document.querySelectorAll('.movements__value'),
      el => Number(el.textContent.replace('$', ''))
    );
    console.log(movementsUI);

    const movementsUI2 = [...document.querySelectorAll('.movements__value')];
    console.log(movementsUI2);
  });

// # 161 Sorting Arrays

// .sort() method will mutate the Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// sort based on string
console.log(movements);
// console.log(movements.sort());

// Callback function
// Ascending order, small to large
// return < 0, A, B
// return > 0, B, A
movements.sort((a, b) => {
  return a > b ? 100 : -100;
});
// simple way
movements.sort((a, b) => a - b);
console.log(movements);

// Descending order, large to small
movements.sort((a, b) => {
  return a > b ? -100 : 100;
});
// simple way
movements.sort((a, b) => b - a);
console.log(movements);

// # 160 flat and flatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

// use depth
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// flat
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// flatMap
const overallBalance2 = accounts
  .flatMap(acc => acc.movements) // only 1 level deep
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);

//console.log(arrDeep.flatMap());

// # 159 some and every

// Using the include method to test if an array includes a certain value.
// EQUALITY
console.log(movements.includes(-130));

// some method, if there are any positive num in array
// SOME: CONDITION
console.log(movements.some(mov => mov === -130));

// EVERY:
console.log(movements.every(mov => mov < 100000));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

const curToUsd = 1.1;

// PIPELINE
const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * curToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositUSD);
*/

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

/*
// # 155 the find method
const firstWithdrawal = movements.find(mov => mov < 0); //find the 1st withdraw
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis'); // get the object
console.log(account);

// # 151 the Reduce Method
// accumulator -> snowball
// 2nd param is to set an initial value for the accumulator
const balance = movements.reduce(function (acc, cur, i, arr) {
  // console.log(`${i} and ${acc}`);
  return acc + cur;
}, 0);

// arrow function
const balance3 = movements.reduce((acc, cur) => acc + cur, 0);

console.log(balance);
console.log(balance3);

// compare with for-of loop
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Get the Maximum value

const max = movements.reduce(
  (acc, cur) => (acc > cur ? acc : cur),
  movements[0]
);
console.log(max);
*/
/*
//# 150 The Filter Method

// chain the things together
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
const withdraws = movements.filter(mov => mov < 0);
console.log(movements);
console.log(deposits);
console.log(withdraws);

const depositFor = [];
for (const mov of movements) if (mov > 0) depositFor.push(mov);
console.log(depositFor);
*/

//# 148 The Map Method
/*
const eurToUsd = 1.1;
// callback function is a new and modern way to doing it
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

// the for each and for of have side effects, loop one by one in each iteration.
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

// use map, the callback func, will return a new arry entirely after the loop
const movementsDes = movements.map(
  (mov, i) =>
    `movement ${i + 1}: you ${mov > 0 ? 'deposited' : 'withdraw'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDes);
*/

/////////////////////////////////////////////////

//# 141 Simple Array Method
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE, slice will not mutate the array
console.log(typeof arr);
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); // the end is not included here
console.log(arr.slice(-2)); // from the last two elements 倒数两个
console.log(arr.slice(-1)); // the last one
console.log(arr.slice(1, -2));
console.log(arr.slice()); // like spread
console.log([...arr]); // like spread

// SPLICE, splice does mutate the original array
// console.log(arr.splice(2));
arr.splice(-1);
arr.splice(1, 2);
console.log(arr);

// REVERSE, does mutate

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // mutate the original one
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - ')); // string

//# 142 For Each Loop

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// For Of
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  // get the counter variables
  if (movement > 0) {
    console.log(`movement ${i + 1} you deposited ${movement}`);
  } else {
    console.log(`movement ${i + 1} you withdrew ${Math.abs(movement)}`);
  }
}
console.log('------------------');
// For Each, the continue and break is not work
movements.forEach(function (movement, index, arr) {
  if (movement > 0) {
    console.log(`movement ${index + 1} you deposited ${movement}`);
  } else {
    console.log(`movement ${index + 1} you withdrew ${Math.abs(movement)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

//# 143 For Each Loop for Sets and Maps

// map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// set
const currenciesUnique = new Set(['USD', 'CNY', 'CBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
// underscore variable: a throwaway variable, a unnecessary variable.
*/
