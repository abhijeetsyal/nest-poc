const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { keycloak, memoryStore } = require('./keycloak-config');

const app = express();

app.use(session({
  secret: 'Rwwhxnf2hPfmEY4Qw8OjPeKUYy1Ao5Rf',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(keycloak.middleware());

// Login route
app.get('/login', keycloak.protect(), (req, res) => {
  console.log(req)
  res.send('Logged in successfully');
});

// Callback route
app.get('/login/auth_callback', keycloak.protect(), (req, res) => {
  res.send('Authentication callback handled');
});

// Protected API route
app.get('/api/protected', keycloak.protect(), (req, res) => {
  res.send('Access to protected API granted');
});

app.listen(8081, () => {
  console.log('Express Gateway is running on port 8081');
});
