/**
 * Created by claudia on 20.06.17.
 */
const client = window.services.restClient;
const noteStorage = (function() {
    'use strict';

    function _addNewNote(newNote){
        client.createNote(newNote);
    }

    function _updateNotesInStorage(notes){
        localStorage.setItem("notes", JSON.stringify(notes));
        return notes;
    }

    //TODO: evt. absteigende Funktion machen (importance ist momentan falsch)
    function _sortNotes(dataToSort, sortBy){
        return dataToSort.sort(function(a, b){
            return (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0);
        });
    }

    function _showNotFinishNotes(notes){
        let indexOfNotes = [];

        for(let i = 0; i<notes.length;i++){
            if(!notes[i].finished) {
                indexOfNotes.push(notes[i]);
            }
        }
        return indexOfNotes;
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

    function _parsedNotes(notes){
        let notesParsed = JSON.parse(notes);
        return notesParsed;
    }

    function storageGetAll(){
        return client.ajax("GET","/notes/",undefined);

    }

    return {
        addNewNote: _addNewNote,
        //getNoteByID: _getNoteByID,
        sortNotes: _sortNotes,
        showNotFinishNotes: _showNotFinishNotes,
        updateNotesInStorage: _updateNotesInStorage,
        deleteNote: _deleteNote,
        parsedNotes: _parsedNotes,
        //creatID: _creatID,
        storageGetAll:storageGetAll
    };
}() || {});