const express = require('express')();
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('./public'));
//set up routes

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
  });
