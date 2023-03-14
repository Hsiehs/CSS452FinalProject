"use strict";

import ParticleEmitter from "./particle_emitter.js";
import engine from "../index.js";

class EchoEmitter extends ParticleEmitter {
    constructor(x, y) {
        super(x,y);
    }
}

export default EchoEmitter;