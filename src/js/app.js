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

}

//Stylechanger
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
    location.reload();
}

function sortByCreatedDate(){
    var notesData = getNoteDataParsed();
    var sortedNotes = notesData.sort(function(a,b){
        return (a.creatDate > b.creatDate) ? 1 : ((b.creatDate > a.creatDate) ? -1 : 0);
    });
    localStorage.setItem("notes", JSON.stringify(sortedNotes));
    location.reload();
}

function sortByImportance(){
    var notesData = getNoteDataParsed();
    var sortedNotes = notesData.sort(function(a,b){
        return (a.rating > b.rating) ? -1 : ((b.rating > a.rating) ? 1 : 0);
    });
    localStorage.setItem("notes", JSON.stringify(sortedNotes));
    location.reload();
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

