/**
 * Created by claudia on 26.06.17.
 */
const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notesData.db', autoload: true });



class Note {
    constructor(title, description, rating, finishDate, finished) {
        //this.id = 0;
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.finishDate = finishDate;
        this.finished = false;
        this.creatDate = new Date();
        this.finished = finished;
    }
}

function _publicAddNote(title, description, rating, finishDate, callback)
{
    let note = new Note(title, description, rating, finishDate);
    db.insert(note, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
    console.log('add2' + note);
}

function _publicRemoveNote(id, callback) {
    db.update({_id: id}, {$set: {"state": "DELETED"}}, {}, function (err, count) {
        _publicGetNote( callback);
    });
}

function _publicUpdateNote(id, title, description, rating, finishDate, finished, callback) {
    let note = new Note(title,description,rating,finishDate, finished);
    db.update({_id: id}, note, {}, function (err, doc) {
        _publicGetNote(id, callback);
    });
}

function _publicUpdateFinishedNote(id, finished, callback) {
    db.update({_id: id}, { $set: { finished: finished } }, {}, function (err, doc) {
          _publicGetNote(id, callback);

    });
}

function _publicGetNote(id, callback)
{
    db.findOne({ _id: id }, function (err, doc) {
        callback( err, doc);
    });
}

function _publicAll(notes, callback)
{
    db.find({}, function (err, notes) {
        callback( err, notes);
    });
}

module.exports = {
    add : _publicAddNote,
    delete : _publicRemoveNote,
    update : _publicUpdateNote,
    updateFinished : _publicUpdateFinishedNote,
    get : _publicGetNote,
    all : _publicAll
};