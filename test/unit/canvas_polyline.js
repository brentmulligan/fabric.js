(function() {
  
  function getPoints() {
    return [
      {x: 10, y: 12},
      {x: 20, y: 22}
    ];
  }
  
  var REFERENCE_OBJECT = {
    'type':         'polyline', 
    'left':         0, 
    'top':          0, 
    'width':        10, 
    'height':       10, 
    'fill':         'rgb(0,0,0)', 
    'overlayFill':  null,
    'stroke':       null, 
    'strokeWidth':  1, 
    'scaleX':       1, 
    'scaleY':       1, 
    'angle':        0, 
    'flipX':        false, 
    'flipY':        false, 
    'opacity':      1, 
    'points':       getPoints()
  };
  
  module('Canvas.Polyline');
  
  test('constructor', function() {
    ok(Canvas.Polyline);
    
    var polyline = new Canvas.Polyline(getPoints());
    
    ok(polyline instanceof Canvas.Polyline);
    ok(polyline instanceof Canvas.Object);
    
    equals(polyline.type, 'polyline');
    same(polyline.get('points'), getPoints());
  });
  
  test('complexity', function() {
    var polyline = new Canvas.Polyline(getPoints());
    ok(typeof polyline.complexity == 'function');
  });
  
  test('toObject', function() {
    var polyline = new Canvas.Polyline(getPoints());
    ok(typeof polyline.toObject == 'function');
    same(polyline.toObject(), REFERENCE_OBJECT);
  });
  
  test('fromObject', function() {
    ok(typeof Canvas.Polyline.fromObject == 'function');
    var polyline = Canvas.Polyline.fromObject(REFERENCE_OBJECT);
    ok(polyline instanceof Canvas.Polyline);
    same(polyline.toObject(), REFERENCE_OBJECT);
  });
  
  test('fromElement', function() {
    ok(typeof Canvas.Polyline.fromElement == 'function');
    
    var elPolyline = document.createElement('polyline');
    
    elPolyline.setAttribute('points', '10,12 20,22');
    
    var polyline = Canvas.Polyline.fromElement(elPolyline);
    
    ok(polyline instanceof Canvas.Polyline);
    same(REFERENCE_OBJECT, polyline.toObject());
    
    var elPolylineWithAttrs = document.createElement('polyline');
    elPolylineWithAttrs.setAttribute('points', '10,10 20,20 30,30 10,10');
    elPolylineWithAttrs.setAttribute('fill', 'rgb(255,255,255)');
    elPolylineWithAttrs.setAttribute('fill-opacity', '0.34');
    elPolylineWithAttrs.setAttribute('stroke-width', '3');
    elPolylineWithAttrs.setAttribute('stroke', 'blue');
    elPolylineWithAttrs.setAttribute('transform', 'translate(-10,-20) scale(2)');
    
    var polylineWithAttrs = Canvas.Polyline.fromElement(elPolylineWithAttrs);
    //var expectedPoints = [{x: 10, y: 10}, {x: 20, y: 20}, {x: 30, y: 30}, {x: 10, y: 10}];
    /*
    same(Canvas.base.object.extend(REFERENCE_OBJECT, {
      'width': 20, 
      'height': 20, 
      'fill': 'rgb(255,255,255)', 
      'stroke': 'blue', 
      'strokeWidth': 3, 
      'opacity': 0.34,
      'points': expectedPoints
    }), polylineWithAttrs.toObject());
    
    same([ 2, 0, 0, 2, -10, -20 ], polylineWithAttrs.get('transformMatrix'));
    
    var elPolylineWithoutPoints = document.createElement('polyline');
    /*
    this.assertRaise('TypeError', function(){
      Canvas.Polyline.fromElement(elPolylineWithoutPoints);
    }, 'missing points attribute should result in error');
    
    equals(Canvas.Polyline.fromElement(), null);
    */
  });
})();