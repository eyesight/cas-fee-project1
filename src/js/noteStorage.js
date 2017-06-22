/**
 * Created by claudia on 20.06.17.
 */

var noteStorage = (function() {
    'use strict';
    //have notes as global object
    let notesObject = localStorage.getItem("notes");

    function _addNewNote(title, description, rating, creatDate, finishDate, finished){
        let newId = 1;
        newId = _creatID(newId, notesObject);
        //TODO: Note-Objects belongs to the view
        let newNote = {
            'id': newId,
            'title': title,
            'description': description,
            'rating' : rating,
            'creatDate' : creatDate,
            'finishDate' : finishDate,
            'finished' : finished
        };
        let addedNote = _setNotesToStorage(newNote);
        return addedNote;
    }

    function _setNotesToStorage(notes){
        return localStorage.setItem("notes", JSON.stringify(notes));
    }

    //get all the Data form the selection Note by the selected ID
    function _getNoteByID(id, allNotes){
        id = Number(id);
        let selectedNote={};
        for(let i = 0; i<allNotes.length; i++){
            if(id == allNotes[i].id){
                selectedNote = allNotes[i];
            }
        }
        return selectedNote;
    }
    //TODO: evt. absteigende Funktion machen (importance ist momentan falsch)
    function _sortNotes(dataToSort, sortBy){
        let sortedNotes = dataToSort.sort(function(a,b){
            return (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0);
        });
        return sortedNotes;
    }

    function _showFinishNotes(notes, finishState){
        let indexOfNotes = [];
        for(let i = 0; i<notes.length;i++){
            if(notes[i].finished == 0){
                notes.splice(i, 1);
            }
        }
        console.log(notes);
        return notes;
    }

    function _editNote(notes, selectedNote, id, title, description, rating, creatDate, finishDate, finished){
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

    function _deleteNote(id, notes){
        //get index of Object to remove it with splice
        let selectedNote = _getNoteByID(id);
        let indexOfNote = 0;
        for(let i = 0; i<notes.length;i++){
            if(notes[i].id === selectedNote.id){
                indexOfNote = i;
            }
        }
        notes.splice(indexOfNote, 1);
        notes = _setNotesToStorage(notes);
        return notes;
    }

    function _creatID(newId, notes){
        let idMax = Math.max.apply(null, notes.map(function(a){return a.id;}));
        (!idMax || idMax === '-Infinity') ? newId = 1 : newId = idMax+1;
        return idMax;
    }

    function _parsedNotes(notes){
        let notesParsed = JSON.parse(notes);
        return notesParsed;
    }

    return {
        addNewNote: _addNewNote,
        getNoteByID: _getNoteByID,
        sortNotes: _sortNotes,
        showFinishNotes: _showFinishNotes,
        setNotesToStorage: _setNotesToStorage,
        editNote: _editNote,
        deleteNote: _deleteNote,
        parsedNotes: _parsedNotes,
        creatID: _creatID
    };
}() || {});