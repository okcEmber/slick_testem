const
  log = console.log,
  getFailing = function () {
    return document.querySelectorAll ('.fail').length;
  };

var hasFailed = false;
function failMonitor () {
  setTimeout (function () {
    if (getFailing()) {
      if (!hasFailed) $ ('#qunit-header').append ($('<div>epic fail!</div>'));
      hasFailed = true;
    }
    failMonitor();
  }, 300);
}


failMonitor();
