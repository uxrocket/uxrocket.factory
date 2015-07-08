"use strict";

// Import dependencies.
import Factory  from "../../factory";
import Calendar from "../calendar/calendar";
import assign   from "../../utils/assign";

/**
 *  Calendar
 *  Actual Factory that extends from Core.
 */
class Datepicker extends Factory {
    constructor(options){
        // Create options.
        super({
          weekStartDay: 1
        }, options);

        // Register events.
        this.eventEmitter.on('ready', () => this.init());
    }

    /**
     * Initialization.
     */
    init(){
      var calendar = new Calendar();

      console.log(calendar.createMonthMap());
    }
}

// Export.
export default Datepicker;
