const express = require('express');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers')

const routes = require('./controllers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('./public'));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});