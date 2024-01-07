# Getting started

## Installing Three.js

Three.js is a JavaScript library that allows you to create 3D graphics in the browser. It is a wrapper around WebGL, which is a low-level API for rendering 3D graphics in the browser. Three.js is already very well documented, and you can find simplle examples for all the features you might need [here](https://threejs.org/examples/).

Depending on your working environment, there are different ways to install Three.js, all listed on the [Three.js website](https://threejs.org/docs/#manual/en/introduction/Installation).

### Three.js in a simple HTML page

#### Creating the project

- Create a new folder for your project

Inside the folder:

- Create a new file called `script.js`
- Create a new file called `style.css`
- Create a new file called `index.html` in the folder

#### Adding Three.js

- Add the following code to the `style.css` file:

```css
head, body {
    margin: 0;
    padding: 0;
}

canvas {
    display: block;
}
```
This first removes the native margins and paddings present in the html and body elements, and then makes all canvas elements take the full size of the screen.

- Add the following code to the file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My ThreeJs Project</title>

    <!-- Import the css file -->
    <link rel="stylesheet" type="text/css" href="style.css">

    <!-- You can change 0.160.0 to any other availble Three.js version to match your requirements -->
    <script type="importmap">
        {
            "imports": {
                "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
                "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
            }
        }
    </script>
</head>
<body>
    <!-- This canvas is the one you will use to display your Three.js code. -->
    <canvas id="canvas"></canvas>

    <!-- The import should happen after creating the other HTML elements since you will be importing them -->
    <script type="module" src="./script.js"></script>
</body>
</html>
```

This first imports the css file, then imports Three.js from the [unpkg](https://unpkg.com/) CDN. You can change the version of Three.js by changing the version number in the import. You can find the list of available versions [here](https://www.npmjs.com/package/three?activeTab=versions). Finally, it creates a canvas and imports the `script.js` file.

You can now start writing your Three.js code in the `script.js` file. You can find the documentation for Three.js [here](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene).


### Three.js in a VueJs project

#### Creating the project

Use the following command to create a new project. Enter the name of your project when asked, and if you are unsure about the other options, simply choose No by hitting enter.

```bash
npm create vue@latest
cd <your-project-name>
npm install
```

#### Adding Three.js

Inside the project folder, install Three.js using the following command:

```bash
npm install --save three
```


## Using Three.js

To import Three.js in your javascript file, you can use the following:

```js
import * as THREE from 'three';
```

To import a specific module, for example here OrbitControls, you can use the following:

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
```

Next, [setting up a scene, camera and renderer](<./01 - Scene, camera and renderer.md>)
