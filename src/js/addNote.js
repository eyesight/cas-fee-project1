"use strict";
/**
 * Created by claudia on 27.05.17.
 */
//Notes initialiser, add new notes
//To-do: set testnotes from testnotes.js for empty storage
function getNoteData(){
    var notes = sessionStorage.getItem("notes");
    //if no notes exist, set new Object notes
    if(!notes){
        console.log('no notes set');
        notes = sessionStorage.setItem("notes", JSON.stringify([]));
    }
    return JSON.parse(notes);
}

function formatFinishDate(finishDate){
    finishDate = document.getElementById("fdate").value;
    finishDate = moment(finishDate).format('LL');
    return finishDate;
}

function addNewNote(title, description, rating, creatDate, finishDate, finished){
    var notes = getNoteData();
    title = document.getElementById("title").value;
    description = document.getElementById("description").value;
    rating = document.querySelector('input[name="rating"]:checked').value;
    creatDate = moment().format('LL');
    finishDate = formatFinishDate();
    finished = 0;
    var id = 0;


    var newNote = {
        'id': id,
        'title': title,
        'description': description,
        'rating' : rating,
        'creatDate' : creatDate,
        'finishDate' : finishDate,
        'finished' : finished
    };

    notes.push(newNote);
    sessionStorage.setItem("notes", JSON.stringify(notes));
};

document.querySelector("#submitBtn").addEventListener('click', addNewNote);




