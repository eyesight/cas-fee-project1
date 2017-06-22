/**
 * Created by claudia on 20.06.17.
 */
;(function(window, document) {
    "use strict";

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

    function render(template, noteswrap, notesData, sortby){
        //get sortBy from sessionStore by function applySortByBtn (from storage)
        notesData = noteStorage.sortNotes(notesData, sortby);

        const compiledTemp = Handlebars.compile(template);
        let generatedNote = compiledTemp(notesData);
        noteswrap.innerHTML = generatedNote;
    }

    //get the class Name from the storage to change the style (classname is set in the body-tag)
    function getStyleData(){
        let actualStyle = localStorage.getItem('styleClassName') ;
        if(!actualStyle){
            localStorage.setItem('styleClassName', 'colorful');
        }
        return actualStyle;
    }

    //get the stored sortBy-Element - so the sort-function doesn't change by adding new note.
    function getSortByBtn(){
        let sortbyBtn = sessionStorage.getItem('sortby');
        //if there isn't clicked on a sortby-link, initial Item in sessionStore and take "sort by finished Date" as default sort-function
        if(!sortbyBtn){
            sessionStorage.setItem('sortby', 'finishDate');
        }
        return sortbyBtn;
    }

    //Stylechanger: set in local-Storage
    function styleChanger(){
        let actualStyle = getStyleData();
        actualStyle = document.querySelector('#stylesAll').value;
        localStorage.setItem('styleClassName', actualStyle);
        document.querySelector('body').className = actualStyle;
    }

    //get/put the ID of the selected Note to the sessionStorage
    function getSelectedNoteID(){
        let selectedNoteID = sessionStorage.getItem('selectedID');
        if(!selectedNoteID){
            sessionStorage.setItem('selectedID', JSON.stringify([]));
        }
        return selectedNoteID;
    }

    // set/get finished btn
    function getShowFinished(){
        let showFinished = sessionStorage.getItem('showFinished');
        //if there isn't clicked on show-finished-Btn, initial Item in sessionStore
        if(!showFinished) {
            sessionStorage.setItem('showFinished', '0');
        }
        return showFinished;
    }

    //Event-Listener get ID of clicked edit Button
    function setSelectedNoteID(e){
        let selectedID = e.currentTarget.id;

        //remove all text-elements of the ID - ID is just a number
        selectedID = Number(selectedID.match(/\d+/g));
        sessionStorage.setItem('selectedID', selectedID);
        return selectedID;
    }

    function AddActiveByBtn(buttonParent, e) {
        //get ID of clicked Button/Link
        let btnClicked = e.currentTarget;
        let newSortBy = btnClicked.id;

        //add content of ID in sessionStore
        sessionStorage.setItem('sortby', newSortBy);

        //remove all classes "active" from sortby-list
        buttonParent.forEach(function (el) {
            return el.classList.remove('active');
        });
        //add class "active" to clicked Button
        btnClicked.classList.add('active');

        return newSortBy;
    }

    //TODO: Funktion besser machen
    function sessionValue(key, value, def = undefined){
        if(value)
        {
            sessionStorage.setItem(key, value);
            return;
        }
        return sessionStorage.getItem(key) || def;
    }

    //Function to mark finished-Buttons as finished and store it note in local-store
    function noteSetToFinished(notesData, selectedID, key){
        let finishBtnStatus = false;
        for(let i=0; i<notesData.length;i++){
            if(selectedID == notesData[i].id){
                finishBtnStatus = notesData[i][key];
                console.log(finishBtnStatus);
                if(finishBtnStatus === false){
                    finishBtnStatus = true;
                }
                else {
                    finishBtnStatus = false;
                }
                notesData[i][key] = finishBtnStatus;
            }
        }
        noteStorage.setNotesToStorage(notesData);
    }



    window.onload = function () {
        initNoteData();
        getStyleData();
        getSortByBtn();
        getShowFinished();

        noteApp.view.setHandlebarsHelper();

        //Set variables for EventListeners
        const body = document.querySelector('body');
        const btnsToSort = document.querySelectorAll('#sortBtns li');
        const btnShowFinished = document.querySelector('#showFinishedBtn');
        const btnsEdit = document.querySelectorAll('.note__edit-wrapper');
        const optionsStyle = document.querySelectorAll('.style');
        const styleSelector = document.querySelector('#stylesAll');

        let notesObject = localStorage.getItem("notes");
        let notesData = JSON.parse(notesObject);
        let sortby = sessionStorage.getItem('sortby');

        //variables to render page
        const template = document.querySelector('#noteTemplate').innerHTML;
        const notesWrapper = document.querySelector('#notesContainer');

        render(template, notesWrapper, notesData);

        //set Style
        let actualStyle = getStyleData();
        body.addEventListener('change', styleChanger);
        document.querySelector('body').className = actualStyle;


        optionsStyle.forEach(function(e){
            if(e.value == actualStyle){
                e.selected = true;
            }
        });

        btnsToSort.forEach(function(e) {
            //set class "active" on sort-link by data from session-store
            if (e.id === sortby) {
                e.classList.add("active");
            }
            e.addEventListener('click', function(el) {
                el.preventDefault();
                sortby = AddActiveByBtn(btnsToSort, el);
                render(template, notesWrapper, notesData, sortby);
            });
        });

        //show just finished Notes
        btnShowFinished.addEventListener('click', function(e){
            let showFinishedNotes = sessionStorage.getItem('showFinished');
            if(showFinishedNotes == '0'){
                sessionStorage.setItem('showFinished', '1');
                btnShowFinished.classList.add('active');
                notesData = noteStorage.showFinishNotes(notesData);
            }else{
                sessionStorage.setItem('showFinished', '0');
                btnShowFinished.classList.remove('active');
                notesData = JSON.parse(notesObject);
            }
            render(template, notesWrapper, notesData, sortby);
            e.preventDefault();
        });

        //By click on finish-Button, update Note as finished in database
        notesWrapper.addEventListener('click', function () {
            const finishedBtn = document.querySelectorAll('.note__finish-wrapper');
            finishedBtn.forEach(function (el) {
                el.addEventListener('click', function (e) {
                    let selectedID = Number(e.currentTarget.id);
                    noteSetToFinished(notesData, selectedID, 'finished')
                    render(template, notesWrapper, notesData, sortby);
                }, false);
            });
        });
    }
}(window, document));

/*
let form = document.querySelector('form');

form.onclick = function(event) {
    event.target.style.backgroundColor = 'yellow';

    alert("target = " + event.target.tagName + ", this=" + this.tagName);

    event.target.style.backgroundColor = '';
};*/
