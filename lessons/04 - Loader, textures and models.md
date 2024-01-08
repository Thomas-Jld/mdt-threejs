# Loader, textures and models

## Textures

Textures are images that are applied in different ways to the surface of a mesh. They can be used to change the color of a mesh, to displace the vertices of a mesh, to change the way light interacts with a mesh, etc.

### Loading a texture

Textures can be loaded using the `TextureLoader` class.

```js
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./texture.jpg');
```

The loading won't be instantaneous, and will be done asynchronously. This means that you will need to wait for the texture to be loaded before using it. You can do this by passing a callback function to the `load` method.

```js
const textureLoader = new THREE.TextureLoader();
textureLoader.load('./texture.jpg', (texture) => {
    // Use texture here
});
```

If you use the textures for materials, you can use the loader without a callback function, as the material will wait for the texture to be loaded and will update itself automatically.

```js
const textureLoader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load('./texture.jpg'),
});
```

### Texture maps

There are different types of texture maps that can be used to change the way a material looks.

#### Color map

The color map is the most common type of texture map. It is used to change the color of the material.

```js
const material = new THREE.MeshStandardMaterial({
    map: textureLoader.load('./texture.jpg'),
});
```

#### Normal map

The normal map is used to change the way light interacts with the material. It is used to create the illusion of depth on a flat surface.

```js
const material = new THREE.MeshPhongMaterial({
    normalMap: textureLoader.load('./normalMap.jpg'),
    normalScale: new THREE.Vector2(1, 1),
});
```

#### Displacement map

The displacement map is used to fake bumps in the shape of the object.

```js
const material = new THREE.MeshPhongMaterial({
    displacementMap: textureLoader.load('./displacementMap.jpg'),
    displacementScale: 1,
});
```

#### Specular map

The specular map is used to change the way light interacts with the material. It is used to create the illusion of shininess on a surface.

```js
const material = new THREE.MeshPhongMaterial({
    specularMap: textureLoader.load('./specularMap.jpg'),
});
```

### Example

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
camera.position.set(0, 10, 10);
const canvas = document.getElementById("canvas");
const controls = new OrbitControls(camera, canvas);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const ambientlight = new THREE.AmbientLight( 0xffffff, 0.1 );
scene.add( ambientlight );

const pointLight = new THREE.PointLight( 0xff8800, 1, 100, 0.005 );
pointLight.position.set( 10, 10, 10 );
scene.add( pointLight );

/* ----------- The good stuff ----------- */

let loader = new THREE.TextureLoader();

const sphereGeometry = new THREE.SphereGeometry( 5, 128, 128 );
const sphereMaterial = new THREE.MeshPhongMaterial( {
    map: loader.load("./earthmap1k.jpg") ,
    displacementMap: loader.load("./earthbump1k.jpg"),
    displacementScale: 1.0,
    normalMap: loader.load("./earthnormal1k.png"),
    normalScale: new THREE.Vector2(1, 1),
    specularMap: loader.load("./earthspec1k.jpg"),
    specular: 0xffffff
} );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
scene.add( sphere );

/* ------------------------------------- */

const gui = new GUI();
gui.add(sphereMaterial, 'displacementScale', 0, 5, 0.01).name('displacementScale');
gui.add(sphereMaterial.normalScale, 'x', 0.5, 5, 0.01).name('normalScaleX');
gui.add(sphereMaterial.normalScale, 'y', 0.5, 5, 0.01).name('normalScaleY');
gui.addColor(sphereMaterial, 'specular').name('specular');

const lightFolder = gui.addFolder( 'Light' );
lightFolder.add(pointLight.position, 'x', -50, 50, 0.1).name('X');
lightFolder.add(pointLight.position, 'y', -50, 50, 0.1).name('Y');
lightFolder.add(pointLight.position, 'z', -50, 50, 0.1).name('Z');

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
})
```

## Models

Models are 3D objects that are created using a 3D modeling software. They can be loaded into a Three.js scene using different loaders depending on the format of the model.

### Loading a GLTF model

First, you need to import the GLTFLoader class.

```js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
```

Then, you can create a new loader and load the model.

```js
const loader = new GLTFLoader();
loader.load('./model.gltf',
    (gltf) => {
        // Called when the resource is loaded
        // Use model here
        // Example:
        scene.add(gltf.scene);
    },
    (xhr) => {
        // Called while loading is progressing
        // Usage example:
        console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
    },
    (error) => {
        // Called when loading has errors
        // Usage example:
        console.log(error);
    }
);
```

### Example

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
camera.position.set(0, 25, 25);
const canvas = document.getElementById("canvas");
const controls = new OrbitControls(camera, canvas);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

/* ----------- The good stuff ----------- */

let loader = new GLTFLoader();
loader.load(
    "./hand.gltf",
    (hand) => {
        let mesh = hand.scene;
        mesh.scale.set(50, 50, 50);
        mesh.traverse((node) => {
            if (node.isMesh) {
                node.material = new THREE.MeshNormalMaterial();
            }
        })
        scene.add(mesh);
    },
    (xhr) => {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},
    (error) => {
        console.log(error)
    }
)

/* ------------------------------------- */

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
})
```

Next, [interacting with the elements](<./05 - Interacting with the elements.md>)
