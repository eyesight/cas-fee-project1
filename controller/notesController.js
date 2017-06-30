/**
 * Created by claudia on 26.06.17.
 */
const store = require("../services/notesStore.js");

module.exports.getNotes = function(req, res) {
    store.all(req, function (err, notes) {
        res.json(notes || {});
    })
};

    module.exports.creatNote = function(req, res) {
    let note = store.add(req.body.title, req.body.description, req.body.rating, req.body.finishDate,  function(err, note) {
        res.json(note);
    });

};

module.exports.showNotes = function(req, res){
    store.get(req.params.id, function(err, notes) {
        res.json(notes);
    });
};

module.exports.deleteNote =  function (req, res) {
    store.delete(  req.params.id, function(err, note) {
        res.json(note);
    });
};

module.exports.updateNote = function(req, res) {
    let note = store.update(req.params.id, req.body.title, req.body.description, req.body.rating, req.body.finishDate, req.body.finished,  function(err, note) {
        res.json(note);
    });
};

module.exports.updateNoteFin = function(req, res) {
    let note = store.updateFinished(req.params.id, req.body.finished, function(err, note) {
        res.json(note);
    });
};