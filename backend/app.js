// Tworzenie serwera
const express = require('express');
const app = express();
const { port } = require('./app/config');
const apiRouter = require('./app/routes/api');
const bodyParser = require('body-parser');
const cors = require('cors'); // Podstawowy moduł do blokady CORS

//Baza danych
require('./app/db/mongoose');

// Parsery - w jaki sposób aplikacja ma przetwarzać pewne pola w tym przypadku pole: body
// Trzeba zaznaczyć aby przetwarzać pola z aplikacji: Content-type: application/json
// ponieważ tak najczęściej wysyła się dane z frontendu do backendu przez api
app.use(bodyParser.json())

// fix cors - wyłączenie blokady cors dla połączenia backendu z frontendem
app.use(cors({
    origin: 'http://localhost:3000', // Na jaki adres IP frontendu zezwalamy * = na wszystkie, stosuje się tylko do testów
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Na jakie metody dostępu zezwalamy
    credentials: true // Zezwolenie na pobieranie plików cookies
   }));


//Routes
app.use('/api/', apiRouter);

//Server
app.listen(port, () => {
    console.log('Serwer słucha na: http://localhost:' + port);
});