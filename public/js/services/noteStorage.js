/**
 * Created by claudia on 20.06.17.
 */
const client = window.services.restClient;
const noteStorage = (function() {
    'use strict';

    function _addNewNote(newNote){
        client.createNote(newNote);
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

    function _storageGetAll(){
        return client.ajax("GET","/notes/",undefined);

    }

    return {
        addNewNote: _addNewNote,
        sortNotes: _sortNotes,
        showNotFinishNotes: _showNotFinishNotes,
        storageGetAll: _storageGetAll
    };
}() || {});