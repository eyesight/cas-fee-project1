"use strict";
/**
 * Created by claudia on 25.05.17.
 * functions to get Data, which is stored in the localStorage or the sessionSorage
 **/


//Get the the data from the localStorage - all Notes, when nothing is in it, take the default notes form file "testnotes.js"
function getNoteData(){
    var notes = localStorage.getItem('notes');
    //if no notes exist, set new Object notes
    if(!notes){
        notes = localStorage.setItem('notes', JSON.stringify([]));
        notes = localStorage.setItem('notes', JSON.stringify(defaultnotes));
    }
    return notes;
}

//function to parse the data from the localStorage
function getNoteDataParsed(){
    var notes = getNoteData();
    return JSON.parse(notes);
}

//get the class Name from the storage to change the style (classname is set in the body-tag)
function getStyleData(){
    var actualStyle = localStorage.getItem('styleClassName');
    if(!actualStyle){
        localStorage.setItem('styleClassName', 'colorful');
    }

    document.querySelector('body').className = actualStyle;
    return actualStyle;
}

//get the stored sortBy-Element - so the sort-function doesn't change by adding new note.
function getSortByBtn(){
    var sortbyBtn = sessionStorage.getItem('sortby');
    //if there isn't clicked on a sortby-link, initial Item in sessionStore and take "sort by finished Date" as default sort-function
    if(!sortbyBtn){
        sessionStorage.setItem('sortby', 'finishDateBtn');
        sortByFinishDate();
    }
    document.querySelectorAll("#sortBtns li").forEach(function(e){
        if(e.id == sortbyBtn){
            e.classList.add("active");
        }
    });
    return sortbyBtn;
}

//get/put the ID of the selected Note to the sessionStorage
function getSelectedNoteID(){
    var selectedNoteID = sessionStorage.getItem('selectedID');
    if(!selectedNoteID){
        sessionStorage.setItem('selectedID', JSON.stringify([]));
    }
    return selectedNoteID;
}

//get all the Data form the selection Note by the selected ID
function getSelectedNote(){
    var allNotes = getNoteDataParsed();
    var selectedID = getSelectedNoteID();
    var selectedNote={};
    for(var i = 0; i<allNotes.length; i++){
        if(selectedID == allNotes[i].id){
            selectedNote = allNotes[i];
        }
    }
    return selectedNote;
}

