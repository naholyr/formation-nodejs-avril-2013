var express = require('express');


// Application express = handler
var app = module.exports = express();

// Routing
app.post('/login', function (req, res) {
  if (req.session.user) return res.send('Already logged in', 403);
  if (!req.body || !req.body.username) return res.send('Field required: username', 400);
  req.session.user = req.body.username;
  res.send(204);
});
app.get('/status', function (req, res) {
  res.json({authenticated: !!req.session.user, username: req.session.user});
});
app.post('/logout', function (req, res) {
  req.session.user = null;
  res.send(204);
});
