/**
 * Created by claudia on 20.06.17.
 */
;(function (window, document) {
    "use strict";
    const client = window.services.restClient;

    function render(template, noteswrap, sortby, finishState) {
        const compiledTemp = Handlebars.compile(template);
        client.getNotes("/notes").done(function (notes) {
            //sort the notes by sortby-value of session-store
            notes = noteStorage.sortNotes(notes, sortby);
            //if button is clicked, show also the notes, which are finished. Otherwise just show not finished items
            (!finishState) ? notes = noteStorage.showNotFinishNotes(notes) : notes ;

            let generatedNote = compiledTemp(notes);
            noteswrap.innerHTML = generatedNote;
        });
    }

    //Stylechanger: set in local-Storage
    function styleChanger() {
        let actualStyle = shared.sessionValue('styleClassName', 'colorful');
        actualStyle = document.querySelector('#stylesAll').value;
        sessionStorage.setItem('styleClassName', actualStyle);
        document.querySelector('body').className = actualStyle;
    }

    function getSelectedIDRemoveLetters(id) {
        id = Number(id.match(/\d+/g));
        return id;
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

    function showFinished(targetElement) {
        let allNotes = document.querySelectorAll('.note__container');
        let finishedNotes = document.querySelectorAll('button.active');

        for(let i = 0; i<finishedNotes.length; i++){
            console.log(i.parentNode);
        }

        console.log(allNotes);
        console.log(finishedNotes);
    }

    window.onload = function () {
        shared.initNoteData();
        shared.sessionValue('styleClassName', 'colorful');
        shared.sessionValue('sortby', 'finishDate');
        shared.sessionValue('showFinished', false);
        sessionStorage.removeItem('selectedID');

        view.setHandlebarsHelper();

        //Set variables for EventListeners
        const body = document.querySelector('body');
        const btnsToSort = document.querySelectorAll('#sortBtns li');
        const btnShowFinished = document.querySelector('#showFinishedBtn');
        const optionsStyle = document.querySelectorAll('.style');

        let sortbyValue = sessionStorage.getItem('sortby');
        let finishedState = false;

        //variables to render page
        const template = document.querySelector('#noteTemplate').innerHTML;
        const notesWrapper = document.querySelector('#notesContainer');

        render(template, notesWrapper, sortbyValue, finishedState);

        //set Style
        let actualStyle = shared.sessionValue('styleClassName', 'colorful');
        body.addEventListener('change', styleChanger);
        document.querySelector('body').className = actualStyle;


        optionsStyle.forEach(function (e) {
            if (e.value == actualStyle) {
                e.selected = true;
            }
        });

        btnsToSort.forEach(function (e) {
            //set class "active" on sort-link by data from session-store
            if (e.id === sortbyValue) {
                e.classList.add("active");
            }
            e.addEventListener('click', function (el) {
                el.preventDefault();
                sortbyValue = AddActiveByBtn(btnsToSort, el);
                render(template, notesWrapper, sortbyValue);
            });
        });

        //show just finished Notes
        //TODO: vereinfachen
        btnShowFinished.addEventListener('click', function (e) {
            if (finishedState == false) {
                finishedState = true;
                console.log('ff'+finishedState);
                btnShowFinished.classList.add('active');
                render(template, notesWrapper, sortbyValue, finishedState);
            } else {
                finishedState = false;
                btnShowFinished.classList.remove('active');
                render(template, notesWrapper, sortbyValue, finishedState);
            }
        });

        notesWrapper.addEventListener("click", function (el) {
            //By click on finish-Button, update Note as finished in database
            if (el.target.classList.contains('note__btn-finish')) {
                client.getNote(el.target.id).done(note => {
                    //TODO: funktion machen für setToFinished
                    let noteID = note._id;
                    if (note.finished) {
                        note.finished = false;
                    } else {
                        note.finished = true;
                    }
                    client.updateNote(noteID, note).done(notes => {
                        render(template, notesWrapper, sortbyValue, finishedState);
                    });
                });
            } else if (el.target.classList.contains('note__btn-edit')) {
                //By click on edit-Btn, set ID in session Store, switch page
                let selectedID = el.target.id;
                sessionStorage.setItem('selectedID', selectedID);
                window.location.replace("newNote.html");
            } else if(el.target.classList.contains('note__delete-btn')){
                client.deleteNote(el.target.parentNode.id).done(render(template, notesWrapper, sortbyValue, finishedState));
            }
            else {
                console.log(false);
            }
        });
    }
}(window, document));