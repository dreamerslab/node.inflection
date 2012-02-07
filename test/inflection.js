var inflection = require( '../lib/inflection' );
var should     = require( 'should' );

module.exports = {
  'test .version' : function ( callback ){
    inflection.version.should.match( /^\d+\.\d+\.\d+$/ );
    callback();
  },

  'test .indexOf' : function ( callback ){
    inflection.indexOf([ 'hi','there' ], 'guys' ).should.equal( -1 );
    inflection.indexOf([ 'hi','there' ], 'hi' ).should.equal( 0 );
    callback();
  },

  'test .pluralize' : function ( callback ){
    inflection.pluralize( 'people' ).should.equal( 'people' );
    inflection.pluralize( 'men' ).should.equal( 'men' );
    inflection.pluralize( 'person' ).should.equal( 'people' );
    inflection.pluralize( 'octopus' ).should.equal( 'octopi' );
    inflection.pluralize( 'Hat' ).should.equal( 'Hats' );
    inflection.pluralize( 'person', 'guys' ).should.equal( 'guys' );
    callback();
  },

  'test .singularize' : function ( callback ){
    inflection.singularize( 'person' ).should.equal( 'person' );
    inflection.singularize( 'people' ).should.equal( 'person' );
    inflection.singularize( 'octopi' ).should.equal( 'octopus' );
    inflection.singularize( 'Hats' ).should.equal( 'Hat' );
    inflection.singularize( 'guys', 'person' ).should.equal( 'person' );
    callback();
  },

  'test .camelize' : function ( callback ){
    inflection.camelize( 'message_properties' ).should.equal( 'MessageProperties' );
    inflection.camelize( 'message_properties', true ).should.equal( 'messageProperties' );
    callback();
  },

  'test .underscore' : function ( callback ){
    inflection.underscore( 'MessageProperties' ).should.equal( 'message_properties' );
    inflection.underscore( 'messageProperties' ).should.equal( 'message_properties' );
    callback();
  },

  'test .humanize' : function ( callback ){
    inflection.humanize( 'message_properties' ).should.equal( 'Message properties' );
    inflection.humanize( 'message_properties', true ).should.equal( 'message properties' );
    callback();
  },

  'test .capitalize' : function ( callback ){
    inflection.capitalize( 'message_properties' ).should.equal( 'Message_properties' );
    inflection.capitalize( 'message properties' ).should.equal( 'Message properties' );
    callback();
  },

  'test .dasherize' : function ( callback ){
    inflection.dasherize( 'message_properties' ).should.equal( 'message-properties' );
    inflection.dasherize( 'Message Properties' ).should.equal( 'Message-Properties' );
    callback();
  },

  'test .titleize' : function ( callback ){
    inflection.titleize( 'message_properties' ).should.equal( 'Message Properties' );
    inflection.titleize( 'message properties to keep' ).should.equal( 'Message Properties to Keep' );
    callback();
  },

  'test .demodulize' : function ( callback ){
    inflection.demodulize( 'Message::Bus::Properties' ).should.equal( 'Properties' );
    callback();
  },

  'test .tableize' : function ( callback ){
    // inflection.tableize( 'people' ).should.equal( 'people' );
    inflection.tableize( 'MessageBusProperty' ).should.equal( 'message_bus_properties' );
    callback();
  },

  'test .classify' : function ( callback ){
    inflection.classify( 'message_bus_properties' ).should.equal( 'MessageBusProperty' );
    callback();
  },

  'test .foreign_key' : function ( callback ){
    inflection.foreign_key( 'MessageBusProperty' ).should.equal( 'message_bus_property_id' );
    inflection.foreign_key( 'MessageBusProperty', true ).should.equal( 'message_bus_propertyid' );
    callback();
  },

  'test .ordinalize' : function ( callback ){
    inflection.ordinalize( 'the 1 pitch' ).should.equal( 'the 1st pitch' );
    callback();
  }
};
