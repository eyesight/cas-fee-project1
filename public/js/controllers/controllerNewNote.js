/**
 * Created by claudia on 25.05.17.
 * Event-Listeners for the newNote.html-file
 **/
//Immediately-invokedFunctionExpression (IIFE)
;(function(window, document) {
    "use strict";
    const client = window.services.restClient;

    //by clicking on cancel-button go back to index.html
    function cancelNote(e){
        window.location.replace("index.html");
        e.preventDefault();
    }

    //get the selected Note to the form to edit
    function getNoteToEdit(selectedNoteID){
        client.getNote(selectedNoteID).done(function (note) {
            //set the variables
            let stars = document.querySelectorAll('input[name="rating"]');
            let title = note.title;
            let description = note.description;
            let rating = note.rating;
            let creatDate = note.creatDate;
            let finishDate = note.finishDate;
            let finished = note.finished;
            let id = note._id;

            //fill the form with value of selected Note
            for(let i = 0; i < stars.length; i++) {
                if(stars[i].value == rating) {
                    stars[i].checked = true;
                }
            }

            document.getElementById("title").value = title;
            document.getElementById("description").value = description;
            document.getElementById("fdate").value = finishDate;
        });

    }

    //when dome is loaded
    window.onload = function () {

        shared.initNoteData();
        //Set variables for EventListeners
        const btnSubmit = document.querySelector("#submitBtn");
        const btnCancelNote = document.querySelector("#cancelBtn");
        const body = document.querySelector('body');
        const selNoteId = sessionStorage.getItem('selectedID') || undefined;

        let allNotes = localStorage.getItem("notes");
        allNotes = JSON.parse(allNotes);
        let notesObject = {};

        //variables for the form
        let validationText = "";

        //set the actual style on body
        body.className = shared.sessionValue('styleClassName', 'colorful');

        if(selNoteId){
            console.log(selNoteId);
            //all Data of selected Note in form
            getNoteToEdit(selNoteId);
        }


        //EventListener
        btnSubmit.addEventListener('click', function(e){

            let title = document.getElementById("title").value;
            let description = document.getElementById("description").value;
            let rating = document.querySelector('input[name="rating"]:checked').value;
            let finishDate = document.getElementById("fdate").value;
            let newId = 0;

            newId = noteStorage.creatID(newId, allNotes);
            (!title) ? validationText += ' Titel ' : notesObject.title = document.getElementById("title").value;
            (!description) ? validationText += ' Beschreibung ' : notesObject.description = document.getElementById("description").value;
            (!rating) ? validationText += ' Rating ' : notesObject.rating = document.querySelector('input[name="rating"]:checked').value;
            (!finishDate) ? validationText += ' Datum ' : notesObject.finishDate = document.getElementById("fdate").value;

            //set ID of note as new, when no ID is selected
            if(selNoteId != undefined){
                notesObject.id = selNoteId;
            }else{
                notesObject.id = newId || 0;
                notesObject.creatDate = moment().format();
                notesObject.finished = false;
            }


            if(validationText !="" || validationText != " "){
                e.preventDefault(notesObject);

                console.log(notesObject);
                /*client.createNote(notesObject).then( element => {
                    debugger;
                    window.location.replace('index.html');
                });*/

                //(selNoteId) ?
                    client.updateNote(selNoteId, notesObject).done(note => {
                        console.log('render' + note);
                    });

            /*} else{
                alert('Bitte folgende Felder ausfüllen:'+ validationText);*/

            }
        });


        btnCancelNote.addEventListener('click', cancelNote);
    };
}(window, document));