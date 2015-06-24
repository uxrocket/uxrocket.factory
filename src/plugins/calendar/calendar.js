"use strict";

// Import dependencies.
import Factory from "../../factory";

/**
 *  Calendar
 *  Actual Factory that extends from Core.
 */
class Calendar extends Factory {
    constructor(options){
        super();

        console.log("here i came");
        console.log(options);
        this.eventEmitter.on('ready', function(){
            console.log("ready");
        });
    }
}

// Export.
export default Calendar;