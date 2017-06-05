"use strict";
/**
 * Created by claudia on 27.05.17.
 */
//Notes initialiser, add new notes
//To-do: build a function to get better formatted dates and maybe a counter
function formatFinishDate(finishDate){
    finishDate = document.getElementById("fdate").value;
    finishDate = moment(finishDate).format('LL');
    return finishDate;
}

//Add the new note
function addNewNote(title, description, rating, creatDate, finishDate, finished){
    var notes = getNoteData();
    var newId = 1;
    if (!notes){
        localStorage.setItem("notes", JSON.stringify([]));
        notes = localStorage.getItem("notes");
    }
    var notes = JSON.parse(notes);
    var idMax = Math.max.apply(null, notes.map(function(a){return a.id;}));
    (!idMax || idMax == '-Infinity') ? newId = 1 : newId = idMax+1;
    title = document.getElementById("title").value;
    description = document.getElementById("description").value;
    rating = document.querySelector('input[name="rating"]:checked').value;
    creatDate = new Date();
    finishDate = document.getElementById("fdate").value;
    finished = 0;


    var newNote = {
        'id': newId,
        'title': title,
        'description': description,
        'rating' : rating,
        'creatDate' : creatDate,
        'finishDate' : finishDate,
        'finished' : finished
    };
    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
};

//get the selected Note to the form to edit
function getNoteToEdit(id, title, description, rating, creatDate, finishDate, finished){
    var selectedNote = getSelectedNote();

    title = selectedNote.title;
    description = selectedNote.description;
    rating = selectedNote.rating;
    creatDate = selectedNote.creatDate;
    finishDate = selectedNote.finishDate;
    finished = selectedNote.finished;
    id = selectedNote.id;

    //set the rating
    var stars = document.querySelectorAll('input[name="rating"]');

    for(var i = 0; i < stars.length; i++) {
        if(stars[i].value == rating) {
            stars[i].checked = true;
        }
    }
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("fdate").value = finishDate;
}

//Update the edited note -> replace the old note with the edited stuff
function editNote(id, title, description, rating, creatDate, finishDate, finished){
    var selectedNote = getSelectedNote();
    var notes = getNoteDataParsed();

    //get index of Object to remove it with splice
    var indexOfNote = 0;
    for(var i = 0; i<notes.length;i++){
        if(notes[i].id == selectedNote.id){
            indexOfNote = i;
        }
    }

    id = selectedNote.id;
    title = document.getElementById("title").value;
    description = document.getElementById("description").value;
    rating = document.querySelector('input[name="rating"]:checked').value;
    creatDate = selectedNote.creatDate;
    finishDate = document.getElementById("fdate").value;
    finished = selectedNote.finished;

    var editNote = {
        'id': id,
        'title': title,
        'description': description,
        'rating' : rating,
        'creatDate' : creatDate,
        'finishDate' : finishDate,
        'finished' : finished
    };

    //replace the updated note with splice
    notes.splice(indexOfNote, 1, editNote);

    localStorage.setItem("notes", JSON.stringify(notes));
    window.location.replace("index.html");
}

//delete selected note
//To-do: add a Page to ask if you are shure between
function deleteNote(){
    var selectedNote = getSelectedNote();
    var notes = getNoteDataParsed();

    //get index of Object to remove it with splice
    var indexOfNote = 0;
    for(var i = 0; i<notes.length;i++){
        if(notes[i].id == selectedNote.id){
            indexOfNote = i;
        }
    }

    notes.splice(indexOfNote, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    window.location.replace("index.html");
}

//by clicking on cancel-button go back to index.html
function cancelNote(){
    window.location.replace("index.html");
}






