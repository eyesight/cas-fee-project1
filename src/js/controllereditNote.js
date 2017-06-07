"use strict";
/**
 * Created by claudia on 25.05.17.
 * Event-listeners on for the editNote.html-file
 **/

window.onload = function () {
    //start all Functions from the storage
    initEditNote();

    document.getElementById("editBtn").addEventListener('click', editNote);
    document.getElementById("cancelBtn").addEventListener('click', cancelNote);
    document.getElementById("deleteBtn").addEventListener('click', deleteNote);
};




