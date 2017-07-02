/**
 * Created by claudia on 26.06.17.
 */
const express = require('express');
const notes = require('../controller/notesController.js');

const router = express.Router();

router.get("/", notes.getNotes);
router.post("/", notes.creatNote);
router.delete("/:id/", notes.deleteNote);
router.get("/:id/", notes.showNotes);
router.put("/:id/", notes.updateNoteFin);
router.put("/edit/:id/", notes.updateNote);




module.exports = router;