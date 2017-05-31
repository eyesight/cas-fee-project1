"use strict";
/**
 * Created by claudia on 25.05.17.
 */
//Run Function Handelbars
window.addEventListener('load', templateToHtml);
window.addEventListener('load', getStyleData);
window.addEventListener('load', getSortByBtn);
window.addEventListener('change', styleChanger);
//document.getElementById("finishDateBtn").addEventListener('click', sortByFinishDate);
//document.getElementById("createdDateBtn").addEventListener('click', sortByCreatedDate);
//document.getElementById("importanceBtn").addEventListener('click', sortByImportance);
document.querySelectorAll("#sortBtns li").forEach(function(e){e.addEventListener('click', btnAddActive)});

