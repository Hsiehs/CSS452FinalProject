"use strict";

import ParticleEmitter from "./particle_emitter.js";
import engine from "../index.js";
import FireParticle from "./fire_particle.js";

class FireEmitter extends ParticleEmitter {
    // if lifespan is -1 it is ongoing
    constructor(pX, pY, thickness, lifespan) {
        super(pX, pY, thickness);
        this.mLifeSpan = null;
        if (lifespan != -1) {
            this.mLifeSpan = Date.now() + lifespan;
        }

        // Defualt fire effect values
        this.mSize = 1;
        this.mStartColor = [1, 0, 0, 1];
        this.mEndColor = [1, 0, 0, 1];
        this.mSizeROC = 0.97;
        this.mSizeRange = 2;
        this.mFlameHeight = 50.0;
        this.mFlameSway = 0;
    }

    getFlameHeight() { return this.mFlameHeight; }
    getFlameSway() { return this.mFlameSway; }

    setFlameHeight(flameHeight) {
        this.mFlameHeight = flameHeight;
    }
    setFlameSway(flameSway) {
        this.mFlameSway = flameSway;
    }

    emitParticles(pSet) {
        let i, p;
        for (i = 0; i < this.mNumParticles; i++) {
            p = this.createParticle(this.mEmitPosition[0], this.mEmitPosition[1]);
            pSet.addToSet(p);
        }
        if (this.mLifeSpan != null && this.mLifeSpan < Date.now()) {
            this.kill();
        }
    }

    createParticle(atX, atY) {
        let life = 30 + Math.random() * 60;
        let p = new FireParticle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);
        p.setColor(this.mStartColor);

        // size of the particle
        let r = this.mSizeRange + Math.random() * this.mSize;
        p.setSize(r, r);



        // velocity on the particle
        let fx = 10 - 20 * Math.random();
        let fy = 10 * Math.random();
        p.setVelocity(fx, fy);

        p.setAcceleration(this.mFlameSway, this.mFlameHeight);

        // final color
        p.setFinalColor(this.mEndColor);

        // size delta
        p.setSizeDelta(this.mSizeROC);

        return p;
    }

}

export default FireEmitter;