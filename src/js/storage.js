"use strict";
/**
 * Created by claudia on 25.05.17.
 */
function getNoteData(){
    var notes = localStorage.getItem('notes');
    //if no notes exist, set new Object notes
    if(!notes){
        notes = localStorage.setItem('notes', JSON.stringify([]));
        notes = localStorage.setItem('notes', JSON.stringify(defaultnotes));
    }
    return notes;
}

function getNoteDataParsed(){
    var notes = getNoteData();
    return JSON.parse(notes);
}

function getStyleData(){
    var actualStyle = localStorage.getItem('styleClassName');
    if(!actualStyle){
        localStorage.setItem('styleClassName', 'colorful');
    }

    document.querySelector('body').className = actualStyle;
    return actualStyle;
}

function getSortByBtn(){
    var sortbyBtn = sessionStorage.getItem('sortby');
    if(!sortbyBtn){
        sessionStorage.setItem('sortby', 'finishDateBtn');
        sortByFinishDate();
    }
    document.querySelectorAll("#sortBtns li").forEach(function(e){
        if(e.id == sortbyBtn){
            e.classList.add("active");
        }
    });
    return sortbyBtn;
}

