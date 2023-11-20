const mongoose = require('mongoose'); // Import mongoose

// Walodacja - sprawdzenie np czy pola nie są puste
const NoteSchema = new mongoose.Schema({
    title: {
        type: String, // typ danych string - ciąg znaków
        required: true // pole jest wymagane
    },
    body: {
        type: String,
        required: true
    }
});

// tworzenie modelu Note
const Note = mongoose.model('Note', NoteSchema);

module.exports = Note; // Exportuje klase Note