"use strict";
/**
 * Created by claudia on 27.05.17.
 */
//Notes initialiser, add new notes
function formatFinishDate(finishDate){
    finishDate = document.getElementById("fdate").value;
    finishDate = moment(finishDate).format('LL');
    return finishDate;
}

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






