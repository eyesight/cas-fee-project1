"use strict";
/**
 * Created by claudia on 25.05.17.
 * EventListeners for the index.html-file
 */

//Run EventListener
window.addEventListener('load', templateToHtml);
window.addEventListener('load', getStyleData);
window.addEventListener('load', getSortByBtn);
window.addEventListener('change', styleChanger);
window.addEventListener('load', getSelectedNoteID);

document.querySelectorAll('#sortBtns li').forEach(function(e){e.addEventListener('click', btnAddActive)});
document.querySelector('#showFinishedBtn').addEventListener('click', )

