"use strict";
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
    var temp = document.querySelector('#noteTemplate').innerHTML;

    var compiledTemp = Handlebars.compile(temp);
    var generatedNote = compiledTemp(notesData);

    var noteswrap = document.querySelector('#notesContainer');
    noteswrap.innerHTML = generatedNote;

    //Event-Listener change finished-status
    var finishButton = document.querySelectorAll('.note__finish-wrapper');
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
        };
        window.location.replace("editNote.html");
    });
    });

    return generatedNote;
}

//Stylechanger: set local Storage
function styleChanger(){
    var actualStyle = getStyleData();
    actualStyle = document.querySelector('#stylesAll').value;
    localStorage.setItem('styleClassName', actualStyle);
    document.querySelector('body').className = actualStyle;
}

//Sort-Functions
function sortByFinishDate(){
    var notesData = getNoteDataParsed();
    var sortedNotes = notesData.sort(function(a,b){
        return (a.finishDate > b.finishDate) ? 1 : ((b.finishDate > a.finishDate) ? -1 : 0);
    });
    localStorage.setItem("notes", JSON.stringify(sortedNotes));
    window.location.replace("index.html");
}

function sortByCreatedDate(){
    var notesData = getNoteDataParsed();
    var sortedNotes = notesData.sort(function(a,b){
        return (a.creatDate > b.creatDate) ? 1 : ((b.creatDate > a.creatDate) ? -1 : 0);
    });
    localStorage.setItem("notes", JSON.stringify(sortedNotes));
    window.location.replace("index.html");
}

function sortByImportance(){
    var notesData = getNoteDataParsed();
    var sortedNotes = notesData.sort(function(a,b){
        return (a.rating > b.rating) ? -1 : ((b.rating > a.rating) ? 1 : 0);
    });
    localStorage.setItem("notes", JSON.stringify(sortedNotes));
    window.location.replace("index.html");
}


//Function to add class to activated Sort-Button
function btnAddActive(btnClicked){
    btnClicked = this;
    var newSortBy = this.id;
    var allBtn = document.querySelectorAll('#sortBtns li');
    sessionStorage.setItem('sortby', newSortBy);
    allBtn.forEach(function(e){
        return e.classList.remove('active');
    });
    btnClicked.classList.add("active");

    switch(newSortBy){
        case 'finishDateBtn':
            sortByFinishDate();
            break;
        case 'createdDateBtn':
            sortByCreatedDate();
            break;
        case 'importanceBtn':
            sortByImportance();
            break;
        default:
            break;
    }
}

