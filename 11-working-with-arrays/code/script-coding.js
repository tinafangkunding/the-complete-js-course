'use strict';

// # code - 4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1,
const recFoods = function (dogs) {
  dogs.forEach(function (dog) {
    dog.recFood = Math.trunc(dog.weight ** 0.75 * 28);
  });
};
recFoods(dogs);
console.log(dogs);

//2,
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah.curFood > dogSarah.recFood ? true : false);

//3,
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .map(dog => dog.owners)
  .flat();
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

//4,
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too much`);

//5,
console.log(dogs.some(dog => dog.curFood === dog.recFood));

//6,
const checkEatingOkay = dog =>
  dog.curFood < dog.recFood * 1.1 && dog.curFood > dog.recFood * 0.9;

console.log(dogs.some(checkEatingOkay));

//7,
console.log(dogs.filter(checkEatingOkay));

//8,

const dogsCopy1 = dogs.map(dog => dog.recFood).sort();
console.log(dogsCopy1);

const dogsCopy2 = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsCopy2);

// console.log(recFooda);
// # code - 1

/*
// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

const dogsJulia = [9, 16, 6, 8, 3];
const dogsKate = [10, 5, 6, 1, 4];

const newDogsJulia = dogsJulia.slice(1, 3);

console.log(newDogsJulia);
console.log(dogsJulia);

const dogs = newDogsJulia.concat(dogsKate);
console.log(dogs);

const checkDogs = function (dogs) {
  dogs.forEach(function (dog, i) {
    dog >= 3
      ? console.log(`Dog num ${i + 1} is an adult, and is ${dog} years old`)
      : console.log(`Dog num ${i + 1} is a puppy`);
  });
};

checkDogs(dogs);


// # code - 2

//const ages = [5, 2, 4, 1, 15, 8, 3];
//const ages = [16,6,10,5,6,1,4];

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(function (age) {
    if (age <= 2) return 2 * age;
    else if (age > 2) return 16 + 4 * age;
  });

  console.log(humanAges);

  const puppyDog = humanAges.filter(age => age >= 18);

  console.log(puppyDog);

  const avgAge =
    puppyDog.reduce(function (acc, age) {
      return acc + age;
    }, 0) / puppyDog.length;

  return avgAge;
  // console.log(avgAge);
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);

// # code - 3

const calcAverageHumanAge2 = function (ages) {
  const avgAge = ages
    .map(age => (age <= 2 ? 2 * age : 16 + 4 * age))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

  return avgAge;
};

const avg3 = calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
const avg4 = calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);

console.log(avg3, avg4);

*/
