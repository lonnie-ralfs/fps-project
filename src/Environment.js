export class Environment {
    constructor(scene) {
        this.scene = scene;
        this.createWorld();
    }

    createWorld() {
        // Add a light
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;

        // Add a ground plane
        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 50, height: 50 }, this.scene);
        // Enable collisions on ground
        ground.checkCollisions = true;

        // Add a simple box to look at
        const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, this.scene);
        box.position.y = 1;
        box.checkCollisions = true;
    }
}
