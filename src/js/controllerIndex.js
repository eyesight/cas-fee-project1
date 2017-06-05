"use strict";
/**
 * Created by claudia on 25.05.17.
 * EventListeners for the index.html-file
 */

//Run EventListener
window.addEventListener('load', templateToHtml);
window.addEventListener('load', getStyleData);
window.addEventListener('load', getSortByBtn);
window.addEventListener('load', getSelectedNoteID);
window.addEventListener('load', getShowFinished);

window.addEventListener('change', styleChanger);

document.querySelectorAll('#sortBtns li').forEach(function(e){e.addEventListener('click', btnAddActive)});
document.querySelector('#showFinishedBtn').addEventListener('click', showFinishNotes);

//Function to add class to activated Sort-Button
function btnAddActive(btnClicked){
    //get ID of clicked Button/Link
    btnClicked = this;
    var newSortBy = this.id;
    var allBtn = document.querySelectorAll('#sortBtns li');

    //add content of ID in sessionStore
    sessionStorage.setItem('sortby', newSortBy);

    //rerender page by click on Sort-Link, add class active in HTML
    allBtn.forEach(function(e){
        window.location.replace("index.html");
        return e.classList.remove('active');
    });
    btnClicked.classList.add("active");

    return newSortBy;
}