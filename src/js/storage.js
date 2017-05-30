"use strict";
/**
 * Created by claudia on 25.05.17.
 */
function getNoteData(){
    var notes = localStorage.getItem('notes');
    //if no notes exist, set new Object notes
    if(!notes){
        notes = localStorage.setItem('notes', JSON.stringify([]));
    }
    return JSON.parse(notes);
}

function getStyleData(){
    var actualStyle = localStorage.getItem('styleClassName');
    if(!actualStyle){
        localStorage.setItem('styleClassName', 'colorful')
    }

    localStorage.setItem('styleClassName', actualStyle);
    document.querySelector('body').className = actualStyle;
}