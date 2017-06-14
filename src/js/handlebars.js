/**
 * Created by claudia on 13.06.17.
 * all Handlebar-Helper-functions
 */
Handlebars.registerHelper('ratingCounter', function(){
    let ratingNumber = Handlebars.escapeExpression(this.rating);
    let stars = "";
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
    let buttonstate = Handlebars.escapeExpression(this.finished);
    let button = "";
    if(buttonstate === "1" ){
        return button = "active";
    }
    return button = "";
});

//Handebar-Render-Function
function renderPage(){
    let notesData = parseNoteData();
    //get sortBy from sessionStore by function applySortByBtn (from storage)
    let newSortBy = applySortByBtn();
    //get showFinished-Status by function getFinished (from storage)
    let showFinished = sessionStorage.getItem('showFinished');
    showFinished = applyShowFinished();

    let temp = document.querySelector('#noteTemplate').innerHTML;

    let compiledTemp = Handlebars.compile(temp);

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

    //render the Datas into the HTML-Container
    let generatedNote = compiledTemp(notesData);
    let noteswrap = document.querySelector('#notesContainer');
    noteswrap.innerHTML = generatedNote;

    return noteswrap;
}