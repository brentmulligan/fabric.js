(function(){

  QUnit.module('fabric.Ellipse');

  test('constructor', function() {
    ok(fabric.Ellipse);

    var ellipse = new fabric.Ellipse();

    ok(ellipse instanceof fabric.Ellipse, 'should inherit from fabric.Ellipse');
    ok(ellipse instanceof fabric.Object, 'should inherit from fabric.Object');

    equal(ellipse.type, 'ellipse');
  });

  test('complexity', function() {
    var ellipse = new fabric.Ellipse();
    ok(typeof ellipse.complexity == 'function');
    equal(ellipse.complexity(), 1);
  });

  test('toObject', function() {
    var ellipse = new fabric.Ellipse();
    var defaultProperties = {
      'type': 'ellipse',
      'originX': 'center',
      'originY': 'center',
      'left': 0,
      'top': 0,
      'width': 0,
      'height': 0,
      'fill': 'rgb(0,0,0)',
      'overlayFill': null,
      'stroke': null,
      'strokeWidth': 1,
      'strokeDashArray': null,
      'scaleX': 1,
      'scaleY': 1,
      'angle': 0,
      'flipX': false,
      'flipY': false,
      'opacity': 1,
      'rx': 0,
      'ry': 0,
      'selectable': true,
      'hasControls': true,
      'hasBorders': true,
      'hasRotatingPoint': true,
      'transparentCorners': true,
      'perPixelTargetFind': false,
      'shadow': null
    };
    ok(typeof ellipse.toObject == 'function');
    deepEqual(defaultProperties, ellipse.toObject());

    ellipse.set('left', 100).set('top', 200).set('rx', 15).set('ry', 25);

    var augmentedProperties = fabric.util.object.extend(fabric.util.object.clone(defaultProperties), {
      left: 100,
      top: 200,
      rx: 15,
      ry: 25
    });

    deepEqual(augmentedProperties, ellipse.toObject());
  });

  test('render', function() {
    var ellipse = new fabric.Ellipse();
    ellipse.set('rx', 0).set('ry', 0);

    var wasRenderCalled = false;

    ellipse._render = function(){
      wasRenderCalled = true;
    }
    ellipse.render({});

    equal(wasRenderCalled, false, 'should not render when rx/ry are 0');
  });

  test('fromElement', function() {
    ok(typeof fabric.Ellipse.fromElement == 'function');

    var elEllipse     = fabric.document.createElement('ellipse'),
        rx            = 5,
        ry            = 7,
        left          = 12,
        top           = 15,
        fill          = 'ff5555',
        fillOpacity   = 0.5,
        strokeWidth   = 2;

    elEllipse.setAttribute('rx', rx);
    elEllipse.setAttribute('ry', ry);
    elEllipse.setAttribute('cx', left);
    elEllipse.setAttribute('cy', top);
    elEllipse.setAttribute('fill', fill);
    elEllipse.setAttribute('fill-opacity', fillOpacity);
    elEllipse.setAttribute('stroke-width', strokeWidth);

    var oEllipse = fabric.Ellipse.fromElement(elEllipse);
    ok(oEllipse instanceof fabric.Ellipse);

    equal(oEllipse.get('rx'), rx);
    equal(oEllipse.get('ry'), ry);
    equal(oEllipse.get('left'), left);
    equal(oEllipse.get('top'), top);
    equal(oEllipse.get('fill'), fill);
    equal(oEllipse.get('opacity'), fillOpacity);
    equal(oEllipse.get('strokeWidth'), strokeWidth);
  });

  test('fromObject', function() {
    ok(typeof fabric.Ellipse == 'function');

    var left    = 112,
        top     = 234,
        rx      = 13.45,
        ry      = 14.78,
        fill    = 'ff5555';

    var ellipse = fabric.Ellipse.fromObject({
      left: left, top: top, rx: rx, ry: ry, fill: fill
    });
    ok(ellipse instanceof fabric.Ellipse);

    equal(ellipse.get('left'), left);
    equal(ellipse.get('top'), top);
    equal(ellipse.get('rx'), rx);
    equal(ellipse.get('ry'), ry);
    equal(ellipse.get('fill'), fill);

    var expected = ellipse.toObject();
    var actual = fabric.Ellipse.fromObject(expected).toObject();

    deepEqual(expected, actual);
  });
})();