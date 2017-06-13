"use strict";
/**
 * Created by claudia on 25.05.17.
 * Event-Listeners for the newNote.html-file
 **/
//TODO: Add und Edit-Note gehören zusammen: evt. via Handlebars

function initNewNote(){
    applyStyleData();
    applyNoteData();
    applySelectedNoteID();
}

window.onload = function () {
    //start all Functions from the storage
    initNewNote();

    document.getElementById("submitBtn").addEventListener('click', addNewNote);
};



