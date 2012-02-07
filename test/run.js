var tests = require( './inflection' );
var Flow  = require( 'node.flow' );
var flow  = new Flow();



Object.keys( tests ).forEach( function( test ){
  flow.parallel( function ( ready ){
    tests[ test ]( ready );
  });
});

flow.join().end( function (){
  console.log( 'All test passed :)' );
});
