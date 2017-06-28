/**
 * Created by claudia on 24.06.17.
 */
shared = (function(){
    "use strict";
    function _initNoteData(){
        let notes = localStorage.getItem('notes');
        //if no notes exist, set new Object notes
        if(!notes){
            notes = localStorage.setItem('notes', JSON.stringify([]));
            //get the default Notes, when nothing exists
            notes = localStorage.setItem('notes', JSON.stringify(defaultnotes));
        }
        return notes;
    }

    function _sessionValue(key, value, def = undefined){
        let val = sessionStorage.getItem(key) || def;
        if(!val) {
            sessionStorage.setItem(key, value);
        }
        return val;
    }
    return {
        sessionValue: _sessionValue,
        initNoteData: _initNoteData
    };
}() || {});