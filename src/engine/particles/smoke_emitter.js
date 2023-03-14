"use strict";

import ParticleEmitter from "./particle_emitter.js";
import engine from "../index.js";
import SmokeParticle from "./smoke_particle.js";

class SmokeEmitter extends ParticleEmitter {
    // if lifespan is -1 it is ongoing
    constructor(pX, pY, lifespan) {
        super(pX, pY);
        this.mLifeSpan = null;
        if (lifespan != -1) {
            this.mLifeSpan = Date.now() + lifespan;
        }

        // Default Smoke effect values
        this.mNumParticles = 10;
        this.mSize = 3;
        this.mStartColor = [0.8, 0.8, 0.8, 1];
        this.mEndColor = [0.0, 0, 0, 0];
        this.mSizeROC = 1;  
        this.mSizeRange = 2;
    }


    emitParticles(pSet) {
        let sizex = 10;
        let sizey = 9;
        
        let i, p ,x ,y;
        for (i = 0; i < this.mNumParticles; i++) {
            x = Math.floor(Math.random() * (sizex + 1));
            y = Math.floor(Math.random() * (sizey + 1));
            p = this.createParticle(this.mEmitPosition[0] + x, this.mEmitPosition[1] + y);
            pSet.addToSet(p);
        }
        if (this.mLifeSpan != null && this.mLifeSpan < Date.now()) {
            this.kill();
        }
    }

    createParticle(atX, atY) {
        let life = 30 + Math.random() * 300;
        let p = new SmokeParticle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);

        // size of the particle
        let r = this.mSizeRange + Math.random() * this.mSize;
        p.setSize(r, r);

        // velocity on the particle
        let fx = 10 - 20 * Math.random();
        let fy = 10 * Math.random();
        p.setVelocity(fx, fy);

        p.setAcceleration(2,3);
        
        // final color
        p.setFinalColor(this.mEndColor);

        // size delta
        p.setSizeDelta(this.mSizeROC);

        return p;
    }

}

export default SmokeEmitter;