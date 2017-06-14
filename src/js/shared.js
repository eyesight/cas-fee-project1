"use strict";
/**
 * Created by claudia on 13.06.17.
 * Beinhaltet JS Code, welcher von mehreren Files benötigt wird.
 */

//Get the the data from the localStorage - all Notes, when nothing is in it, take the default notes form file "testnotes.js"
function applyNoteData(){
    let notes = localStorage.getItem('notes');
    //if no notes exist, set new Object notes
    if(!notes){
        notes = localStorage.setItem('notes', JSON.stringify([]));
        notes = localStorage.setItem('notes', JSON.stringify(defaultnotes));
    }
    return notes;
}

//function to parse the data from the localStorage
function parseNoteData(){
    let notes = applyNoteData();
    return JSON.parse(notes);
}

//get the class Name from the storage to change the style (classname is set in the body-tag)
function applyStyleData(){
    let actualStyle = localStorage.getItem('styleClassName');
    if(!actualStyle){
        localStorage.setItem('styleClassName', 'colorful');
    }
    //TODO: DOM-Element nicht in funktion
    document.querySelector('body').className = actualStyle;
    return actualStyle;
}

//get the stored sortBy-Element - so the sort-function doesn't change by adding new note.
function applySortByBtn(){
    let sortbyBtn = sessionStorage.getItem('sortby');
    //if there isn't clicked on a sortby-link, initial Item in sessionStore and take "sort by finished Date" as default sort-function
    if(!sortbyBtn){
        sessionStorage.setItem('sortby', 'finishDateBtn');
    }
    return sortbyBtn;
}

//get/put the ID of the selected Note to the sessionStorage
function applySelectedNoteID(){
    let selectedNoteID = sessionStorage.getItem('selectedID');
    if(!selectedNoteID){
        sessionStorage.setItem('selectedID', JSON.stringify([]));
    }
    return selectedNoteID;
}
