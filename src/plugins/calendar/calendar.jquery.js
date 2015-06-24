"use strict";

// Import dependencies.
import Calendar         from "./calendar";
import JqueryAdaptor    from "../../view-adaptors/jquery"
import assign           from "../../utils/assign"

/**
 *  Calendar as jQuery plugin.
 */
class CalendarJquery extends JqueryAdaptor{
    constructor(){
        super();

        this.register('calendar', Calendar, {version: "0.1.0"});
    }
}

// Create jQuery plugin.
new CalendarJquery();