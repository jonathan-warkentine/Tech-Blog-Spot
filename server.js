const express = require('express');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers')

const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware
app.use(express.json());
app.use(express.static('./public'));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 360000,
    // secure tells express-session to only initialize session cookies when the protocol being used is HTTPS. Having this set to true, and running a server without encryption will result in the cookies not showing up in your developer console.
    secure: 'auto',
    // sameSite tells express-session to only initialize session cookies when the referrer provided by the client matches the domain out server is hosted from.
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  // Sets up session store
  store: new SequelizeStore({
    db: sequelize,
  }),
}));


app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});