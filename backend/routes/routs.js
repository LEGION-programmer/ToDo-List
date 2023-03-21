const express = require('express')
const router = express.Router()
const NoteActions = require('../controllers/noteController')
const UserActions = require('../controllers/userController')


//get all
router.get('/notes/:owner', NoteActions.getAllNotes)

//get one note
router.post('/notes', NoteActions.getOneNote)

//add note
router.post('/notesAdd', NoteActions.addNotes)

//update note
router.put('/notes/:id', NoteActions.updateNote)

//delete note
router.delete('/notes/:id', NoteActions.deleteNotes)

//login
router.post('/login', UserActions.login)

//register
router.post('/register', UserActions.register)

module.exports = router