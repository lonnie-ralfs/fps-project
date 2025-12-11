export class Player {
    constructor(scene, canvas) {
        this.scene = scene;
        this.canvas = canvas;
        this.createCamera();
    }

    createCamera() {
        // Create the First Person Camera
        this.camera = new BABYLON.UniversalCamera("playerCamera", new BABYLON.Vector3(0, 1.8, -5), this.scene);

        // Target the center
        this.camera.setTarget(BABYLON.Vector3.Zero());

        // Attach controls
        this.camera.attachControl(this.canvas, true);

        // Apply handling for gravity and collisions
        this.applyGravityAndCollisions();
    }

    applyGravityAndCollisions() {
        // Enable gravity on the scene
        this.scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
        this.scene.collisionsEnabled = true;

        // Configure camera for collisions
        this.camera.checkCollisions = true;
        this.camera.applyGravity = true;

        // Define the player's size (ellipsoid)
        // (x, y, z) - y is half the height of the player
        this.camera.ellipsoid = new BABYLON.Vector3(1, 0.9, 1);

        // WASD controls
        this.camera.keysUp.push(87);    // W
        this.camera.keysDown.push(83);  // S
        this.camera.keysLeft.push(65);  // A
        this.camera.keysRight.push(68); // D

        // Jump (Spacebar) - Simple jump implementation
        // Note: For realistic physics, valid physics engine (Havok/Cannon) is recommended,
        // but for this simple tutorial we will manually simulate a jump impulse.
        this.canvas.addEventListener("click", () => {
            this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock;
            this.canvas.requestPointerLock();
        });

        // Use window for key events to ensure they catch
        window.addEventListener("keydown", (e) => {
            if (e.code === "Space" && this.canJump()) {
                this.jump();
            }
        });
    }

    canJump() {
        // Simple check: if we haven't jumped recently (debounce) or check altitude
        // In a real engine we check if (grounded)
        // With simple collisions, we can check if camera.position.y is close to ground height + eye height
        return true;
    }

    jump() {
        this.camera.cameraDirection.y = 0.5; // Apply upward impulse
    }
}
