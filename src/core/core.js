"use strict";

// Import dependencies.
import EventEmitter from './event-emitter';
import Store        from './store';

/**
 *  Core
 *  Responsible to create instances of core components like EventEmitter.
 */
class Core {
    constructor(){
        // Create instances of core components.
        this.eventEmitter   = new EventEmitter();
        this.store          = new Store();
    }

    destroy(){
        this.eventEmitter.destroy();
        this.store.destroy();
    }
}

export default Core;