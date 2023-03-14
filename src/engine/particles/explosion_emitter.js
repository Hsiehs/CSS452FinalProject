"use strict";

import ParticleEmitter from "./particle_emitter.js";
import engine from "../index.js";

class ExplosionEmitter extends ParticleEmitter {
    constructor(px, py) {
        super(px, py);
        
        // Defualt effect values
        this.mNumParticles = 25; 
        this.mSize = 2;
        this.mStartColor = [1, 0.5, 0, 1]; // orange
        this.mEndColor = [0, 0, 0, 0]; // black (fully transparent)
        this.mSizeROC = 0.97;
        this.mSizeRange = 2;
        
        // Default explosion effect values
        this.mExplosionRadius = 100;
        this.mExplosionForce = 50;
      }
    
    // Getter functions
    getExplosionRadius() { return this.mExplosionRadius; }
    getExplosionForce() { return this.mExplosionForce; }
    
    // Setter functions
    setExplosionRadius(radius) { this.mExplosionRadius = radius; }
    setExplosionForce(force) { this.mExplosionForce = force; }

    createParticle(atX, atY) {
        let life = 30 + Math.random() * 200;
        let p = new engine.Particle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);
        
        // Set particle color to explosion color
        p.setColor(this.mStartColor);
        
        // Set particle size to random value within explosion radius
        let r = Math.random() * this.mExplosionRadius;
        p.setSize(r, r);
    
        // Set final color to fade-out color
        p.setFinalColor(this.mEndColor);
    
        // Set velocity based on explosion force
        let angle = Math.random() * Math.PI * 2;
        let speed = Math.random() * this.mExplosionForce;
        let vx = speed * Math.cos(angle);
        let vy = speed * Math.sin(angle);
        p.setVelocity(vx, vy);
    
        // Set size delta to shrink over particle lifespan
        p.setSizeDelta(-0.01);
    
        return p;
    }
    
    emitParticles(pSet) {
        let angleDelta = Math.PI * 2 / this.mNumParticles;
        let i, p;
        for (i = 0; i < this.mNumParticles; i++) {
          let angle = i * angleDelta;
          let x = this.mEmitPosition[0] + this.mExplosionRadius * Math.cos(angle);
          let y = this.mEmitPosition[1] + this.mExplosionRadius * Math.sin(angle);
          p = this.createParticle(x, y);
          pSet.addToSet(p);
        }
    }
}

export default ExplosionEmitter;