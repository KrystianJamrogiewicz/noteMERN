const express = require('express');
const router = express.Router();

const noteActions = require('../actions/api/noteActions');

// Endpoints:
// Pobieranie notatek
// Tworzenie / Zapisywanie notatek
// Edytowanie notatek
// Usuwanie notatek


// get stosujemy do pobierania czegoś z serwera
router.get('/notes', noteActions.getAllNotes); // Pobranie wszystkich notatek
router.get('/notes/:id', noteActions.getNote); // Pobranie konkretnej notatki po id

// post stosujemy do zapisywania czegoś na serwerze
router.post('/notes', noteActions.saveNote);

// put stosujemy do edycji czegoś na serwerze
router.put('/notes/:id', noteActions.updateNote);

// delete stosujemy do usuwania czegoś z serwera
router.delete('/notes/:id', noteActions.deleteNote);



module.exports = router;