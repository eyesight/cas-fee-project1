/**
 * Created by claudia on 25.05.17.
 * EventListeners for the index.html-file
 */

//Run EventListener
//TODO: Nachschlagen "Idiom: Immediately-invoked Function Expression (IIFE) I" -> in Folie aus Abend 4 und 5
//TODO: Idiom: Namespace Folie S. 64 Abend 5 -> Aufruf von versch. Funktionen, schön gliedern
//TODO: beim Klicken auf Button sollte die Page neu gerendert werden (nicht nur der erste Klick)
//TODO: die DOME-Registrierungen sollten nicht mit funktionen vermischt werden.
//Immediately-invokedFunctionExpression (IIFE)
;(function(window, document) {
    "use strict";

//Stylechanger: set in local-Storage
function styleChanger(){
    let actualStyle = applyStyleData();
    actualStyle = document.querySelector('#stylesAll').value;
    localStorage.setItem('styleClassName', actualStyle);
    document.querySelector('body').className = actualStyle;
}

//Function to mark finished-Buttons as finished and store it note in local-store
function noteIsFinished(e){
    let notesData = parseNoteData();
    let selectedID = Number(e.currentTarget.id);
    let finishBtnStatus = false;
    for(let i=0; i<notesData.length;i++){
        if(selectedID === notesData[i].id){
            finishBtnStatus = notesData[i].finished;
            if(finishBtnStatus === false){
                finishBtnStatus = true;
            }
            else {
                finishBtnStatus = false;
            }
            notesData[i].finished = finishBtnStatus;
        }
    }
    localStorage.setItem("notes", JSON.stringify(notesData));
    console.log('finished');
    return selectedID;
}
//when dome is loaded
window.onload = function () {
    //start all Functions applying the storage
    applyNoteData();
    applyStyleData();
    applySortByBtn();
    applySelectedNoteID();
    applyShowFinished();
    renderPage();

    //Set variables for EventListeners
    const body = document.querySelector('body');
    const btnsToSort = document.querySelectorAll('#sortBtns li');
    const btnShowFinished = document.querySelector('#showFinishedBtn');
    const btnsIfFinish = document.querySelectorAll('.note__finish-wrapper');
    const btnsEdit = document.querySelectorAll('.note__edit-wrapper');
    const optionsStyle = document.querySelectorAll('.style');

    //set Style
    let actualStyle = applyStyleData();
    body.addEventListener('change', styleChanger);
    document.querySelector('body').className = actualStyle;

    optionsStyle.forEach(function(e){
        if(e.value == actualStyle){
            e.selected = true;
        }
    });

    btnsToSort.forEach(function(e) {
        let sortbyBtn = applySortByBtn();
        //set class "active" on sort-link by data from session-store
        if (e.id === sortbyBtn) {
            e.classList.add("active");
        }
        e.addEventListener('click', function(el) {
            btnAddActive(el);
            renderPage();
        });
    });

    btnShowFinished.addEventListener('click', btnFinishedAddActive);

    //Function to add class to activated Sort-Button
    function btnAddActive(e) {
        //get ID of clicked Button/Link
        let btnClicked = e.currentTarget;
        let newSortBy = btnClicked.id;
        let allBtn = document.querySelectorAll('#sortBtns li');

        //add content of ID in sessionStore
        sessionStorage.setItem('sortby', newSortBy);

        //remove all classes "active" from sortby-list
        allBtn.forEach(function (el) {
            return el.classList.remove('active');
        });
        //add class "active" to clicked Button
        btnClicked.classList.add('active');

        return newSortBy;
    }

    //Function to add class to activated showFinished-Button
    function btnFinishedAddActive() {
        let showFinished = applyShowFinished();
        let finishBtn = document.querySelector('#showFinishedBtn');

        if (showFinished == 0) {
            sessionStorage.setItem('showFinished', '1');
        } else {
            sessionStorage.setItem('showFinished', '0');
        }

        if (finishBtn.classList.contains('active')) {
            renderPage();
            return finishBtn.classList.remove('active');
        }else{
            renderPage();
            return finishBtn.classList.add('active');
        }

    }
    //TODO: onlclick on HTML-Index ausprobieren
    //By click on finish-Button, start function "noteIsFinished"
    btnsIfFinish.forEach(function (el) {
        el.addEventListener('click', function (e) {
            noteIsFinished(e);
            renderPage();
            e.preventDefault();
        });
    });

    //Event-Listener get ID of note by click on edit Button
    btnsEdit.forEach(function (el) {
        el.addEventListener('click', function (e) {
            setSelectedNoteID(e);
            window.location.replace("editNote.html");
            e.preventDefault();
        });
    });
};
}(window, document));
