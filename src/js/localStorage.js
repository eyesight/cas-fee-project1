"use strict";
/**
 * Created by claudia on 25.05.17.
 */
var notes = sessionStorage.getItem('notes');

if(!notes){
    sessionStorage.setItem('notes', JSON.stringify([]));
    notes = sessionStorage.getItem('notes');
}
notes = JSON.parse(notes);

document.querySelector("#notesNumber").innerText = notes.length;
document.querySelector("#notesName").innerHTML = notes.length == 0 ? "none" : notes.join("</br>");
