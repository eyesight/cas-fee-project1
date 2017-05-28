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
    var temp = document.querySelector('#noteTemplate').innerHTML;

    var compiledTemp = Handlebars.compile(temp);
    var generatedNote = compiledTemp(testnotes);

    var noteswrap = document.querySelector('#notesContainer');
    noteswrap.innerHTML = generatedNote;
}

//Stylechanger
function styleChanger(){
    var body = document.querySelector('body');
    var style = document.querySelector('#stylesAll').value;
    (style === 'style2') ? body.classList.add("black-white") : body.classList.remove("black-white");

}

//Run Function Handelbars
window.addEventListener('DOMContentLoaded', templateToHtml);
window.addEventListener('change', styleChanger);

