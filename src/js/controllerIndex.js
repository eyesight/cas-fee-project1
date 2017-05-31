"use strict";
/**
 * Created by claudia on 25.05.17.
 */
var finishBtns2 =  document.getElementsByClassName("note__finish-wrapper");
console.log(finishBtns2);

//Run EventListener
window.addEventListener('load', templateToHtml);
window.addEventListener('load', getStyleData);
window.addEventListener('load', getSortByBtn);
window.addEventListener('change', styleChanger);
document.getElementsByClassName("note__finish-wrapper").forEach(function(e){e.addEventListener('click', getNoteID)});
document.querySelectorAll("#sortBtns li").forEach(function(e){e.addEventListener('click', btnAddActive)});