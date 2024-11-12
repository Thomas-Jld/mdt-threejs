# Object Manipulations and Animations

## Transformations

Objects in Three.js can be manipulated using transformations such as translation, rotation, and scaling. These transformations are applied to the object's local coordinate system.

### Translation

Translation refers to moving an object along the x, y, or z-axis. This can be achieved using the `position` property of an object.

```js
// Translate an object 5 units along the x-axis
object.position.x = 5;

// Translate an object 10 units along the negative z-axis
object.position.z = -10;
```

### Rotation

Rotation refers to turning an object around the x, y, or z-axis. This can be achieved using the `rotation` property of an object. Rotations are measured in radians.

```js
// Rotate an object 45 degrees around the y-axis
object.rotation.y = Math.PI / 4;

// Rotate an object 90 degrees around the z-axis
object.rotation.z = Math.PI / 2;
```

You can also use the rotateX, rotateY, and rotateZ methods to rotate an object around a specific axis.

```js
// Rotate an object 30 degrees around the x-axis
object.rotateX(Math.PI / 6);
```

### Scaling

Scaling refers to changing the size of an object along the x, y, or z-axis. This can be achieved using the `scale` property of an object.

```js
// Scale an object by a factor of 2 along the x-axis
object.scale.x = 2;

// Scale an object by a factor of 0.5 along all axes
object.scale.set(0.5, 0.5, 0.5);
```

## Animation

Animation involves changing an object's properties over time to create movement and dynamic effects. There are various ways to animate objects in Three.js.

### Using the animate function

The `requestAnimationFrame` function allows you to create animations by repeatedly updating the scene and rendering it. This function synchronizes your animation with the browser's refresh rate, resulting in smooth animations. You can update object properties inside the `animate` function to create movement.

```js
function animate() {
  requestAnimationFrame(animate);

  // Update object properties here, e.g., rotate an object
  object.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
```

### Using Tween.js

Tween.js is a library that simplifies the creation of animations by providing methods for interpolating values over time. You can define starting and ending values for different properties and Tween.js will handle the smooth transition between them.

First, import Tween.js into your project using a CDN or a package manager like npm or yarn.
```js
import * as TWEEN from 'https://unpkg.com/@tweenjs/tween.js@25.0.0/dist/tween.esm.js'
```

Then, create a new tween for an object's property, specify the end result (here target position), duration, easing function, and callbacks for update and completion.

```js
// Create a new tween for the object's position
const tween = new TWEEN.Tween(object.position)
  .to({ x: 10, y: 5, z: 2 }, 1000) // Target position and duration
  .easing(TWEEN.Easing.Cubic.InOut) // Easing function
  .onStart(() => {
    // Called when the tween starts
    console.log('Tween started');
  })
  .onUpdate(() => {
    // Called on each update
    console.log('Tween updated');
  })
  .onComplete(() => {
    // Called when the tween is complete
    console.log('Tween complete');
  })
  .start();
```

Call the `update` method in the animation loop to update the tweens.

```js
// Update tweens in the animation loop
function animate() {
  requestAnimationFrame(animate);

  tween.update();

  renderer.render(scene, camera);
}
```

Find more information about Tween.js [here](https://github.com/tweenjs/tween.js/blob/HEAD/docs/user_guide.md)

### Animation with `AnimationMixer` and `AnimationClip`

Three.js provides built-in support for keyframe animations using `AnimationMixer` and `AnimationClip`. `AnimationClip` defines the animation data, including keyframes and tracks, while `AnimationMixer` controls the playback of the animation.

Example of AnimationMixer and AnimationClip usage to play the first animation clip of a loaded model:
```js
let mixer;

// Load a model with animations
loader.load('./model.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);
  // Get the animation clips from the model
  const animations = gltf.animations;

  // Create an AnimationMixer
  mixer = new THREE.AnimationMixer(model);

  // Create an AnimationAction for each clip
  const actions = animations.map((clip) => mixer.clipAction(clip));

  // Play the first animation
  actions[0].play();
});
```
Update the mixer in the animation loop to see the animation in action.
```js
const clock = new THREE.Clock();

function animate() {
  ...
  mixer.update(clock.getDelta());
  ...
}
```

Next, [debugging](<./04 - Debugging.md>).
