"use strict";
/**
 * Created by claudia on 25.05.17.
 * functions to render the pages
 **/

//Handebar-Helpers
Handlebars.registerHelper('ratingCounter', function(){
    var ratingNumber = Handlebars.escapeExpression(this.rating);
    var stars = "";
    switch(ratingNumber){
        case "1":
            stars = "★☆☆☆☆";
            break;
        case "2":
            stars = "★★☆☆☆";
            break;
        case "3":
            stars = "★★★☆☆";
            break;
        case "4":
            stars = "★★★★☆";
            break;
        case "5":
            stars = "★★★★★";
            break;
        default:
            stars = "keine Priorität";
    }
    return new Handlebars.SafeString(
        stars
    );

});

Handlebars.registerHelper('buttonActive', function(){
    var buttonstate = Handlebars.escapeExpression(this.finished);
    var button = "";
    if(buttonstate === "1" ){
        return button = "active";
    }
    return button = "";
});

//Handebar-Render-Function
function templateToHtml(){
    var notesData = getNoteDataParsed();
    //get sortBy from sessionStore by function getSortByBtn (from storage)
    var newSortBy = getSortByBtn();
    //get showFinished-Status by function getFinished (from storage)
    var showFinished = getShowFinished();

    var temp = document.querySelector('#noteTemplate').innerHTML;

    var compiledTemp = Handlebars.compile(temp);

    switch(newSortBy){
        case 'finishDateBtn':
            notesData = sortByFinishDate(notesData);
            break;
        case 'createdDateBtn':
            notesData = sortByCreatedDate(notesData);
            break;
        case 'importanceBtn':
            notesData = sortByImportance(notesData);
            break;
        default:
            break;
    }

    //check if Button "show finished Notes" is clicked, if yes: render notesData with function showFinishNotes
    var finishButton = document.querySelectorAll('.note__finish-wrapper');

    if(document.querySelector('#showFinishedBtn').classList.contains('active')){
        notesData = showFinishNotes(notesData);
    } else{
        notesData;
    }


    //render the Datas into the HTML-Container
    var generatedNote = compiledTemp(notesData);
    var noteswrap = document.querySelector('#notesContainer');
    noteswrap.innerHTML = generatedNote;

    //Event-Listener change finished-status
    var finishBtnStatus = 0;
    finishButton.forEach(function(el, index){el.addEventListener('click', function(e){
        var selectedID = Number(finishButton[index].id);
        for(var i=0; i<notesData.length;i++){
            if(selectedID === notesData[i].id){
                finishBtnStatus = notesData[i].finished;
                if(finishBtnStatus === 0){
                    finishBtnStatus = 1;
                }
                else {
                    finishBtnStatus = 0;
                }
                notesData[i].finished = finishBtnStatus;
            }
        }
        localStorage.setItem("notes", JSON.stringify(notesData));
        location.reload();
    }, false)});

    //Event-Listener get ID of note by click on edit Button
    var editButton = document.querySelectorAll('.note__edit-wrapper');
    var selectNoteID = getSelectedNoteID();

    editButton.forEach(function(el, index){el.addEventListener('click', function(e){
        var selectedID = editButton[index].id;
        selectedID = Number(selectedID.match(/\d+/g));
        for(var i=0; i<notesData.length;i++) {
            if(selectedID === notesData[i].id) {
                sessionStorage.setItem('selectedID', selectedID);
            }
        }
        window.location.replace("editNote.html");
    });
    });

    return noteswrap;
}

//Stylechanger: set in local-Storage
function styleChanger(){
    var actualStyle = getStyleData();
    actualStyle = document.querySelector('#stylesAll').value;
    localStorage.setItem('styleClassName', actualStyle);
    document.querySelector('body').className = actualStyle;
}

//Sort-Functions - get the Data from the notes-object and return it sorted
function sortByFinishDate(sortedData){
    var sortedNotes = sortedData.sort(function(a,b){
        return (a.finishDate > b.finishDate) ? 1 : ((b.finishDate > a.finishDate) ? -1 : 0);
    });
    return sortedNotes;
}

function sortByCreatedDate(sortedData){
    var sortedNotes = sortedData.sort(function(a,b){
        return (a.creatDate > b.creatDate) ? 1 : ((b.creatDate > a.creatDate) ? -1 : 0);
    });
    return sortedNotes;
}

function sortByImportance(sortedData){
    var sortedNotes = sortedData.sort(function(a,b){
        return (a.rating > b.rating) ? -1 : ((b.rating > a.rating) ? 1 : 0);
    });
    return sortedNotes;
}

//Function show just finished notes
function showFinishNotes(finishedData){
    var showFinished = getShowFinished();
    var indexOfNotes = [];
    var btnFinish = document.querySelector('#showFinishedBtn');

    for(var i = 0; i<finishedData.length;i++){
        if(finishedData[i].finished === 0){
            finishedData.splice(i, 1);
        }
    }

    // add/remove class active to finish-Button
    if(btnFinish.classList.contains('active')){
        btnFinish.classList.remove('active');
    }else{
        btnFinish.classList.add('active');
    }
    if(showFinished == 0){
        sessionStorage.setItem('showFinished', '1');
    } else{
        sessionStorage.setItem('showFinished', '0');
    }
    templateToHtml();
    return finishedData;
}