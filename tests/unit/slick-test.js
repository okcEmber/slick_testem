/* global QUnit, SlickTestem */
QUnit.module('Custom slick js', function() {
  QUnit.test('SlickTestem loads', function(assert) {
    assert.ok(
      typeof SlickTestem === 'function',
      'SlickTestem is defined (be sure to run generator)'
    );
  });

  QUnit.test('', function(assert) {
    let s = new SlickTestem({
      queue: [],
      stats: {
        all: 0,
        bad: 0
      }
    });

    assert.equal(
      s.percentComplete(),
      0,
      'We just say 0% if nothing\'s loaded'
    );

    s = new SlickTestem({
      queue: [0,0,0,0,0],
      stats: {
        all: 5,
        bad: 0
      }
    });

    assert.equal(
      s.percentComplete(),
      50,
      'Test for half'
    );

    s = new SlickTestem({
      queue: [],
      stats: {
        all: 10,
        bad: 0
      }
    });

    assert.equal(
      s.percentComplete(),
      100,
      'Test for all'
    );
  });
});

