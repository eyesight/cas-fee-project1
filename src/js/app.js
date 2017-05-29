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
    var notesData = getNoteData();
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


