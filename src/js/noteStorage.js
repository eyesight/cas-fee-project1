/**
 * Created by claudia on 20.06.17.
 */

const noteStorage = (function() {
    'use strict';
    //have notes as global object
    //let allNotes = localStorage.getItem("notes");

    function _addNewNote(newNote, allNotes){
        allNotes.push(newNote);
        _updateNotesInStorage(allNotes);
    }

    function _updateNotesInStorage(notes){
        localStorage.setItem("notes", JSON.stringify(notes));
        return notes;
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
        return dataToSort.sort(function(a, b){
            return (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0);
        });
    }

    function _showFinishNotes(notes, finishState){
        let indexOfNotes = [];
        for(let i = 0; i<notes.length;i++){
            if(notes[i].finished == false){
                notes.splice(i, 1);
            }
        }
        console.log(notes);
        return notes;
    }

    function _editNote(editNote, notes){
        //get index of Object to remove it with splice
        let indexOfNote = 0;
        for(let i = 0; i<notes.length;i++){
            if(notes[i].id == editNote.id){
                indexOfNote = i;
            }
        }
        //replace the updated note with splice
        if(notes){
            notes.splice(indexOfNote, 1, editNote);
            _updateNotesInStorage(notes);
        }
        return;
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
        notes = _updateNotesInStorage(notes);
        return notes;
    }

    function _creatID(newId, notes){
        let idMax = Math.max.apply(null, notes.map(function(a){return a.id;}));
        (!idMax || idMax === '-Infinity') ? newId = 1 : newId = idMax+1;
        return newId;
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
        updateNotesInStorage: _updateNotesInStorage,
        editNote: _editNote,
        deleteNote: _deleteNote,
        parsedNotes: _parsedNotes,
        creatID: _creatID
    };
}() || {});