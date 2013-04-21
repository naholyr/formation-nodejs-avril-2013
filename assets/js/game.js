function init_game ($) {
  var eGame = $('#game');
  var eBoard = $('.board', eGame);
  var eDude = $('<div style="position:absolute; width:20px; height: 20px">×</div>');
  var active = false;

  $(document).on('unauthenticated', function () {
    eGame.hide();
    active = false;
  });

  $(document).on('authenticated', function () {
    eGame.show();
    active = true;
    $.get('/api/game/info', function (res) {
      initBoard(res.w, res.h);
      showDude(res.x, res.y);
    });
  });

  function initBoard (w, h) {
    eBoard.css({width: (w*20)+'px', height: (h*20)+'px', border: '1px solid black', position: 'relative'});
    $(document).on('keyup', function (e) {
      if (!active) return;
      var move = {
        37: {x: -1, y: 0},
        38: {x: 0,  y: -1},
        39: {x: +1, y: 0},
        40: {x: 0,  y: +1}
      }[e.keyCode || e.which];
      $.post('/api/game/move', move, function (res) {
        showDude(res.x, res.y);
      });
    });
  }

  function showDude (x, y) {
    eDude.css({left: (x*20)+'px', top: (y*20)+'px'}).appendTo(eBoard);
  }
}
