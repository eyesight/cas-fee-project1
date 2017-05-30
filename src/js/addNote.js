"use strict";
/**
 * Created by claudia on 27.05.17.
 */
//Notes initialiser, add new notes
//To-do: set testnotes from testnotes.js for empty storage
function formatFinishDate(finishDate){
    finishDate = document.getElementById("fdate").value;
    finishDate = moment(finishDate).format('LL');
    return finishDate;
}

function addNewNote(title, description, rating, creatDate, finishDate, finished){
    var notes = getNoteData();
    var idOfNotes = notes.map(function(a){return a.id++;});
    var notesMaxID=1;
    if(!notes){
        notesMaxID=1;
    }else{
        notesMaxID= Math.max.apply(Math, notes);
    }


    title = document.getElementById("title").value;
    description = document.getElementById("description").value;
    rating = document.querySelector('input[name="rating"]:checked').value;
    creatDate = moment().format('LL');
    finishDate = formatFinishDate();
    finished = 0;


    var newNote = {
        'id': notesMaxID,
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






