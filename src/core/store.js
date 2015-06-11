"use strict";

// @TODO: Add 'formatters' (modifiers) support for read and write/update.
// @TODO: Add deep writing support. Like write('x.y.z', 5);
// @TODO: Add feature to provide 'oldValue' in update/write event.

import EventEmitter from './event-emitter';
import parseNesting from '../utils/parse-nesting'

/**
 *  Store
 *  Responsible to store key-value pairs.
 */
class Store extends EventEmitter {
    constructor(){
        super();
        this.storage = {};
    }

    /**
     * Read from storage.
     *
     * Uses parseNesting utils for deep search. Look at parseNesting documentation for more info.
     *
     * @param {string} key
     * @returns {*} value of key in storage.
     */
    read(key){
        return parseNesting(key, this.storage);
    }

    /**
     * Write to storage.
     *
     * @param {string} key
     * @param value
     */
    _write(key, value, event){
        this.storage[key] = value;
        this.emit('write', {key: key, value: value});
    }

    /**
     * Write
     *
     * @param {string} key
     * @param {*} value
     */
    write(key, value){
        this.write(key, value, 'write');
    }

    /**
     * Update
     *
     * @param {string} key
     * @param {*} value
     */
    update(key, data){
        this.write(key, value, 'update');
    }

    /**
     * Removes specific key from library.
     *
     * @param {string} key
     */
    remove(key){
        delete this.storage[key];
    }

    /**
     * Destroy store.
     */
    destroy(){
        this.storage = {};
    }
}

export default Store;