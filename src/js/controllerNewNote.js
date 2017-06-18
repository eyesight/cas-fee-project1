/**
 * Created by claudia on 25.05.17.
 * Event-Listeners for the newNote.html-file
 **/
//TODO: Add und Edit-Note gehören zusammen: evt. via Handlebars
//Immediately-invokedFunctionExpression (IIFE)
;(function(window, document) {
    "use strict";

    //when dome is loaded
    window.onload = function () {
        //Set variables for EventListeners
        const btnSubmitNewNote = document.querySelector("#submitBtn");
        const btnCancelNote = document.querySelector("#cancelBtn");
        const body = document.querySelector('body');

        //set the actual style on body
        body.className = applyStyleData();

        //EventListener
        btnSubmitNewNote.addEventListener('click', function(e){
            let title = document.getElementById("title").value;
            let description = document.getElementById("description").value;
            let rating;
            let finishDate = document.getElementById("fdate").value;
            let creatDate = new Date();
            let finished = false;
            let validationText = "";

            //TODO: Validation, window.location.replace(...);
            (!title) ? validationText += ' Titel ' : title = document.getElementById("title").value;
            (!description) ? validationText += ' Beschreibung ' : description = document.getElementById("description").value;
            (!rating) ? rating = document.querySelector('input[name="rating"]:checked').value : validationText += ' Rating ';
            (!finishDate) ? validationText += ' Datum ' : finishDate = document.getElementById("fdate").value;

            if(title !="" && description!="" && rating != undefined && finishDate !=""){
                addNewNote(title, description, rating, creatDate, finishDate, finished);
                window.location.replace('index.html');
                e.preventDefault();
            } else{
                alert('Bitte folgende Felder ausfüllen:'+ validationText);
            }
        });
        btnCancelNote.addEventListener('click', cancelNote);
    };
    //by clicking on cancel-button go back to index.html
    function cancelNote(e){
        window.location.replace("index.html");
        e.preventDefault();
    }
}(window, document));