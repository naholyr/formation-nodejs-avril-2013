var express = require('express');


// Application express = handler
var app = module.exports = express();

var W = 20, H = 20, X = 10, Y = 10;

// Routing
app.get('/info', function (req, res) {
  res.json({
    w: W,
    h: H,
    x: X,
    y: Y
  });
});
app.get('/position', function (req, res) {
  res.json({x: X, y: Y});
});
app.post('/move', function (req, res) {
  if (!req.body) return res.send('Missing body', 400);
  var x = parseInt(req.body.x, 10) || 0;
  var y = parseInt(req.body.y, 10) || 0;
  if (x > 1 || x < -1) return res.send('Invalid X', 400);
  if (y > 1 || y < -1) return res.send('Invalid Y', 400);
  if (x !== 0 && y !== 0) return res.send('Cannot move X & Y', 400);
  X += x;
  if (X < 0 || X >= W) {
    X = Math.max(0, Math.min(W-1, X));
    return res.json({x: X, y: Y}, 304);
  }
  Y += y;
  if (Y < 0 || Y >= H) {
    Y = Math.max(0, Math.min(H-1, Y));
    return res.json({x: X, y: Y}, 304);
  }
  res.json({x: X, y: Y});
});
