# Post-Processing

## Post-Processing Effects

Post-processing effects are effects that are applied to the final image after all other rendering is complete. They are used to simulate effects that are too expensive to simulate in real-time, or to simulate effects that are not possible to simulate in real-time.

## Example: Bloom

Let's take the example of the Bloom effect. The bloom effect is an effect that simulates the light that is scattered by the lens of a camera. It is used to simulate the light that is scattered by very bright objects, like the sun or a light bulb.

First, you need to import the different classes you will need:

```js
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
```

The `EffectComposer` class is the main class of the post-processing library. It is used to chain different passes together. The `RenderPass` class is used to render the scene to a texture. The `UnrealBloomPass` class is used to apply the bloom effect. The `OutputPass` class is used to render the final image to the screen.

Then, you need to create an instance of each of these classes:

```js
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass({
    strength: 0.5,
    radius: 1,
    threshold: 0.1,
    exposure: 1
});
const outputPass = new OutputPass();
```

The `EffectComposer` class needs to know which renderer to use. The `RenderPass` class needs to know which scene and which camera to use. The `UnrealBloomPass` class has a few parameters that you can tweak to change the effect. The `OutputPass` class does not need any parameter.

Then, you need to add the passes to the composer:

```js
composer.addPass(renderPass);
composer.addPass(bloomPass);
composer.addPass(outputPass);
```

Finally, you need to replace the call to `renderer.render(scene, camera)` with a call to `composer.render()`:

```js
function animate() {
    requestAnimationFrame(animate);
    composer.render();
}
animate();
```

### Complete example

```js
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({canvas: canvas,antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true })
);
scene.add(sphere);

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass({
    strength: 0.5,
    radius: 1,
    threshold: 0.1,
    exposure: 1
});
const outputPass = new OutputPass();

composer.addPass(renderPass);
composer.addPass(bloomPass);
composer.addPass(outputPass);

function animate() {
    requestAnimationFrame(animate);
    composer.render();
}
animate();
```

![Bloom Effect](./images/bloom-effect.png)
