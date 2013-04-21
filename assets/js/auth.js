function init_auth ($) {
  var eStatus = $('#status');
  var eLogin = $('#login');
  var eLogout = $('#logout');

  function refreshStatus () {
    $.get("/api/auth/status", function (res) {
      if (!res.authenticated) {
        $(document).trigger('unauthenticated');
        eStatus.text('Non identifié');
        eLogin.show();
        eLogout.hide();
      } else {
        $(document).trigger('authenticated');
        eStatus.text('Identifié (' + res.username + ')');
        eLogin.hide();
        eLogout.show();
      }
    });
  }

  eLogin.on("click", function () {
    var username = prompt('Username');
    $.post("/api/auth/login", {username: username}, refreshStatus);
  });

  eLogout.on("click", function () {
    $.post("/api/auth/logout", refreshStatus);
  });

  refreshStatus();
}
