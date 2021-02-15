'use strict';

/* destructuring arrays

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// destructuring arrays
const [x, y, z] = arr;

// use a null var to skip elements in the middle
let [main, , third] = restaurant.categories;

console.log(main, third);

// use destructuring to switch 2 values

// the old solution

// const temp = main;
// main = third;
// third = temp;

// the destructuring solution
// switching variables
[main, third] = [third, main];
console.log(main, third);

// receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// nested: destructuring inside destructuring
const nested = [2, 4, [5, 6]];

// const [i, , j] = nested;
const [i, , [j, k]] = nested;
console.log(i, j, k);

// set default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/

/*
//destructuring object
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // destructuring right here
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      this.starterMenu[starterIndex],
      this.mainMenu[mainIndex],
      address,
      time
    );
  },
};
// pass one object in a function
restaurant.orderDelivery({
  time: '22:30',
  address: 'geylang singapore',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'geylang singapore',
  starterIndex: 2,
});

// destructuring object is very useful in API calling
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// give them new variable names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

// set default menu
const { menu = [], starterMenu: starters = [] } = restaurant;

console.log(menu, starters);

// mutating variables
// overwrite the initial variables
let a = 111;
let b = 999;

const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b);

// nested objects
const {
  sat: { open: o, close: c },
} = openingHours;

console.log(o, c);


// # 105 spread operator

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

// this will put the entire array in the array, nested array
const newArr1 = [1, 2, arr];

// put all the values out of the array
const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);
*/

/*
const newMenu = [...restaurant.mainMenu, 'hotpot', 'bento'];
console.log(newMenu);

// create shallew copies of arraies
const mainMenuCopy = [...restaurant.mainMenu];

// merge two arraies together : join 2 arrays
const menu = [...restaurant.mainMenu] + [...restaurant.starterMenu]; // become one string
const menu1 = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);
console.log(menu1);

// the spread operator works on all iterables
// which means arrays, strings, maps, sets NOT objects

// the spread operator used in string
// separate them to individual letters
const str = 'tina';
const str2 = 'kim';
const newStr = [...str, ...str2];

console.log(newStr);
console.log(...str); // it can work
// console.log(`${...str} hsh`); // this cannot work

//prompt can be pop up to the window
const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3?'),
]; //
//console.log(ingredients);

//restaurant.orderPasta(ingredients);
//restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

restaurant.orderPasta(...ingredients);

// for object
const newRestaurant = { ...restaurant, founder: 'tina' };

console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Rina sss'; // change the var in tha copy object

console.log(restaurantCopy);

// #106 rest pattern and parameters

// 1) Destructuring

// SPREAD, because on RIGHT side of the =
const arrs = [1, 2, ...[3, 4]];

// REST, because on LEFT side of the =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , resotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, resotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;

console.log(weekdays);

// 2) Functions

// pack numbers into an array
const add = function (...numbers) {
  //console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(5, 6, 7, 6, 2, 1);

const x = [23, 2, 6];
add(...x);

// then the function can accept both arrays and numbers

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms'); // will get an empty array.
*/

/*
// 107 Short Circuiting (&& and ||)

// They can use ANY data type, return ANY data type,
// OR short-circuiting : if the first value is a truth value, it will immediately return the first value.
console.log(3 || 'tina'); //3
console.log('' || 'tina'); //tina
console.log(true || 0); //true
console.log(undefined || null); //null

console.log(undefined || 0 || '' || 'hello' || 23 || null); //hello

// setting default value with OR short circuiting
restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('----- AND -----');
// AND short-circuiting : if the first value is a falsy value, it will immediately return the first value.
console.log(0 && 'tina'); //0
console.log(7 && 'tina'); //tina

console.log('hello' && 23 && null && 'tina'); //null

// replace if using AND short-circuiting
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// #108 The Nullish Coalescing Operator (??)

//restaurant.numGuests = 0;

const guests = restaurant.numGuests || 10;
console.log(guests);

// nullish values instead of falsy values.
// nullish : null and undefined (NOT 0 or '') 条件更严格了，只有 null 和 undefined 才算是 false
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);
*/

/*
// #110 new way to loop array in ES6 syntax -- for-of loop

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for-of loop, continue to use break and continue
for (const item of menu) console.log(item);

// for-of loop how to get index of array
// in that case, item is arraies of [num, value]
for (const item of menu.entries()) {
  console.log(`${item[0] + 1}:${item[1]}`);
}
// a new way to show this, to de-structure the item array
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}:${el}`);
}
*/

/* here is the sample output
1:Focaccia
2:Bruschetta
3:Garlic Bread
4:Caprese Salad
5:Pizza
6:Pasta
7:Risotto

// #112 Optional Chaining - ES2020's new feaure
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// WITH optional chaining
// only if restaurant.openingHours.mon exist, then it will execute the open function, or return the undefined.
console.log(restaurant.openingHours.fri?.open);
console.log(restaurant.openingHours?.mon?.open);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const i of days) {
  // because zero is a falsy value, so not use ||, use ?? nullish operator.
  // const open = restaurant.openingHours[i]?.open || 'closed';
  const open = restaurant.openingHours[i]?.open ?? 'closed';
  console.log(`On ${i}, we open at ${open}`);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? 'method does not exist');
console.log(restaurant.orderNotexist?.(0, 1) ?? 'method does not exist');

// Array
const users = [{ name: 'tina', email: 'hello@tina.com' }];
const users = [];

console.log(users[0]?.name ?? 'user array empty');


const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  // 3. ES6 enhanced : use expression and calculation
  [weekdays[2 + 2]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // 1. ES6 enhanced object literials !!
  openingHours,
  // 2. ES6 enhanced, don't need to specify the function
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  // destructuring right here
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      this.starterMenu[starterIndex],
      this.mainMenu[mainIndex],
      address,
      time
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`here is your food ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// #113 Looping Objects Object Keys, values and Entries

// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `we are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day},`;
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire Object --- entries : name + values together
const entries = Object.entries(openingHours);
console.log(entries);

// use entries to loop the object
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} abd close at ${close}.`);
}

// # 115 sets in ES6

// a set is a collection of unique values. can never have duplicates
// set is different from array, 1. unique value 2. the sort of elements in the set is irrelevant
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);

console.log(ordersSet);

// size, has, add and clear methods
console.log(new Set('Tina')); //string is also iterables
console.log(ordersSet.size); // uniques types
console.log(ordersSet.has('Pizza')); // true or false
console.log(ordersSet.add('Bread')); // add value to a set
ordersSet.delete('Bread'); // add value to a set
console.log(ordersSet);
// ordersSet.clear();
// console.log(ordersSet);

for (const order of ordersSet) console.log(order);

// example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const setStaff = new Set(staff);
console.log([...setStaff]); // destructure

console.log(setStaff.size);

console.log(new Set('Tinafangandkimshu').size); // show how many different letters here

// # 116 map in ES6
// a map is used to map keys, big difference between map and object is keys can have any type in maps

const rest = new Map();

rest.set('name', 'Pizza');
rest.set(1, '11 lor 39 Geylang');
console.log(rest.set(2, '19 Mount Sophia'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'we are open')
  .set(false, 'we are closed');
console.log(rest);

console.log(rest.get('name'));
console.log(rest.get(false));
console.log(rest.get(2));

const time = 8;
const isOpen = rest.get(time > rest.get('open') && time < rest.get('close'));
console.log('the result is :' + isOpen);

console.log(rest.has('categories'));
rest.delete(2);
// rest.clear();
console.log(rest);
console.log(rest.size);

const arr = [1, 2];
rest.set(arr, 'Test');
rest.set(document.querySelector('h1'), 'Heading');

console.log(rest);
console.log(rest.size);

console.log(rest.get(arr));
// console.log(rest.get([1, 2])); // cannot work
*/

// # 117 Maps: Iteration

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  // 3. ES6 enhanced : use expression and calculation
  [weekdays[2 + 2]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // 1. ES6 enhanced object literials !!
  openingHours,
  // 2. ES6 enhanced, don't need to specify the function
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  // destructuring right here
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      this.starterMenu[starterIndex],
      this.mainMenu[mainIndex],
      address,
      time
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`here is your food ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

const question = new Map([
  ['question', 'what is the best programming language in the world?'],
  [1, 'C++'],
  [2, 'Java'],
  [3, 'JS'],
  ['correct', 3],
  [true, 'you r correct!'],
  [false, 'try again!'],
]);

console.log(question);

// convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//Quiz
console.log(question.get('question'));
// for loop of Maps
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(key, value);
}

// console.log(prompt('pls select a num of the answer:'));
// console.log(question.get('correct'));

// const answer = question.get(
//   Number(prompt('pls select a num of the answer:')) === question.get('correct')
// );
// console.log(answer);

// convert map to array
console.log([...question]);
console.log([questions.keys()]);
console.log([questions.values()]);
