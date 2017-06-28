/**
 * Created by claudia on 27.06.17.
 */
;(function(services, $) {

    const ajaxUtil = window.util.ajax;

    function createNote(note) {
        return ajaxUtil.ajax("POST", "/notes", note);
    }


    function getNotes() {
        return ajaxUtil.ajax("GET", "/notes", undefined);
    }

    function getNote(id) {
        return ajaxUtil.ajax("GET", `/notes/${id}`, undefined);
    }

    function deleteNote(id) {
        return ajaxUtil.ajax("DELETE", `/notes/${id}`, undefined);
    }

    services.restClient = {
        createNote: createNote,
        getNotes: getNotes,
        getNote: getNote,
        deleteNote: deleteNote
    };
}(window.services = window.services || { }, jQuery));