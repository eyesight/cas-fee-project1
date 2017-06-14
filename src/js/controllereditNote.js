/**
 * Created by claudia on 25.05.17.
 * Event-listeners on for the updateNote.html-file
 **/
//Immediately-invokedFunctionExpression (IIFE)
;(function(window, document) {
    "use strict";

//get the selected Note to the form to edit
function getNoteToEdit(selectedNote){
    let stars = document.querySelectorAll('input[name="rating"]');

    let title = selectedNote.title;
    let description = selectedNote.description;
    let rating = selectedNote.rating;
    let creatDate = selectedNote.creatDate;
    let finishDate = selectedNote.finishDate;
    let finished = selectedNote.finished;
    let id = selectedNote.id;

    //set the rating
    for(let i = 0; i < stars.length; i++) {
        if(stars[i].value == rating) {
            stars[i].checked = true;
        }
    }
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("fdate").value = finishDate;
}

//when dome is loaded
window.onload = function() {
    //Set variables for EventListeners
    const btnCancelNote = document.querySelector("#cancelBtn");
    const btnDeleteNote = document.querySelector("#deleteBtn");
    const btnEditNote = document.querySelector('#editBtn');
    const body = document.querySelector('body');

    //start all Functions appling storage
    applyNoteData();
    applySelectedNoteID();

    //set the actual style on body
    body.className = applyStyleData();

    //set global variables
    let allNotes = parseNoteData();
    let id = applySelectedNoteID();
    let selectedNote = getNoteByID(id, allNotes);

    //all Data of selected Note in form
    getNoteToEdit(selectedNote);

    //applying EventListener
    btnCancelNote.addEventListener('click', cancelNote);
    btnDeleteNote.addEventListener('click', function(){
        let id = applySelectedNoteID();
        let notes = parseNoteData();
        let selectedNote = getNoteByID(id, notes);

        deleteNote(id, selectedNote, notes);
        window.location.replace("index.html");
    });

    btnEditNote.addEventListener('click', function () {

        id = selectedNote.id;
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let rating = document.querySelector('input[name="rating"]:checked').value;
        let creatDate = selectedNote.creatDate;
        let finishDate = document.getElementById("fdate").value;
        let finished = selectedNote.finished;

        updateNote(allNotes, selectedNote, id, title, description, rating, creatDate, finishDate, finished);
        window.location.replace("index.html");
    });
};

//by clicking on cancel-button go back to index.html
function cancelNote(){
    window.location.replace("index.html");
}

}(window, document));