// NODE.JS-POHJAINEN WEB-PALVELIN EXPRESS-KIRJASTOLLA TOTEUTETTUNA
// ===============================================================

// KIRJASTOT
// ---------

const express = require('express');
const {engine} = require('express-handlebars');

// Luodaan palvelin
const app = express();

// Määritellään TCP-portti, jota palvelin kuuntelee
// Se luetaan ympäristömuuttujasta PORT tai jos sitä ei ole käytetään porttia 8080
const PORT = process.env.PORT || 8080;

// Määritellään polut kansioihin
// Määritelläään polku staattisten tiedostojen kansioon
app.use(express.static('public'));

// Määritellään polku sivujen näkymiin
app.set('views', './views');

// Tehdään palvelimen express-asetukset
app.engine('handlebars', engine());
app.set('view engine', 'handelbars');


// MÄÄRITELLÄÄN URL-REITIT
// -----------------------
// Määritellään reitit kahdelle sivulle

// Kotisivu, so. URL pelkästään palvelimen osoite
app.get('/',(req, res) => {

    // Tämä on leikisti dynaamista dataa, joka on tullut tietokannasta
    let today = 'keskiviikko';
    let food = 'nakit ja muusi';

    // Mudostetaan JSON-objekti, joka voidaan lähettää sivulle korvaamaan {{}}-muuttujat

    let dataToSend = {
    'dayName': today,
    'menu': food
    };

    // Renderöidään kotisivu lähettämällä sinne data
    res.render('index', dataToSend);
});

// URL-reitti About-sivulle
app.get('/about',(req, res) => {
    // Simuloidaan dynaamista dataa
    let aboutData = {
        'team': 'TiVi20oa'
    };
    res.render('about', aboutData);

});


// Käynnistetään palvelin
app.listen(PORT);
console.log('Started server on port', PORT);