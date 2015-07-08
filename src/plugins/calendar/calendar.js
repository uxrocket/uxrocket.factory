"use strict";

// Import dependencies.
import Date2   from "../date2/date2";
import assign  from "../../utils/assign";

/**
 *  Calendar
 */
class Calendar {
    constructor(options){
        // Default options.
        var defaultOptions = {
          firstDayOfWeek: Date2.firstDayOfWeek
        };

        // Create instance options.
        this.options = assign(defaultOptions, options);

        // Register current date info.
        this.today = new Date2();
    }

    /**
      * CreateMonthMap
      * Creates map of given month.
      *
      * @param date {Date}
      * @default Current month.
      */
    createMonthMap(date = new Date2()){
      // Reset time.
      date.zeroTime();
      date.setDate(1);

      // Get days in month.
      var monthMap        = [[],[],[],[],[],[]],
          daysInMonth     = date.getDaysInMonth(),
          firstDayOfMonth = date.getDay(),
          firstDayOffset  = firstDayOfMonth - this.options.firstDayOfWeek,
          currentWeek     = 0;

      // If month not start from monday.
      if(firstDayOffset){
        // Get days number of previous month.
        var previousMonthDays = (new Date2(+date)).zeroTime().addMonths(-1).getDaysInMonth();

        for(let i = 0; i < firstDayOffset; i++){
          monthMap[currentWeek].unshift(previousMonthDays-i);
        }
      }

      // Add month days.
      for(let i = 1; i < daysInMonth+1; i++){
        if(monthMap[currentWeek].length === 7) currentWeek++;
        monthMap[currentWeek].push(i);
      }

      // Get days number of next month.
      var nextMonthDays = (new Date2(+date)).zeroTime().addMonths(1).getDaysInMonth();

      // Add missing week days from next month.
      for(let i = 1; i < nextMonthDays+1; i++){
        if(monthMap[currentWeek].length === 7) currentWeek++;
        if(currentWeek === monthMap.length) break;
        monthMap[currentWeek].push(i);
      }

      // Return created map.
      return monthMap;
    }
}

// Export.
export default Calendar;
