"use strict";
/**
 * Created by claudia on 25.05.17.
 */

//Run EventListener
window.addEventListener('load', templateToHtml);
window.addEventListener('load', getStyleData);
window.addEventListener('load', getSortByBtn);
window.addEventListener('change', styleChanger);
document.querySelectorAll("#sortBtns li").forEach(function(e){e.addEventListener('click', btnAddActive)});

