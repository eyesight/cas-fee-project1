/**
 * Created by claudia on 25.05.17.
 * Event-Listeners for the newNote.html-file
 */

window.addEventListener('load', getStyleData);
window.addEventListener('load', getNoteData);
window.addEventListener('load', getSelectedNoteID);

document.getElementById("submitBtn").addEventListener('click', addNewNote);

