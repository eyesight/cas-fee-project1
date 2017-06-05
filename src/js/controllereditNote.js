/**
 * Created by claudia on 04.06.17.
 */
window.addEventListener('load', getStyleData);
window.addEventListener('load', getNoteData);
window.addEventListener('load', getSelectedNoteID);
window.addEventListener('load', getNoteToEdit);

document.getElementById("editBtn").addEventListener('click', editNote);
document.getElementById("cancelBtn").addEventListener('click', cancelNote);
document.getElementById("deleteBtn").addEventListener('click', deleteNote);


