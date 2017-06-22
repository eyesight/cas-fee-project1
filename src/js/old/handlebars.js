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

Handlebars.registerHelper('FormatedDate', function(date, language){
    moment.locale(language);
    let momentDate = moment(date);
    let today = moment().set({hour: 0, minute: 0, second: 0, millisecond: 0});
    let days = moment(date, "LLLL");
    let calendarDate = moment(date).calendar();
    let dateDiff = momentDate.diff(today, 'days');
    if(dateDiff>0){
        return new Handlebars.SafeString('<span> Erledigen bis am <br>' + calendarDate + ' </span>');
    } else if (dateDiff == 0){
        return 'Heute erledigen';
    } else{
        return new Handlebars.SafeString('<span class="outdated"> Überfällig seit <br>' + calendarDate + ' </span>');
    }
});

Handlebars.registerHelper('FormatedDateSimple', function(date, language){
    moment.locale(language);
    let formatedDate = moment(date).format('L');
    return formatedDate;
});

//Handebar-Render-Function
function renderPage(){
    let notesData = parseNoteData();
    //get sortBy from sessionStore by function applySortByBtn (from storage)
    let newSortBy = applySortByBtn();
    let finihedStatus = applyShowFinished();

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

    if(finihedStatus == 1){
        notesData = showFinishNotes(notesData);
        console.log(notesData);
    }

    //render the Datas into the HTML-Container
    let generatedNote = compiledTemp(notesData);
    let noteswrap = document.querySelector('#notesContainer');
    noteswrap.innerHTML = generatedNote;
    console.log('render');
}