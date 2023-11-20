// Wczytanie modelu notatki Note
const Note = require('../../db/models/note');

class noteActons {
    
    // Zapisywanie (dodanie) notatki
    async saveNote(req, res) { // Gdy używamy await funkcja musi być async
        const title = req.body.title; //Przypisanie zmiennej title zawartej w właściwości body w obiekcie req do zmiennej title
        const body = req.body.body; //Przypisanie zmiennej body zawartej w wartości body w obiekcie req do zmiennej body

        let note;

        try {
            note = new Note({ title, body }); // Tworzenie nowej instancji klasy Note z wartości title i body
            await note.save(); // Zapisanie notatki do bazy danych
        } catch (error) {
            return res.status(422).json({ message: error.message }); // Status 422 - nieprawidłowe rządanie - złe dane zostały przesłane
        }   
        
        res.status(201).json(note); // Status 201 - udany zapis w bazie danych


        // req - Request - przychodzi z serwera
        // res - Response - wysyła na serwer
        // Właściwość o nazwie body jest tworzona przez program Postman i nie mamy wpływu na jej nazwę
        // const title = req.body.title; //Przypisanie zmiennej title zawartej w właściwości body w obiekcie req do zmiennej title
        // const body = req.body.body; //Przypisanie zmiennej body zawartej w wartości body w obiekcie req do zmiennej body
        // Node.js nie wie jak odczytać body dla tego potrzebna jest biblioteka: body-parser, npm install body-parser
        
        
    }

    // Pobieranie (wyświetlenie) wszystkich notatek
    async getAllNotes(req, res) {
        let doc;

        try {
            doc = await Note.find({});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }

        res.status(200).json(doc);

        /*
        
        // SPOSÓB 2
        // Usunąć async z przed getAllNotes
        // Note.find - pobiera dane z bazy danych / kolekcji Note. Paramtr wewnątrz {} to to co chcemy znaleść jeśli puste znajdzie wszystkie dokumenty z kolekcji Note 
        // Metoda .exec(), która wykonuje zapytanie do bazy danych i zwraca obiekt Promise. Metoda .exec() jest używana w celu obsługi asynchroniczności operacji.
       Note.find({}).exec()
       
         .then((docs) => { // Jezeli notatki zostaną znalezione to ...
            console.log(docs); // Wyświetli zmienną doc w konsoli gdy tylko notatki Note zostaną pobrane. (wyświetlone pole __v - wersja mówi ile razy zmienna była edytowana)
            res.ststus(200).json(docs); // Wysyła notatki do frontendu w formacie JSON ze statusem 200 czyli sukces.
        })

         .catch((err) => { // Jezeli notatki nie zostą znalezione to ...
            console.error(err); // Wyświetli zmienną err w konsoli (błąd)
            res.status(500).json({ message: err.message });
         });
        
        */

    }

    // Pobieranie (wyświetlenie) notatki określonej po id
    async getNote(req, res) {     
        const id = req.params.id;
        const note = await Note.findOne({ _id: id });
        res.status(200).json(note);

    }

    // Aktulizacja (zmiana) notatki
    async updateNote(req, res) {
        // Pobranie zmiennych notatki z serwera (wcześniej zostały wysłana z frontendu na serwer)
        const id = req.params.id; // pobranie id notatki
        const title = req.body.title; // pobranie tytułu notatki
        const body = req.body.body; // pobranie treści notatki

        const note = await Note.findOne({ _id: id }); // Pobranie notatki o podanym id z bazy danych
        try {
            // Przypisanie wcześniej pobranych z serwera danych do zmiennych z pobranej wcześniej notatki z bazy danych
            note.title = title; // Przypisanie nowego tytułu
            note.body = body; // Przypisanie nowej treści
            await note.save(); // Zapisanie notatki do bazy danych
        } catch (error) {
            return res.status(422).json({ message: error.message });
        }
        res.status(201).json(note);
    }

    // Usuwanie notatki
    async deleteNote(req, res) {
        const id = req.params.id;
        await Note.deleteOne({ _id: id });

        res.sendStatus(204); // Wyślij sam status 204 - zadanie wykonane, nic nie zostanie zwrócone        
    }

    
}

module.exports = new noteActons