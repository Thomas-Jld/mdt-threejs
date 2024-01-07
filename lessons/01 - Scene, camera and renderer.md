# Scene, camera and renderer

## Scene

In Three.js, a scene is a container that will hold all the objects you want to display. You can create a scene using the following code:

```js
const scene = new THREE.Scene();
```

This will create a scene that you can use to add objects to it, using the `add` method:

```js
scene.add(object);
```

## Camera

The camera is the object that will define what you will see in your scene, and how you see it. There are different types of cameras, but the most common one is the `PerspectiveCamera`.

### Perspective Camera

The perspective camera mimics the way the eyes work by creating a field of view, which creates a sense of the distance of the objects to the camera. You can create a perspective camera using the following code:

```js
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
```

The `fov` parameter is the field of view, which is the angle of the camera's view. The `aspect` parameter is the aspect ratio, which is the ratio between the width and the height of the camera's view. This should match the aspect ratio of the canvas. The `near` parameter is the distance from the camera to the closest object that will be rendered. The `far` parameter is the distance from the camera to the farthest object that will be rendered.

Example:

```js
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
```

The default position of the camera is `(0, 0, 0)`, which means that the camera is at the center of the scene. You can change the position of the camera using the following code:

```js
camera.position.set(x, y, z);
```

Camera types examples:

- [Perspective vs Orthographic Camera](https://threejs.org/examples/#webgl_camera)
- [Camera array](https://threejs.org/examples/#webgl_camera_array)
- [Cinematic camera](https://threejs.org/examples/#webgl_camera_cinematic)

### Camera controls

You can use the `OrbitControls` to control the camera using the mouse. You can import it using the following code:

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
```

You can then create the controls using the following code:

```js
const controls = new OrbitControls(camera, canvas);
```

Some of the controls can be changed depending on your needs:

```js
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.enableZoom = false;
...
```

## Renderer

The renderer is the object that will render the scene and the camera. By default, the

If you have already created a canvas element in your HTML file, use:

```js
// Fetch the canvas element created in index.html, replace 'canvas' with the id of your canvas
const canvas = document.getElementById('canvas');

// Create a WebGLRenderer and set its width and height
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // Antialiasing is used to smooth the edges of what is rendered
    antialias: true,
    // Activate the support of transparency
    alpha: true
});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
```

If not, use

```js
// Create a WebGLRenderer and set its width and height
const renderer = new THREE.WebGLRenderer({
    // Antialiasing is used to smooth the edges of what is rendered
    antialias: true,
    // Activate the support of transparency
    alpha: true
});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
```

### Post-processing

Some effects can be added to the renderer to change the way the scene is rendered. For example, you can add a [bloom effect](https://threejs.org/examples/webgl_postprocessing_unreal_bloom.html)


## Handling the window resize

When the window is resized, the size of the renderer needs to be updated, as well as the aspect ratio of the camera. You can do this using the following code:

```js
window.addEventListener('resize', () => {
    // Update the camera
    camera.aspect =  window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});
```


## Animation loop

The animation loop is the function that will be called every frame. It will update the scene and the camera, and render the scene. You can create the animation loop using the following code:

```js
const animate = () => {
    // Call animate recursively
    requestAnimationFrame(animate);

    // Update the controls
    controls.update();

    // Render the scene
    renderer.render(scene, camera);
}

// Call animate for the first time
animate();
```


## Example

In `script.js`:

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50);

// Import the canvas element
const canvas = document.getElementById('canvas');

// Create a WebGLRenderer and set its width and height
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // Antialiasing is used to smooth the edges of what is rendered
    antialias: true,
    // Activate the support of transparency
    alpha: true
});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );

// Create the controls
const controls = new OrbitControls(camera, canvas);

// Handle the window resize event
window.addEventListener('resize', () => {
    // Update the camera
    camera.aspect =  window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});

// Create the animation loop
const animate = () => {
    // Call animate recursively
    requestAnimationFrame(animate);

    // Update the controls
    controls.update();

    // Render the scene
    renderer.render(scene, camera);
}

// Call animate for the first time
animate();
```


Next, [geometries, materials and lights](<./02 - Geometries, materials and lights.md>)
