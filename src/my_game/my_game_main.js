/*
 * File: MyGame.js 
 *       This is the logic of our game. 
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import { eMouseButton } from "../engine/components/input.js";
import engine from "../engine/index.js";

class MyGame extends engine.Scene {
    constructor() {
        super();
        // The camera to view the scene
        this.mCamera = null;

        this.mMsg = null;
        this.mParticles = null;

        this.mEffects = ["Fire", "Smoke", "Explosion"];
        this.mEffectsSelector = 0;

        //fire specific
        this.mFireROC = 0.97;
        this.mFireSpread = 0;
        this.mFireXDir = 0;
        this.mFireHeight = 50;

        //smoke specific
        this.mXCoverage = 10;
        this.mYCoverage = 10;
        this.mXWind = 0;
        this.mYWind = 0;

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

        this.mMsg2 = new engine.FontRenderable("");
        this.mMsg2.setColor([0, 0, 0, 1]);
        this.mMsg2.getXform().setPosition(5, 75);
        this.mMsg2.setTextHeight(2);

    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        this.mCamera.setViewAndCameraMatrix();

        this.mMsg.draw(this.mCamera);
        this.mMsg2.draw(this.mCamera);

        this.mParticles.draw(this.mCamera);
    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {
        let msg2 = "Effect Type: " + this.mEffects[this.mEffectsSelector];
        let msg;
        if (this.mEffectsSelector == 0) {
            msg = "Rate of change: " + this.mFireROC + " Fire Spread: " + this.mFireSpread + " Wind: " + this.mFireXDir + " Height: " + this.mFireHeight;
        } else if (this.mEffectsSelector == 1) {
            msg = "X Coverage: " + this.mXCoverage + " Y Coverage: " + this.mYCoverage ;
        } else if (this.mEffectsSelector == 2) {
            msg = ""
        } else {
            msg = ""
        }

        //Effect selection
        if (engine.input.isKeyClicked(engine.input.keys.Right)) {
            if (this.mEffectsSelector < 3) {
                this.mEffectsSelector++;
            }
        }

        if (engine.input.isKeyClicked(engine.input.keys.Left)) {
            if (this.mEffectsSelector > 0) {
                this.mEffectsSelector--;
            }
        }

        // Effect Creation
        if (engine.input.isButtonPressed(engine.input.eMouseButton.eLeft)) {
            let x = engine.input.getMousePosX() / 8;
            let y = engine.input.getMousePosY() / 7.5;
            if (this.mEffectsSelector == 0) {
                this.fireEffect = this.mParticles.createFire(x, y, 5000);
                this.fireEffect.setSizeROC(this.mFireROC);
                this.fireEffect.setFlameSpread(this.mFireSpread);
                this.fireEffect.setWindDirection([this.mFireXDir, this.mFireHeight]);
            } else if (this.mEffectsSelector == 1) {
                this.smokeEffect = this.mParticles.createSmoke(x, y, 1500);

            } else if (this.mEffectsSelector == 2) {
                this.explosionEffect = this.mParticles.createExplosion(x, y);
            }
        }

        // Fire Specifications 

        // ROC
        if (engine.input.isKeyClicked(engine.input.keys.One)) {
            if (this.mFireROC > 0.95) {
                this.mFireROC -= 0.01;
            }
        }
        if (engine.input.isKeyClicked(engine.input.keys.Two)) {
            if (this.mFireROC < 1) {
                this.mFireROC += 0.01;
            }
        }
        // Fire Spread
        if (engine.input.isKeyClicked(engine.input.keys.Three)) {
            if (this.mFireSpread > 0) {
                this.mFireSpread -= 2;
            }
        }
        if (engine.input.isKeyClicked(engine.input.keys.Four)) {
            if (this.mFireSpread < 10) {
                this.mFireSpread += 2;
            }
        }
        // Wind
        if (engine.input.isKeyClicked(engine.input.keys.Five)) {
            if (this.mFireXDir > -50) {
                this.mFireXDir -= 5;
            }
        }
        if (engine.input.isKeyClicked(engine.input.keys.Six)) {
            if (this.mFireHeight < 50) {
                this.mFireHeight+= 5;
            }
        }
        // Height
        if (engine.input.isKeyClicked(engine.input.keys.Seven)) {
            if (this.mFireHeight > 50) {
                this.mFireHeight -= 5;
            }
        }
        if (engine.input.isKeyClicked(engine.input.keys.Eight)) {
            if (this.mFireHeight < 100) {
                this.mFireHeight += 5;
            }
        }



        if (engine.input.isKeyClicked(engine.input.keys.Q)) {
            this.fireEffect.setFlameSway(this.fireEffect.getFlameSway() - 5);
        }

        if (engine.input.isKeyClicked(engine.input.keys.W)) {
            this.fireEffect.setFlameSway(this.fireEffect.getFlameSway() + 5);
        }
        if (engine.input.isKeyClicked(engine.input.keys.R)) {
            this.fireEffect.setEndColor([1, .3, 0, 1]);
        }
        if (engine.input.isKeyClicked(engine.input.keys.G)) {
            this.fireEffect.setEndColor([.4, 1, 0, 1]);
        }
        if (engine.input.isKeyClicked(engine.input.keys.B)) {
            this.fireEffect.setEndColor([0, .3, 1, 0]);
        }
        // Particle System
        this.mParticles.update();


        this.mMsg.setText(msg);
        this.mMsg2.setText(msg2);
    }


}

export default MyGame;