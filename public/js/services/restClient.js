/**
 * Created by claudia on 27.06.17.
 */
;(function(services, $) {

    const ajaxUtil = window.util.ajax;

    function _createNote(note) {
        return ajaxUtil.ajax("POST", "/notes", note);
    }


    function _getNotes() {
        return ajaxUtil.ajax("GET", "/notes", undefined);
    }

    function _getNote(id) {
        return ajaxUtil.ajax("GET", `/notes/${id}`, undefined);
    }

    function _deleteNote(id) {
        return ajaxUtil.ajax("DELETE", `/notes/${id}`, undefined);
    }
    //TODO: Update should be with Put -> check!
    function _updateNote(id, note) {
        return ajaxUtil.ajax("POST",`/notes/${id}`, note);

    }

    function _updateNoteFinish(id, note) {
        return ajaxUtil.ajax("PUT",`/notes/${id}`, note);

    }

    services.restClient = {
        createNote: _createNote,
        getNotes: _getNotes,
        getNote: _getNote,
        deleteNote: _deleteNote,
        updateNote: _updateNote,
        updateNoteFin: _updateNoteFinish
    };
}(window.services = window.services || { }, jQuery));