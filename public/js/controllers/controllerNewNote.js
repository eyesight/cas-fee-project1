/**
 * Created by claudia on 25.05.17.
 * Event-Listeners for the newNote.html-file
 **/
;(function (window, document) {
    "use strict";
    const client = window.services.restClient;

    //by clicking on cancel-button go back to index.html
    function cancelNote(e) {
        e.preventDefault();
        window.location.replace("index.html");
    }

    //get the selected Note to the form to edit
    function getNoteToEdit(selectedNoteID) {
        client.getNote(selectedNoteID).done(function (note) {
            //set the variables
            let stars = document.querySelectorAll('input[name="rating"]');
            let title = note.title;
            let description = note.description;
            let rating = note.rating;
            let finishDate = note.finishDate;

            //fill the form with value of selected Note
            for (let i = 0; i < stars.length; i++) {
                if (stars[i].value == rating) {
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
        //Set variables for EventListeners
        const btnSubmit = document.querySelector("#submitBtn");
        const btnCancelNote = document.querySelector("#cancelBtn");
        const body = document.querySelector('body');
        const selNoteId = sessionStorage.getItem('selectedID') || undefined;

        let notesObject = {};

        //variables for the form
        let validationText = "";

        //set the actual style on body
        body.className = shared.sessionValue('styleClassName', 'colorful');

        if (selNoteId) {
            //all Data of selected Note in form
            getNoteToEdit(selNoteId);
        }

        //EventListener
        btnSubmit.addEventListener('click', function (e) {
            e.preventDefault();

            let title = document.getElementById("title").value;
            let description = document.getElementById("description").value;
            let rating = document.querySelector('input[name="rating"]:checked').value;
            let finishDate = document.getElementById("fdate").value;

            (!title) ? validationText += ' Titel ' : notesObject.title = document.getElementById("title").value;
            (!description) ? validationText += ' Beschreibung ' : notesObject.description = document.getElementById("description").value;
            (!rating || rating == null) ? validationText += ' Rating ' : notesObject.rating = document.querySelector('input[name="rating"]:checked').value;
            (!finishDate) ? validationText += ' Datum ' : notesObject.finishDate = document.getElementById("fdate").value;

            //set ID of note as new, when no ID is selected
            if (validationText != "" || validationText != " ") {
                if (!selNoteId) {
                    console.log(selNoteId);
                    client.createNote(notesObject).then(element => {
                        debugger;
                        window.location.replace('index.html');
                    });
                } else {
                    notesObject.creatDate = moment().format();
                    notesObject.finished = false;

                    client.updateNote(selNoteId, notesObject).done(note => {
                        console.log('render' + note);
                    });
                }
                window.location.replace("index.html");
            } else {
                alert('Bitte folgende Felder ausfüllen:' + validationText);
            }
        });
        btnCancelNote.addEventListener('click', cancelNote);
    };
}(window, document));