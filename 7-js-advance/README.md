## How JS work beind the scenes

[TOC]

### 89 An high-level overview of JS

Javascript is a high-level, object-orientd, multi-paradigm programming language.

features:

- high-level
- garbage-collected
- interpreted or just-in-time compiled
- multi-paradigm
- prototype-based object-oriented
- first class functions
- dynamic
- single-threaded
- non-blocking event loop

- multi-paradigm means:

1. procedual programming
2. object-oriented programming OOP
3. functional programming FP

- dynamically-typed language

No data type definitions. Types becomes known at runtime
Data type of variables is automatically changed.

```js
let x = 23;
x = "hihi";
```

if you want to use js with strongly type, then look into TypeScript.

- for the single-thread and non-blocking event loop.

![js-event-loop](https://imgbed-bucket-1251971143.cos.ap-guangzhou.myqcloud.com/./1611986899194-js-advance.jpeg)

### 90 The JS Engine and Runtime

JS Engine : program that executes JS code.

Every browser has a js engine, the most famous one is Google Chrome V8 Engine --- Node.js , can use Node.js to build server side applications.

![js-engine](https://imgbed-bucket-1251971143.cos.ap-guangzhou.myqcloud.com/./1611987600403-js-engine.png)

![just-in-time-engine](https://imgbed-bucket-1251971143.cos.ap-guangzhou.myqcloud.com/./1612016740331-just-in-time-engine.png)

![js-runtime](https://imgbed-bucket-1251971143.cos.ap-guangzhou.myqcloud.com/./1612016582575-js-runtime.jpeg)

### 91 Execution Context and the Call Stack

- What's inside execution context?

1. Variable environment
   - `let`,`const` and `var` declarations.
   - Functions
   - `arguments` object (NOT in arrow functions)
2. Scope Chain
3. `this` keyword (NOT in arrow functions)

> Generated during "creation phase", right before execution

![call-stack](https://imgbed-bucket-1251971143.cos.ap-guangzhou.myqcloud.com/./1612017710326-call-stack.png)

//nutshell 简而言之

### 92 Scope and Scope Chain

**Concepts:**

1. scoping: how our program's variables are organized and accessed.

2. Lexical scoping: Scoping is controlled by **placenment** of functions and blocks in the code

3. Scope: Space or environment in which a certain variable is decalred. There is global scope, function scope and block scope.

4. Scope of a variable: Region of our code where a certain variable can be accessed.

**Note: the let and const are block-scoped; and the var is function-scoped.**

![3-type-of-scope](https://imgbed-bucket-1251971143.cos.ap-guangzhou.myqcloud.com/./1612019288906-3typeofscope.png)

![the scope chain](https://imgbed-bucket-1251971143.cos.ap-guangzhou.myqcloud.com/./1612019906644-the-scope-chain.png)

**Note: the scope chain order in which functions are written in the code, and has nothing todo with order in which functions were called.**

### 94 Variable Environment: Hoisting and The TDZ

Hoisting

![hoisting](https://imgbed-bucket-1251971143.cos.ap-guangzhou.myqcloud.com/./1612026321351-hoisting.jpeg)

![tdz](https://imgbed-bucket-1251971143.cos.ap-guangzhou.myqcloud.com/./1612026583721-tdz.png)

### 96 The this Keyword

`this` keyword/variable: Special variable that is created for every execution context(every function). Takes the value of (points to) the "owner" of the funcion in which the `this` keyword is used.

`this` is NOT static. It depends on how the function is called, and its value is only assigned when the function is actually called.

Called by four ways:

1. Method ---> this = <Object that is calling the method.>
2. Simple function call ---> this = undefined (only in strict mode, or it will call the window object in the browser)
3. Arrow functions ---> this = <this of surrounding function (lexical this)>
4. Event listener ---> this = <DOM element that the handler is attached to>

> Arrow functions do not get it's own `this` keyword.

> `this` does NOT point to the function itself, and also NOT the its variable environment.

```js
// in this case, this means "jonas", this.year === 1989
const jonas = {
  name: "jonas",
  year: 1989,
  calcAge: function () {
    return 2037 - this.year;
  },
};
jonas.calcAge();
```

### 99 Primitives vs Objects (Primitive and reference types)

![primitive](https://imgbed-bucket-1251971143.cos.ap-guangzhou.myqcloud.com/./1612284679609-primitive.png)

![primitive](https://imgbed-bucket-1251971143.cos.ap-guangzhou.myqcloud.com/./1612285151781-primitive-and-reference.png)

```js
// primitive types
let lastName = "will";
let olaLastName = lastName;
lastName = "dave";

console.log(lastName, olaLastName);

// reference types
const jessica = {
  firstName: "jessica",
  lastName: "will",
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = "dave";
console.log("Before marriage:", jessica);
console.log("After marriage:", marriedJessica);

// copying objects, object.assign
const jessica2 = {
  firstName: "jessica",
  lastName: "will",
  age: 27,
  family: ["alice", "bob"],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = "dave";
console.log("Before marriage:", jessica2);
console.log("After marriage:", jessicaCopy);

/* but the object assign only create a shallow copy, 
cannot in deep clone. only in the 1st level. 
cannot help with object in object.*/

// here is an example of object in object
jessicaCopy.family.push("dave");
jessicaCopy.family.push("john");

console.log("Before marriage:", jessica2);
console.log("After marriage:", jessicaCopy);
```

how js work for later:

1. prototypal inheritance --- OOP Object Oriented Programming with JS
2. Event Loop --- Asynchronous JS: Promises, Async/Await and AJAX
3. How the DOM Really works --- advanced DOM and Events
