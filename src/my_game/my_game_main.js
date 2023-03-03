/*
 * File: MyGame.js 
 *       This is the logic of our game. 
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

class MyGame extends engine.Scene {
    constructor() {
        super();
        // The camera to view the scene
        this.mCamera = null;

        this.mMsg = null;
        this.mParticles = null;

    }

    load() {

    }

    unload() {

    }

    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 40), // position of the camera
            100,                     // width of camera
            [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // sets the background to gray
        engine.defaultResources.setGlobalAmbientIntensity(3);

        // particle systems
        this.mParticles = new engine.ParticleSet();

        this.mMsg = new engine.FontRenderable("Status Message");
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(5, 7);
        this.mMsg.setTextHeight(2);

        this.fireEffect = this.mParticles.createFire(50, 40, 0.1, -1);

    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        this.mCamera.setViewAndCameraMatrix();

        this.mMsg.draw(this.mCamera);

        this.mParticles.draw(this.mCamera);
    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {
        let msg = "Size: " + this.fireEffect.getSize() + " Rate of Change: " + this.fireEffect.getSizeROC().toFixed(2) + " Flame Height: " + this.fireEffect.getFlameHeight() + " Flame Direction: " + this.fireEffect.getFlameSway();
        let delta = 1;
        if (engine.input.isKeyClicked(engine.input.keys.Up)) {
            this.fireEffect.setSize(this.fireEffect.getSize() + 1);
        }
        if (engine.input.isKeyClicked(engine.input.keys.Down)) {
            this.fireEffect.setSize(this.fireEffect.getSize() - 1);
        }

        if (engine.input.isKeyClicked(engine.input.keys.Right)) {
            this.fireEffect.setSizeROC(this.fireEffect.getSizeROC() + 0.01);
        }

        if (engine.input.isKeyClicked(engine.input.keys.Left)) {
            this.fireEffect.setSizeROC(this.fireEffect.getSizeROC() - 0.01);
        }

        if (engine.input.isKeyClicked(engine.input.keys.O)) {
            this.fireEffect.setFlameHeight(this.fireEffect.getFlameHeight() - 5);
        }

        if (engine.input.isKeyClicked(engine.input.keys.P)) {
            this.fireEffect.setFlameHeight(this.fireEffect.getFlameHeight() + 5);
        }

        if (engine.input.isKeyClicked(engine.input.keys.Q)) {
            this.fireEffect.setFlameSway(this.fireEffect.getFlameSway() - 5);
        }

        if (engine.input.isKeyClicked(engine.input.keys.W)) {
            this.fireEffect.setFlameSway(this.fireEffect.getFlameSway() + 5);
        }
        if (engine.input.isKeyClicked(engine.input.keys.R)) {
            this.fireEffect.setEndColor([1, 0, 0, 1]);
        }
        if (engine.input.isKeyClicked(engine.input.keys.G)) {
            this.fireEffect.setEndColor([0, 1, 0, 1]);
        }
        // Particle System
        this.mParticles.update();

        this.mMsg.setText(msg);
    }


}

export default MyGame;