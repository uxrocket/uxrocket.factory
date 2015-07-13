"use strict";

// Import dependencies.
import Core         from "./core/core";
import EventEmitter from './core/event-emitter';
import Store        from './core/store';

/**
 *  Factory
 *  Actual Factory that extends from Core.
 */
class Factory extends Core {
  constructor(options){
    super();

    // Create instances of core components.
    this.eventEmitter   = new EventEmitter();
    this.store          = new Store();
  }

  destroy(){
    this.eventEmitter.destroy();
    this.store.destroy();
  }
}

// Export.
export default Factory;
