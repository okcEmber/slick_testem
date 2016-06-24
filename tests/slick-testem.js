const
  log = console.log,
  getFailing = function () {
    return document.querySelectorAll ('.fail').length;
  };

var hasFailed = false;
function doStuff () {
  
  setTimeout (function () {

  if (getFailing()) {
    if (!hasFailed) $ ('#qunit-header').append ($('<div>test!</div>'));
    hasFailed = true;
  }
  console.log('hola world');
    doStuff();
  }, 300);
}


doStuff();
