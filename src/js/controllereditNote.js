"use strict";
/**
 * Created by claudia on 25.05.17.
 * Event-listeners on for the updateNote.html-file
 **/

function initEditNote(){
    applyStyleData();
    applyNoteData();
    applySelectedNoteID();
    getNoteToEdit();
};

//get the selected Note to the form to edit
function getNoteToEdit(title, description, rating, creatDate, finishDate, finished){
    let id = applySelectedNoteID();
    let selectedNote = getNoteByID(id);
    let stars = document.querySelectorAll('input[name="rating"]');

    title = selectedNote.title;
    description = selectedNote.description;
    rating = selectedNote.rating;
    creatDate = selectedNote.creatDate;
    finishDate = selectedNote.finishDate;
    finished = selectedNote.finished;
    id = selectedNote.id;

    //set the rating
    for(let i = 0; i < stars.length; i++) {
        if(stars[i].value == rating) {
            stars[i].checked = true;
        }
    }
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("fdate").value = finishDate;
};

window.onload = function () {
    //start all Functions from the storage
    initEditNote();

    document.getElementById("editBtn").addEventListener('click', updateNote);
    document.getElementById("cancelBtn").addEventListener('click', cancelNote);
    document.getElementById("deleteBtn").addEventListener('click', deleteNote);
};




