/**
 * Created by claudia on 20.06.17.
 */
;(function(window, document) {
    "use strict";
    const body = document.querySelector('body');
    const styleSelector = document.querySelector('#stylesAll');

    function initNoteData(){
        let notes = localStorage.getItem('notes');
        //if no notes exist, set new Object notes
        if(!notes){
            notes = localStorage.setItem('notes', JSON.stringify([]));
            //get the default Notes, when nothing exists
            notes = localStorage.setItem('notes', JSON.stringify(defaultnotes));
        }
        return notes;
    }
    let notesObject = localStorage.getItem("notes");
    let notesData = JSON.parse(notesObject);

    //get the class Name from the storage to change the style (classname is set in the body-tag)
    function applyStyleData(){
        let actualStyle = localStorage.getItem('styleClassName');
        if(!actualStyle){
            localStorage.setItem('styleClassName', 'colorful');
        }
        return actualStyle;
    }

    //get the stored sortBy-Element - so the sort-function doesn't change by adding new note.
    function applySortByBtn(){
        let sortbyBtn = sessionStorage.getItem('sortby');
        //if there isn't clicked on a sortby-link, initial Item in sessionStore and take "sort by finished Date" as default sort-function
        if(!sortbyBtn){
            sessionStorage.setItem('sortby', 'finishDateBtn');
        }
        return sortbyBtn;
    }

    window.onload = function () {
        initNoteData();
        applyStyleData();
        applySortByBtn();
        noteApp.view.setHandlebarsHelper();
        noteApp.render.renderPage(notesData);

        let indexControl = indexController.make(element1, body);
    }
}(window, document));