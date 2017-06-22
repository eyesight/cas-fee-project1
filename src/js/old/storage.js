"use strict";
/**
 * Created by claudia on 25.05.17.
 * Modul, welches alle Funktionalitäten beinhaltet, welche benötigt werden um die Notes zu verwalten
 *  z.B. folgende Funktionen
    GetNotes(orderBy, filterBy)
    AddNote(note)x
    UpdateNote(note)x
    GetNoteById(id)x
 **/
//TODO: Der Store darf kein Zugriff auf den DOM haben. -> sicherstellen
function addNewNote(title, description, rating, creatDate, finishDate, finished){
    let notes = localStorage.getItem("notes");
    let newId = 1;

    notes = JSON.parse(notes);
    let idMax = Math.max.apply(null, notes.map(function(a){return a.id;}));
    (!idMax || idMax === '-Infinity') ? newId = 1 : newId = idMax+1;

    let newNote = {
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
}

//get all the Data form the selection Note by the selected ID
function getNoteByID(id, allNotes){
    id = Number(id);
    let selectedNote={};
    for(let i = 0; i<allNotes.length; i++){
        if(id == allNotes[i].id){
            selectedNote = allNotes[i];
        }
    }
    return selectedNote;
}

//Sort-Functions - get the Data from the notes-object and return it sorted
//TODO: sortfunctions zusammenfassen
function sortByFinishDate(sortedData){
    let sortedNotes = sortedData.sort(function(a,b){
        return (a.finishDate > b.finishDate) ? 1 : ((b.finishDate > a.finishDate) ? -1 : 0);
    });
    return sortedNotes;
}

function sortByCreatedDate(sortedData){
    let sortedNotes = sortedData.sort(function(a,b){
        return (a.creatDate < b.creatDate) ? 1 : ((b.creatDate < a.creatDate) ? -1 : 0);
    });
    return sortedNotes;
}

function sortByImportance(sortedData){
    let sortedNotes = sortedData.sort(function(a,b){
        return (a.rating > b.rating) ? -1 : ((b.rating > a.rating) ? 1 : 0);
    });
    return sortedNotes;
}

//Function show just finished notes
function showFinishNotes(finishedData){
    let indexOfNotes = [];
    for(let i = 0; i<finishedData.length;i++){
        if(finishedData[i].finished == 0){
            finishedData.splice(i, 1);
        }
    }
    return finishedData;
}

//Update the edited note -> replace the old note with the edited stuff
function updateNote(notes, selectedNote, id, title, description, rating, creatDate, finishDate, finished){
    //get index of Object to remove it with splice
    let indexOfNote = 0;
    for(let i = 0; i<notes.length;i++){
        if(notes[i].id === selectedNote.id){
            indexOfNote = i;
        }
    }

    let editNote = {
        'id': id,
        'title': title,
        'description': description,
        'rating' : rating,
        'creatDate' : creatDate,
        'finishDate' : finishDate,
        'finished' : finished
    };

    //replace the updated note with splice
    if(notes){
        notes.splice(indexOfNote, 1, editNote);
        localStorage.setItem("notes", JSON.stringify(notes));
    }
    return notes;
}

//delete selected note
function deleteNote(id, selectedNote, notes){
    //get index of Object to remove it with splice
    let indexOfNote = 0;
    for(let i = 0; i<notes.length;i++){
        if(notes[i].id === selectedNote.id){
            indexOfNote = i;
        }
    }
    notes.splice(indexOfNote, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    return notes;
}
