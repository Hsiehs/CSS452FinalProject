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

        this.mEffects = ["Default", "Fire", "Smoke", "Explosion"];
        this.mEffectsSelector = 0;

        //Fire Parameters
        this.mFireROC = 0.97;
        this.mFireSpread = 0;
        this.mFireXDir = 0;
        this.mFireHeight = 50;

        //Smoke Parameters
        this.mThickness = 1;
        this.mXCoverage = 10;
        this.mYCoverage = 10;
        this.mXWind = 0;
        this.mYWind = 0;

        //Explosion Parameters
        this.mRadius = 10;
        this.mForce = 2;
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
        if (this.mEffectsSelector == 1) {
            msg = "Rate of change: " + this.mFireROC + " Fire Spread: " + this.mFireSpread + " Wind: " + this.mFireXDir + " Height: " + this.mFireHeight;
        } else if (this.mEffectsSelector == 2) {
            msg = "Thickness: " + this.mThickness + " X Coverage: " + this.mXCoverage + " Y Coverage: " + this.mYCoverage + " X Wind: " + this.mXWind + " Y Wind: " + this.mYWind;
        } else if (this.mEffectsSelector == 3) {
            msg = "Radius: " + this.mRadius + " Force: " +this.mForce;
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
            if(this.mEffectsSelector == 0){
                this.defaultEffect = this.mParticles.createEffect(x, y);
            }else if (this.mEffectsSelector == 1) {
                this.fireEffect = this.mParticles.createFire(x, y, 5000);
                this.fireEffect.setSizeROC(this.mFireROC);
                this.fireEffect.setFlameSpread(this.mFireSpread);
                this.fireEffect.setWindDirection([this.mFireXDir, this.mFireHeight]);
            } else if (this.mEffectsSelector == 2) {
                this.smokeEffect = this.mParticles.createSmoke(x, y, 1500);
                this.smokeEffect.setXCoverage(this.mXCoverage);
                this.smokeEffect.setYCoverage(this.mYCoverage);
                this.smokeEffect.setXWind(this.mXWind);
                this.smokeEffect.setYWind(this.mYWind);
                this.smokeEffect.setThickness(this.mThickness);
            } else if (this.mEffectsSelector == 3) {
                this.explosionEffect = this.mParticles.createExplosion(x, y);
                this.explosionEffect.setExplosionTargetRadius(this.mRadius);
                this.explosionEffect.setExplosionForce(this.mForce);
            }
        }

        // Fire Parameters 

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
            if (this.mFireXDir < 50) {
                this.mFireXDir += 5;
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
        
        // Smoke Parameters

        if (engine.input.isKeyClicked(engine.input.keys.Q)) {
            if (this.mThickness > 1) {
                this.mThickness -= 1;
            }
        }

        if (engine.input.isKeyClicked(engine.input.keys.W)) {
            if (this.mThickness < 5) {
                this.mThickness += 1;
            }
        }
        // X Coverage
        if (engine.input.isKeyClicked(engine.input.keys.E)) {
            if (this.mXCoverage > 10) {
                this.mXCoverage -= 5;
            }
        }

        if (engine.input.isKeyClicked(engine.input.keys.R)) {
            if (this.mXCoverage < 50) {
                this.mXCoverage += 5;
            }
        }
        //Y Coverage
        if (engine.input.isKeyClicked(engine.input.keys.T)) {
            if (this.mYCoverage > 10) {
                this.mYCoverage -= 5;
            }
        }

        if (engine.input.isKeyClicked(engine.input.keys.Y)) {
            if (this.mYCoverage < 50) {
                this.mYCoverage += 5;
            }
        }

        // Wind X direction
        if (engine.input.isKeyClicked(engine.input.keys.U)) {
            if (this.mXWind > -25) {
                this.mXWind -= 5;
            }
        }

        if (engine.input.isKeyClicked(engine.input.keys.I)) {
            if (this.mXWind < 20) {
                this.mXWind += 5;
            }
        }

        // Wind Y direction 

        if (engine.input.isKeyClicked(engine.input.keys.O)) {
            if (this.mYWind > -25) {
                this.mYWind -= 5;
            }
        }

        if (engine.input.isKeyClicked(engine.input.keys.P)) {
            if (this.mYWind < 20) {
                this.mYWind += 5;
            }
        }
        // Explosion Parameters
        
        // Radius
        if (engine.input.isKeyClicked(engine.input.keys.A)) {
            if (this.mRadius > 5) {
                this.mRadius -= 1;
            }
        }
        if (engine.input.isKeyClicked(engine.input.keys.S)) {
            if (this.mRadius < 15) {
                this.mRadius += 1;
            }
        }

        if (engine.input.isKeyClicked(engine.input.keys.D)) {
            if (this.mForce > 1) {
                this.mForce -= 1;
            }
        }
        if (engine.input.isKeyClicked(engine.input.keys.F)) {
            if (this.mForce < 5) {
                this.mForce += 1;
            }
        }

        // Particle System
        this.mParticles.update();


        this.mMsg.setText(msg);
        this.mMsg2.setText(msg2);
    }


}

export default MyGame;