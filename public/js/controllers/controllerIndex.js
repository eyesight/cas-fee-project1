/**
 * Created by claudia on 20.06.17.
 */
;(function (window, document) {
    "use strict";
    const client = window.services.restClient;

    function render(template, noteswrap, sortby, finishState, sortDirection) {
        const compiledTemp = Handlebars.compile(template);
        client.getNotes("/notes").done(function (notes) {
            //if button is clicked, show also the notes, which are finished. Otherwise just show not finished items
            (!finishState) ? notes = noteStorage.showNotFinish(notes) : notes;

            //sort the notes by sortby-value of session-store
            notes = noteStorage.sortItems(notes, sortby, sortDirection);

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

    //by click on Button, set sortby to sessionStorage, add class active, return sortby-content
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

    window.onload = function () {
        shared.sessionValue('styleClassName', 'colorful');
        shared.sessionValue('sortby', 'finishDate');
        shared.sessionValue('showFinished', false);
        shared.sessionValue('finishStatus', false);
        sessionStorage.removeItem('selectedID');

        view.setHandlebarsHelper();

        //Set variables for EventListeners
        const body = document.querySelector('body');
        const btnsToSort = document.querySelectorAll('#sortBtns li');
        const btnShowFinished = document.querySelector('#showFinishedBtn');
        const optionsStyle = document.querySelectorAll('.style');

        let sortbyValue = sessionStorage.getItem('sortby');
        let finishedState = false;
        let sortDirection = 0;

        //variables to render page
        const template = document.querySelector('#noteTemplate').innerHTML;
        const notesWrapper = document.querySelector('#notesContainer');

        render(template, notesWrapper, sortbyValue, finishedState, sortDirection);

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
                sortDirection = (sortDirection==0) ? sortDirection = 1 : sortDirection = 0;
                render(template, notesWrapper, sortbyValue, finishedState, sortDirection);
                console.log(sortDirection);
            });
        });

        //show not finished notes, by click on show-finished-button show all notes
        btnShowFinished.addEventListener('click', function (e) {
            if (finishedState == false) {
                sessionStorage.setItem('finishStatus', true);
                finishedState = true;
                btnShowFinished.classList.add('active');
                render(template, notesWrapper, sortbyValue, finishedState, sortDirection);
            } else {
                sessionStorage.setItem('finishStatus', false);
                finishedState = false;
                btnShowFinished.classList.remove('active');
                render(template, notesWrapper, sortbyValue, finishedState, sortDirection);
            }
        });
        //find clicked Button by bubbling the classes to register EventListeners
        notesWrapper.addEventListener("click", function (el) {
            //By click on finish-Button, update Note as finished in database
            if (el.target.classList.contains('note__btn-finish')) {
                client.getNote(el.target.id).done(note => {
                    (note.finished) ? note.finished = false : note.finished = true;

                    client.updateNote(note._id, note).done(notes => {
                        render(template, notesWrapper, sortbyValue, finishedState, sortDirection);
                    });
                });
            }
            //By click on edit-Btn, set ID in session Store, switch page
            else if (el.target.classList.contains('note__btn-edit')) {
                let selectedID = el.target.id;
                sessionStorage.setItem('selectedID', selectedID);
                window.location.replace("newNote.html");
            }
            //delete note by click on delete-button
            else if (el.target.classList.contains('note__delete-btn')) {
                client.deleteNote(el.target.parentNode.id).done(render(template, notesWrapper, sortbyValue, finishedState, sortDirection));
            }
            else {
                console.log(false);
            }
        });
    }
}(window, document));