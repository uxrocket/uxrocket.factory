"use strict";

// Import dependencies.
import Core   from "./core/core";
import assign from "./utils/assign";

/**
 *  Factory
 *  Actual Factory that extends from Core.
 */
class Factory extends Core {
  constructor(defaultOptions, options){
    super();
    
    // Create instance options.
    this.options = assign(defaultOptions, options);
  }
}

// Export.
export default Factory;
