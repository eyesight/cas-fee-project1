"use strict";
/**
 * Created by claudia on 25.05.17.
 * Event-Listeners for the newNote.html-file
 **/

window.onload = function () {
    //start all Functions from the storage
    initNewNote();

    document.getElementById("submitBtn").addEventListener('click', addNewNote);
};



