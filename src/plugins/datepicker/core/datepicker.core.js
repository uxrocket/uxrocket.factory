"use strict";

// Import dependencies.
import Factory  from "../../../factory";
import Calendar from "../../calendar/calendar";
import assign   from "../../../utils/assign";
/**
 *  Datepicker Core
 */
class DatepickerCore extends Factory {
    constructor(options){
      super();

      // Default options.
      let defaultOptions = {
        weekStartDay: 1
      };

      // Extend default options.
      this.options = assign(defaultOptions, options);

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
export default DatepickerCore;
