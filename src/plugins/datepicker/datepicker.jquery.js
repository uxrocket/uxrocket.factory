"use strict";

// Import dependencies.
import DatepickerCore   from "./core/datepicker.core";
import DatepickerView   from "./core/datepicker.view";
import JqueryAdaptor    from "../../view-adaptors/jquery"

/**
 *  Datepicker as jQuery plugin.
 */
class DatepickerJquery extends JqueryAdaptor{
    constructor(options){
        super(options, DatepickerCore, DatepickerView);
    }
}

// Register plugin.
JqueryAdaptor.register('datepicker', DatepickerJquery, {version: "0.1.0"});
