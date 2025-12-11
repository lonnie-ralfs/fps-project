import { Environment } from "./Environment.js";
import { Player } from "./Player.js";

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);

        // Initialize systems
        this.initialize();
    }

    initialize() {
        // Create the environment (lights, ground, walls)
        this.environment = new Environment(this.scene);

        // Create the player (camera, controls)
        this.player = new Player(this.scene, this.canvas);

        // Run the render loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        // Handle window resize
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }
}
