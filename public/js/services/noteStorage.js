/**
 * Created by claudia on 20.06.17.
 */
const client = window.services.restClient;
const noteStorage = (function() {
    'use strict';

    function _addNewNote(newNote){
        client.createNote(newNote);
    }

    function _sortItems(dataToSort, sortBy, direction){
        (!direction) ? direction = 0 : direction;

        return dataToSort.sort(function(a, b){
            return (direction == 0) ?
                 (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0) :
                 (a[sortBy] < b[sortBy]) ? 1 : ((b[sortBy] < a[sortBy]) ? -1 : 0)
        });
    }

    function _showNotFinish(notes){
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
        sortItems: _sortItems,
        showNotFinish: _showNotFinish,
        storageGetAll: _storageGetAll
    };
}() || {});