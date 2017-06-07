"use strict";
/**
 * Created by claudia on 25.05.17.
 * EventListeners for the index.html-file
 */

//Run EventListener
window.addEventListener('load', templateToHtml);

window.onload = function () {
    //start all Functions from the storage
    initIndex();

    window.addEventListener('change', styleChanger);

    document.querySelectorAll('#sortBtns li').forEach(function(e){e.addEventListener('click', btnAddActive)});
    document.querySelector('#showFinishedBtn').addEventListener('click', showFinishNotes);

    //Function to add class to activated Sort-Button
    function btnAddActive(e){
        //get ID of clicked Button/Link
        var btnClicked = e.currentTarget;
        var newSortBy = btnClicked.id;
        var allBtn = document.querySelectorAll('#sortBtns li');

        //add content of ID in sessionStore
        sessionStorage.setItem('sortby', newSortBy);

        //rerender page by click on Sort-Link, add class active in HTML
        allBtn.forEach(function(e){
            templateToHtml();
            return e.classList.remove('active');
        });
        btnClicked.classList.add("active");

        return newSortBy;
    }

    //Function to add class to activated showFinished-Button
    function btnFinishedAddActive(e){
        var btnClicked = e.currentTarget;
        var allBtn = document.querySelector('#showFinishedBtn');
    }
};

