/**
 * Created by claudia on 26.06.17.
 */
const Datastore = require('nedb');
const db = new Datastore({filename: './data/notesData.db', autoload: true});


class Note {
    constructor(title, description, rating, finishDate) {
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.finishDate = finishDate;
        this.finished = false;
        this.creatDate = new Date();
    }
}

function _publicAddNote(title, description, rating, finishDate, callback) {
    let note = new Note(title, description, rating, finishDate);
    db.insert(note, function (err, newDoc) {
        if (callback) {
            callback(err, newDoc);
        }
    });
}

function _publicRemoveNote(id, callback) {
    db.remove({_id: id}, {}, function (err, doc) {
        callback(err, doc);
    });
}

function _publicUpdateNote(id, title, description, rating, finishDate, callback) {
    let note = new Note(title, description, rating, finishDate);
    db.update({_id: id}, {
        $set: {
            title: title,
            description: description,
            rating: rating,
            finishDate: finishDate
        }
    }, {}, function (err, doc) {
        if (callback) {
            callback(err, doc)
        }
    });
}

function _publicUpdateFinishedNote(id, finished, callback) {
    db.update({_id: id}, {$set: {finished: finished}}, {}, function (err, doc) {
        if (callback) {
            callback(err, doc);
        }
    });
}

function _publicGetNote(id, callback) {
    db.findOne({_id: id}, function (err, doc) {
        callback(err, doc);
    });
}

function _publicAll(notes, callback) {
    db.find({}, function (err, notes) {
        callback(err, notes);
    });
}

module.exports = {
    add: _publicAddNote,
    delete: _publicRemoveNote,
    update: _publicUpdateNote,
    updateFinished: _publicUpdateFinishedNote,
    get: _publicGetNote,
    all: _publicAll
};