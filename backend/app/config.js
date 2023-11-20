require('dotenv').config(); // DO PRZECHOWYWANIA ADRESÓW IP Trzeba zainstalować: npm install dotenv --save
// dotenv wyszukuje w pliku .env i wstawia zmienne z niego do zmiennych PORT i DATABASE w tym pliku (config.js)

module.exports = {
    port: process.env.PORT,
    // Aby zmienić port tymczasowo np. na 3001 w terminalu wpisz: $env:PORT=3001; node ./index.js później należy spowrotem zmienić na 3000. CTRL+C wyłącza serwer
    database: process.env.DATABASE
};
