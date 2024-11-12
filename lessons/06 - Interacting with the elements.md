# Interacting with the elements

In this lesson, we will learn how to interact with the elements of the scene. Multiple types of interactions are possible, and we will see how to implement them.

## Buttons

The simplest way to interact with the scene is to add buttons to the page.

In `index.html`, add a button with an id:

```html
<button id="myButton">Click me</button>
```

And in `script.js`, add an event listener to the button:

```js
const button = document.getElementById('myButton');
button.addEventListener('click', () => {
  console.log('The user clicked on the button');
});
```

## Events

Events are a way to trigger a function when something happens. For example, you can trigger a function when the user clicks on an element, or when the mouse moves over an element.

### Pointer events

Pointer events are events that are triggered when the user interacts with the page using a pointer device (mouse, touch screen, etc.). The most common pointer events are:

- `pointerdown`: triggered when the user presses on the window
- `pointerup`: triggered when the user releases the window
- `pointermove`: triggered when the user moves the pointer over the window
- `pointerenter`: triggered when the pointer enters the window
- `pointerleave`: triggered when the pointer leaves the window

To use one of these events, you need to add an event listener to the window, specifying the name of the event and the function to call when the event is triggered.

```js
window.addEventListener('pointerdown', () => {
  console.log('The user started pressing on the window');
});
```

You can also get the position of the pointer when the event is triggered using the `clientX` and `clientY` properties of the event.

```js
window.addEventListener('pointerdown', (event) => {
  console.log(`The user pressed the pointer at ${event.clientX}, ${event.clientY}`);
});
```

### Keyboard events

Keyboard events are events that are triggered when the user interacts with the page using the keyboard. The most common keyboard events are:

- `keydown`: triggered when the user presses a key
- `keyup`: triggered when the user releases a key
- `keypress`: triggered when the user presses a key and it is not a modifier key (shift, ctrl, alt, etc.)

```js
window.addEventListener('keydown', () => {
  console.log('The user started pressing a key');
});
```

You can also get the key that was pressed using the `key` property of the event.

```js
window.addEventListener('keydown', (event) => {
  console.log(`The user pressed the ${event.key} key`);
});
```

### Example

```js
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); camera.position.set(0, 0, 5);
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({canvas: canvas,antialias: true}); renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true })
); scene.add(sphere);



window.addEventListener('keydown', (key) => {
    if (key.key === 'Enter') {
        sphere.material.opacity = 0.5;
    }
});

window.addEventListener('keyup', (key) => {
    if (key.key === 'Enter') {
        sphere.material.opacity = 1;
    }
});



function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
```


## Raycasting

Raycasting is a technique that allows you to find which element of the scene is under the pointer. It is often used to implement interactions with the scene.

### Pointer position

To use raycasting, you need to know the position of the pointer in the scene. To get the position of the pointer, you can listen to the `pointermove` event on the window and store the position of the pointer in a variable.

By default, the position of the pointer is given in pixels. To use the position of the pointer in the scene, you need to convert each coordinate to a value between -1 and 1.

```js
let pointerPosition = { x: 0, y: 0 };

window.addEventListener('pointermove', (event) => {
    pointerPosition.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointerPosition.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
});
```

### Raycaster

To use raycasting, you need to create a raycaster. A raycaster is an object that will cast a ray from a point in a direction and return the objects that are intersected by the ray.

To create a raycaster, you need to specify the origin of the ray and the direction of the ray. The origin of the ray is the position of the pointer in the scene, and the direction of the ray is the direction of the camera.

```js
const raycaster = new THREE.Raycaster();
```

Each time you want to use the raycaster, you need to update the origin and the direction of the raycaster.

```js
raycaster.setFromCamera(pointerPosition, camera);
```

### Intersecting a single object

To find the object that is intersected by the ray, you can use the `intersectObject` method of the raycaster. This method takes two parameters: the object to test and a boolean that indicates if the method should test the descendants of the object.

```js
const intersects = raycaster.intersectObject(myObject, true);

if (intersects.length > 0) {
  console.log('The ray intersects the object', intersects[0]);
}
```

### Intersecting multiple objects

To find the objects that are intersected by the ray, you can use the `intersectObjects` method of the raycaster. This method takes two parameters: the array of objects to test and a boolean that indicates if the method should test the descendants of the objects.

```js
const intersects = raycaster.intersectObjects(myObjects, false);

if (intersects.length > 0) {
    for (const intersect of intersects) {
        console.log('The ray intersects the object', intersect.object);
    }
}
```

### Example

```js
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true })
);
scene.add(sphere);

const raycaster = new THREE.Raycaster();
let pointerPosition = { x: 0, y: 0 };
window.addEventListener('pointermove', (event) => {
    pointerPosition.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointerPosition.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);
    raycaster.setFromCamera(pointerPosition, camera);
    const intersects = raycaster.intersectObject(sphere);
    if (intersects.length > 0) {
        sphere.material.opacity = 0.5;
    } else {
        sphere.material.opacity = 1;
    }
    renderer.render(scene, camera);
}

animate();
```

Next, [post-processing effects](<./07 - Post-processing effects.md>).
