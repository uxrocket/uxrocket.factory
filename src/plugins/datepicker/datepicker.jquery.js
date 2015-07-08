"use strict";

// Import dependencies.
import Datepicker       from "./datepicker";
import JqueryAdaptor    from "../../view-adaptors/jquery"

/**
 *  Datepicker as jQuery plugin.
 */
class DatepickerJquery extends JqueryAdaptor{
    constructor(){
        super();

        // Register plugin.
        this.register('datepicker', Datepicker, {version: "0.1.0"});
    }
}

// Create jQuery plugin.
new DatepickerJquery();
