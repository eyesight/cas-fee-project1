/**
 * Created by claudia on 25.05.17.
 * Event-listeners on for the editNote.html-file
 **/

window.addEventListener('load', getStyleData);
window.addEventListener('load', getNoteData);
window.addEventListener('load', getSelectedNoteID);
window.addEventListener('load', getNoteToEdit);

document.getElementById("editBtn").addEventListener('click', editNote);
document.getElementById("cancelBtn").addEventListener('click', cancelNote);
document.getElementById("deleteBtn").addEventListener('click', deleteNote);


