
// FORK OF: https://github.com/vitch/jquery-methods/blob/master/date.js
"use strict";

import zeroLead from '../../../../utils/zero-lead';
import assign   from '../../../../utils/assign'

/**
 * Date2
 * Decorator that decorate date with extended functionality.
 */
class Date2 {
  /**
   * Decorate given date with advanced methods.
   *
   * @param date {Date, or any format that Date constructor accepts.}
   * For more info look at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
   *
   * @returns Decorated date instance.
   */
  constructor(){
    var args        = Array.prototype.slice.call(arguments),
        argsLength  = args.length,
        date;

    // Create new date.
    if(argsLength === 0){
      date = new Date();
    }else if(argsLength === 1){
      date = new Date(args[0]);
    }else{
      date = Date2.UTCToLocal(new Date(Date.UTC.apply(Date, args)));
    }

    // Because of Babel makes property definitions non-enumerable, we have to
    // decorate date manually with methods.
    date.isLeapYear      = Date2.prototype.isLeapYear;
    date.isWeekend       = Date2.prototype.isWeekend;
    date.isWeekDay       = Date2.prototype.isWeekDay;
    date.getDaysInMonth  = Date2.prototype.getDaysInMonth;
    date.getDayName      = Date2.prototype.getDayName;
    date.getMonthName    = Date2.prototype.getMonthName;
    date.getDayOfYear    = Date2.prototype.getDayOfYear;
    date.getWeekOfYear   = Date2.prototype.getWeekOfYear;
    date.setDayOfYear    = Date2.prototype.setDayOfYear;
    date.addYears        = Date2.prototype.addYears;
    date.addMonths       = Date2.prototype.addMonths;
    date.addDays         = Date2.prototype.addDays;
    date.addHours        = Date2.prototype.addHours;
    date.addMinutes      = Date2.prototype.addMinutes;
    date.addSeconds      = Date2.prototype.addSeconds;
    date.zeroTime        = Date2.prototype.zeroTime;
    date.asString        = Date2.prototype.asString;

    // Assign context values.
    assign(date, this);

    // Return decorated date.
    return date;
  }

  /**
   * Checks if the year is a leap year.
   *
   * @example var dtm = new Date("01/12/2008");
   * dtm.isLeapYear();
   * @result true
   *
   * @name isLeapYear
   * @type Boolean
   * @cat Plugins/Methods/Date
   */
   isLeapYear(){
     var year = this.getFullYear();
     return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
   }

   /**
    * Checks if the day is a weekend day (Sat or Sun).
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.isWeekend();
    * @result false
    *
    * @name isWeekend
    * @type Boolean
    * @cat Plugins/Methods/Date
    */
   isWeekend(){
     return this.getDay() == 0 || this.getDay() == 6;
   }

   /**
    * Check if the day is a day of the week (Mon-Fri)
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.isWeekDay();
    * @result false
    *
    * @name isWeekDay
    * @type Boolean
    * @cat Plugins/Methods/Date
    */
   isWeekDay() {
       return !this.isWeekend();
   }

   /**
    * Gets the number of days in the month.
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.getDaysInMonth();
    * @result 31
    *
    * @name getDaysInMonth
    * @type Number
    * @cat Plugins/Methods/Date
    */
   getDaysInMonth() {
       return [31,(this.isLeapYear() ? 29:28),31,30,31,30,31,31,30,31,30,31][this.getMonth()];
   }

   /**
    * Gets the name of the day.
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.getDayName();
    * @result 'Saturday'
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.getDayName(true);
    * @result 'Sat'
    *
    * @param abbreviated Boolean When set to true the name will be abbreviated.
    * @name getDayName
    * @type String
    * @cat Plugins/Methods/Date
    */
   getDayName(abbreviated) {
       return abbreviated ? Date2.abbrDayNames[this.getDay()] : Date2.dayNames[this.getDay()];
   }

   /**
    * Gets the name of the month.
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.getMonthName();
    * @result 'Janurary'
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.getMonthName(true);
    * @result 'Jan'
    *
    * @param abbreviated Boolean When set to true the name will be abbreviated.
    * @name getDayName
    * @type String
    * @cat Plugins/Methods/Date
    */
   getMonthName(abbreviated) {
       return abbreviated ? Date2.abbrMonthNames[this.getMonth()] : Date2.monthNames[this.getMonth()];
   }

   /**
    * Get the number of the day of the year.
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.getDayOfYear();
    * @result 11
    *
    * @name getDayOfYear
    * @type Number
    * @cat Plugins/Methods/Date
    */
   getDayOfYear() {
       var tmpdtm = new Date("1/1/" + this.getFullYear());
       return Math.floor((this.getTime() - tmpdtm.getTime()) / 86400000);
   }

   /**
    * Get the number of the week of the year.
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.getWeekOfYear();
    * @result 2
    *
    * @name getWeekOfYear
    * @type Number
    * @cat Plugins/Methods/Date
    */
   getWeekOfYear() {
       return Math.ceil(this.getDayOfYear() / 7);
   }

   /**
    * Set the day of the year.
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.setDayOfYear(1);
    * dtm.toString();
    * @result 'Tue Jan 01 2008 00:00:00'
    *
    * @name setDayOfYear
    * @type Date
    * @cat Plugins/Methods/Date
    */
   setDayOfYear(day) {
       this.setMonth(0);
       this.setDate(day);
       return this;
   }

   /**
    * Add a number of years to the date object.
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.addYears(1);
    * dtm.toString();
    * @result 'Mon Jan 12 2009 00:00:00'
    *
    * @name addYears
    * @type Date
    * @cat Plugins/Methods/Date
    */
   addYears(num) {
       this.setFullYear(this.getFullYear() + num);
       return this;
   }

   /**
    * Add a number of months to the date object.
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.addMonths(1);
    * dtm.toString();
    * @result 'Tue Feb 12 2008 00:00:00'
    *
    * @name addMonths
    * @type Date
    * @cat Plugins/Methods/Date
    */
   addMonths(num) {
       var tmpdtm = this.getDate();

       this.setMonth(this.getMonth() + num);

       if (tmpdtm > this.getDate())
           this.addDays(-this.getDate());

       return this;
   }

   /**
    * Add a number of days to the date object.
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.addDays(1);
    * dtm.toString();
    * @result 'Sun Jan 13 2008 00:00:00'
    *
    * @name addDays
    * @type Date
    * @cat Plugins/Methods/Date
    */
   addDays(num) {
       var timezoneOffsetBefore = this.getTimezoneOffset(),
           timezoneOffsetAfter;
       this.setTime(this.getTime() + (num*86400000) );
       timezoneOffsetAfter = this.getTimezoneOffset();

       // If the timezone has changed between days then adjust the time to reflect this
       if(timezoneOffsetAfter !== timezoneOffsetBefore){
           this.setTime(this.getTime() + ((timezoneOffsetAfter-timezoneOffsetBefore) * 60 * 1000));
       }
       return this;
   }

   /**
    * Add a number of hours to the date object.
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.addHours(24);
    * dtm.toString();
    * @result 'Sun Jan 13 2008 00:00:00'
    *
    * @name addHours
    * @type Date
    * @cat Plugins/Methods/Date
    */
   addHours(num) {
       this.setHours(this.getHours() + num);
       return this;
   }

   /**
    * Add a number of minutes to the date object.
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.addMinutes(60);
    * dtm.toString();
    * @result 'Sat Jan 12 2008 01:00:00'
    *
    * @name addMinutes
    * @type Date
    * @cat Plugins/Methods/Date
    */
   addMinutes(num) {
       this.setMinutes(this.getMinutes() + num);
       return this;
   }

   /**
    * Add a number of seconds to the date object.
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.addSeconds(60);
    * dtm.toString();
    * @result 'Sat Jan 12 2008 00:01:00'
    *
    * @name addSeconds
    * @type Date
    * @cat Plugins/Methods/Date
    */
   addSeconds(num) {
       this.setSeconds(this.getSeconds() + num);
       return this;
   }

   /**
    * Sets the time component of this Date to zero for cleaner, easier comparison of dates where time is not relevant.
    *
    * @example var dtm = new Date();
    * dtm.zeroTime();
    * dtm.toString();
    * @result 'Sat Jan 12 2008 00:01:00'
    *
    * @name zeroTime
    * @type Date
    * @cat Plugins/Methods/Date
    * @author Kelvin Luck
    */
   zeroTime() {
    this.setMilliseconds(0);
    this.setSeconds(0);
    this.setMinutes(0);
    this.setHours(0);
    return this;
   }

   /**
    * Returns a string representation of the date object according to Date.format.
    * (Date.toString may be used in other places so I purposefully didn't overwrite it)
    *
    * @example var dtm = new Date("01/12/2008");
    * dtm.asString();
    * @result '12/01/2008' // (where Date.format == 'dd/mm/yyyy'
    *
    * @name asString
    * @type Date
    * @cat Plugins/Methods/Date
    * @author Kelvin Luck
    */
   asString(format) {
       var r = format || this.format;
       return r
           .split('yyyy').join(this.getFullYear())
           .split('yy').join((this.getFullYear() + '').substring(2))
           .split('dd').join(zeroLead(this.getDate()))
           .split('d').join(this.getDate())
           .split('DD').join(this.getDayName(false))
           .split('D').join(this.getDayName(true))
           .split('mmmm').join(this.getMonthName(false))
           .split('mmm').join(this.getMonthName(true))
           .split('mm').join(zeroLead(this.getMonth()+1))
           .split('hh').join(zeroLead(this.getHours()))
           .split('min').join(zeroLead(this.getMinutes()))
           .split('ss').join(zeroLead(this.getSeconds()));
   }

   /**
    * Converts UTC date to local date.
    */
  static UTCToLocal(date){
    return new Date(
  		date.getUTCFullYear(),
  		date.getUTCMonth(),
  		date.getUTCDate(),
  		date.getUTCHours(),
  		date.getUTCMinutes(),
  		date.getUTCSeconds(),
  		date.getUTCMilliseconds()
  	);
  }
}

Date2.dayNames       = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
Date2.abbrDayNames   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
Date2.monthNames     = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
Date2.abbrMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
Date2.firstDayOfWeek = 1;
Date2.format         = 'dd/mm/yyyy';
Date2.fullYearStart  = '20';

// Export.
export default Date2;
