## First Class Functions vs Higher Order FUnctions

### First Class Functions (原子函数)

- JS treats functions as first-class citizens
- This mean that functions are simply values
- Functions are just another 'type' of object

so you can do:

1. Store functions in variables or properties
2. Pass functions as arguments to OTHER functions
3. Return functions FROM functions
4. Call methods on functions

### Higher Order Functions

- A function that receives another function as an argument, that returns a new function, or both.
- This is only possible because of first-class functions

1. Function that receives another function (callback function, called later by higher order function)
2. Function that returns new function

![functions](https://imgbed-bucket-1251971143.cos.ap-guangzhou.myqcloud.com/./1613756036726-functions.png)

### Closures

![closure](https://imgbed-bucket-1251971143.cos.ap-guangzhou.myqcloud.com/./1614514017769-closure.jpeg)

Summary

- A closure is the closed-over `variable environment` of the execution context `in which a function was created`, even `after` that execution context is gone.

- A closure gives a funcion access to all the variables `of its parent function`, even `after` that parent function has returned. The function keeps a `reference` to its outer scope, which `preserves` the scope chain throughout time.

- A closure makes sure that a function doesn't loose connection to `variables that existed at the function's birth place.`

- A closure is like a `backpack` that a function carries around wherever it goes. This backpack has all the `variables that were present in the environment where the function was created.`

> Do not maunally create clusures, it's a JS feature that happens automatically. Can't even access closed-over variables explicitly. A closure is NOT a tangible JS object.

```js
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
```
