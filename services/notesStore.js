/**
 * Created by claudia on 26.06.17.
 */
const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notesData.db', autoload: true });



class Note {
    constructor(title, description, rating, finishDate) {
        //this.id = 0;
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.finishDate = finishDate;
        this.finished = false;
        this.creatDate = new Date();
    }
}

function publicAddNote(title, description, rating, finishDate, callback)
{
    let note = new Note(title, description, rating, finishDate);
    db.insert(note, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
    console.log('add2' + note);
}

function publicRemoveNote(id,  callback) {
    db.update({_id: id}, {$set: {"state": "DELETED"}}, {}, function (err, count) {
        publicGetNote( callback);
    });
}

function publicUpdateNote(id, title, description, rating, finishDate,  callback) {
    let note = new Note(title,description,rating,finishDate);

    db.update({_id: id},note, {}, function (err, doc) {
        if (callback) {
            callback(err, doc);
        }
    });
}

function publicUpdateFinishedNote(id, finished) {

    db.update({_id: id}, { $set: { finished: finished } }, {}, function (err, doc) {
        // publicNoteGet( callback);

    });
}

function publicGetNote(id, callback)
{
    db.findOne({ _id: id }, function (err, doc) {
        callback( err, doc);
    });
}

function publicAll(notes, callback)
{
    db.find({}, function (err, notes) {
        callback( err, notes);
    });
}

module.exports = {
    add : publicAddNote,
    delete : publicRemoveNote,
    update : publicUpdateNote,
    updateFinished : publicUpdateFinishedNote,
    get : publicGetNote,
    all : publicAll};