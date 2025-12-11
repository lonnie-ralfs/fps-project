// Get the canvas element from our HTML
const canvas = document.getElementById("renderCanvas");

// Create the Babylon.js engine
const engine = new BABYLON.Engine(canvas, true);

// This function will hold all our scene creation logic
const createScene = function () {
    // Create a new scene
    const scene = new BABYLON.Scene(engine);

    // --- Your 3D world will be built here ---

    // Add a camera to the scene
    // A UniversalCamera is a great choice for an FPS
    const camera = new BABYLON.UniversalCamera("playerCamera", new BABYLON.Vector3(0, 1.8, -5), scene);
    camera.setTarget(BABYLON.Vector3.Zero()); // Make the camera look at the center of the scene
    camera.attachControl(canvas, true); // Attach camera controls to the canvas

    // Add a light to the scene
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Add a ground plane
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 50, height: 50}, scene);

    // Add a simple box to have something to look at
    const box = BABYLON.MeshBuilder.CreateBox("box", {size: 2}, scene);
    box.position.y = 1; // Place the box on top of the ground


    
    // Return the scene
    return scene;
};

// Call the createScene function
const scene = createScene();

// The main render loop that draws the scene 60 times per second
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
