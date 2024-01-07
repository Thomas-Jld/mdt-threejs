# JS cheat sheet

## Table of contents

- [JS cheat sheet](#js-cheat-sheet)
  - [Table of contents](#table-of-contents)
  - [Variables](#variables)
  - [Functions](#functions)
  - [Classes](#classes)
  - [Loops](#loops)
  - [Conditional statements](#conditional-statements)
  - [Arrays](#arrays)
  - [Objects](#objects)
  - [Importing and exporting](#importing-and-exporting)
  - [Events](#events)

## Variables

**`let`** defines a **block scoped variable**: it is only defined within the enclosing brackets`{ }` it was created in. (i.e. the brackets of a function, a loop, an if statement, etc.)
```js
let myVariable = 10;
```

**`const`** defines a **constant**, it cannot be changed. It is also block scoped.
```js
const myVariable = 10;
```

**Considered obsolete**, **`var`** defines a **function scoped variable**.
```js
var myVariable = 10;
```


## Functions

Creating a **basic function** declaration

```js
function myFunction() {
    console.log("myFunction() called");
}

myFunction();
```

Creating an **arrow function**. Arrow functions are a shorthand way of writing functions

```js
const myFunction = () => {
    console.log("myFunction() called");
}

myFunction();
```

## Classes

**Creating a class**

```js
class MyClass {
    constructor(myVariable) {
        this.myVariable = myVariable;
    }

    myFunction() {
        console.log("myFunction() inside MyClass called");
    }
}

const myObject = new MyClass(10);
myObject.myFunction();
```

## Loops

**For** loop

```js
for (let i = 0; i < 10; i++) {
    console.log(i);
}
```

**While** loop

```js
let i = 0;
while (i < 10) {
    console.log(i);
    i++;
}
```

## Conditional statements

```js
if (condition) {
    console.log("Condition is true");
} else if (otherCondition) {
    console.log("Other condition is true");
} else {
    console.log("Neither conditions are true");
}
```

**Ternary operator**

```js
const myVariable = (condition) ? valueIfTrue : valueIfFalse;
```

This allows you to assign a value to a variable depending on a condition. It is equivalent to:

```js
let myVariable;
if (condition) {
    myVariable = valueIfTrue;
} else {
    myVariable = valueIfFalse;
}
```

## Arrays

**Creating an array**

```js
const myArray = [];
```

or

```js
const myArray = new Array();
```

**Adding an element to the end of an array**

```js
myArray.push(element);
```

**Removing the last element of an array**

```js
myArray.pop();
```

**Adding an element to the beginning of an array**

```js
myArray.unshift(element);
```

**Removing the first element of an array**

```js
myArray.shift();
```

**Removing an element from an array**

```js
myArray.splice(index, 1);
```

**Getting the length of an array**

```js
let len = myArray.length;
```

**Getting an element from an array**

```js
let el = myArray[index];
```

**Looping through an array**

```js
for (let i = 0; i < myArray.length; i++) {
    console.log(myArray[i]);
}
```

**Looping through an array using a for...of loop**

```js
for (const element of myArray) {
    console.log(element);
}
```

**Looping through an array using a for...of loop with an index**

```js
for (const [index, element] of myArray.entries()) {
    console.log(element, index);
}
```

**Looping through an array using a forEach loop**

```js
myArray.forEach(element => {
    console.log(element);
});
```

**Looping through an array using a forEach loop with an index**

```js
myArray.forEach((element, index) => {
    console.log(element, index);
});
```


## Objects

**Creating an object**

```js
const myObject = {};
```

**Adding a property to an object**

```js
myObject.myProperty = value;
```

**Removing a property from an object**

```js
delete myObject.myProperty;
```

**Getting a property from an object**

```js
let value = myObject.myProperty;
```

**Looping through an object**

```js
for (const key in myObject) {
    console.log(key, myObject[key]);
}
```

## Importing and exporting

**Exporting one element**

```js
export default myFunction;
```

**Importing one element**

```js
import myFunction from './myFile.js';
```

**Exporting multiple elements**

```js
export { myFunction, myVariable };
```

**Importing multiple elements**

```js
import { myFunction, myVariable } from './myFile.js';
```

**Exporting everything**

```js
export * from './myFile.js';
```

**Importing everything**

```js
import * as myFile from './myFile.js';
```

## Events

**Adding an event listener**

```js
element.addEventListener('click', myFunction);
```

**Removing an event listener**

```js
element.removeEventListener('click', myFunction);
```

**Global events**

```js
window.addEventListener('resize', () => {console.log('Window resized')});
window.addEventListener('keydown', (event) => {console.log('Key pressed: ' + event)});
window.addEventListener('keyup', (event) => {console.log('Key released: ' + event)});
window.addEventListener('wheel', (event) => {console.log('Mouse wheel moved: ' + event.deltaY)});
window.addEventListener('contextmenu', (event) => {console.log('Context menu opened')});
window.addEventListener('pointerdown', (event) => {console.log('Pointer pressed')});
window.addEventListener('pointerup', (event) => {console.log('Pointer released')});
window.addEventListener('pointermove', (event) => {console.log('Pointer moved')});
```
