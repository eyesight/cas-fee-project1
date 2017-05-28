"use strict";
/**
 * Created by claudia on 25.05.17.
 */
var notes = sessionStorage.getItem('notes');

if(!notes){
    sessionStorage.setItem('notes', JSON.stringify([]));
    notes = sessionStorage.getItem('notes');
}
var notesData = JSON.parse(notes);

var notesID = notesData.map(function(a) {
    return a.id;
});
var notesTitle = notesData.map(function(a) {
    return a.title;
});
var notesDesc = notesData.map(function(a) {
    return a.description;
});
var notesRating = notesData.map(function(a) {
    return a.rating;
});
document.querySelector("#notesNumber").innerText = notesData.length;
document.querySelector("#notesName").innerHTML = notes.length == 0 ? "none" : notesRating.join(' ');
