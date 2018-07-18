var inflection = require( '../lib/inflection' );
var should     = require( 'should' );

describe( 'test .version', function (){
  it( 'should match proper version format', function (){
    inflection.version.should.match( /^\d+\.\d+\.\d+$/ );
  });
});

describe( 'test .indexOf', function (){
  it( 'should return proper index key', function (){
    inflection.indexOf([ 'hi','there' ], 'guys' ).should.equal( -1 );
    inflection.indexOf([ 'hi','there' ], 'hi' ).should.equal( 0 );
  });
});

describe( 'test .pluralize', function (){
  it( 'should pluralize the given word', function (){
    inflection.pluralize( 'people' ).should.equal( 'people' );
    inflection.pluralize( 'men' ).should.equal( 'men' );
    inflection.pluralize( 'women' ).should.equal( 'women' );
    inflection.pluralize( 'woman' ).should.equal( 'women' );
    inflection.pluralize( 'person' ).should.equal( 'people' );
    inflection.pluralize( 'octopus' ).should.equal( 'octopi' );
    inflection.pluralize( 'human' ).should.equal( 'humans' );
    inflection.pluralize( 'aircraft' ).should.equal( 'aircraft' );
    inflection.pluralize( 'luck' ).should.equal( 'luck' );
    inflection.pluralize( 'Hat' ).should.equal( 'Hats' );
    inflection.pluralize( 'life' ).should.equal( 'lives' );
    inflection.pluralize( 'bath' ).should.equal( 'baths' );
    inflection.pluralize( 'calf' ).should.equal( 'calves' );
    inflection.pluralize( 'foot' ).should.equal( 'feet' );
    inflection.pluralize( 'book' ).should.equal( 'books' );
    inflection.pluralize( 'goose' ).should.equal( 'geese' );
    inflection.pluralize( 'tooth' ).should.equal( 'teeth' );
    inflection.pluralize( 'teeth' ).should.equal( 'teeth' );
    inflection.pluralize( 'knife' ).should.equal( 'knives' );
    inflection.pluralize( 'half' ).should.equal( 'halves' );
    inflection.pluralize( 'cave' ).should.equal( 'caves' );
    inflection.pluralize( 'save' ).should.equal( 'saves' );
    inflection.pluralize( 'street' ).should.equal( 'streets' );
    inflection.pluralize( 'streets' ).should.equal( 'streets' );
    inflection.pluralize( 'data' ).should.equal( 'data' );
    inflection.pluralize( 'meta' ).should.equal( 'meta' );
    inflection.pluralize( 'summons' ).should.equal( 'summonses' );
    inflection.pluralize( 'whereas' ).should.equal( 'whereases' );
    inflection.pluralize( 'person', 'guys' ).should.equal( 'guys' );
    inflection.pluralize( 'index' ).should.equal( 'indices' );
    inflection.pluralize( 'matrix' ).should.equal( 'matrices' );
    inflection.pluralize( 'vertex' ).should.equal( 'vertices' );
    inflection.pluralize( 'canvas' ).should.equal( 'canvases' );
    inflection.pluralize( 'campus' ).should.equal( 'campuses' );
    inflection.pluralize( 'campuses' ).should.equal( 'campuses' );
    inflection.pluralize( 'criterion' ).should.equal( 'criteria' );
    inflection.pluralize( 'criteria' ).should.equal( 'criteria' );
    inflection.pluralize( 'genus' ).should.equal( 'genera' );
    inflection.pluralize( 'genera' ).should.equal( 'genera' );
  });
});

describe( 'test .singularize', function (){
  it( 'should singularize the given word', function (){
    inflection.singularize( 'status' ).should.equal( 'status' );
    inflection.singularize( 'child' ).should.equal( 'child' );
    inflection.singularize( 'children' ).should.equal( 'child' );
    inflection.singularize( 'address' ).should.equal( 'address' );
    inflection.singularize( 'man' ).should.equal( 'man' );
    inflection.singularize( 'woman' ).should.equal( 'woman' );
    inflection.singularize( 'women' ).should.equal( 'woman' );
    inflection.singularize( 'person' ).should.equal( 'person' );
    inflection.singularize( 'people' ).should.equal( 'person' );
    inflection.singularize( 'movies' ).should.equal( 'movie' );
    inflection.singularize( 'queries' ).should.equal( 'query' );
    inflection.singularize( 'octopi' ).should.equal( 'octopus' );
    inflection.singularize( 'Hats' ).should.equal( 'Hat' );
    inflection.singularize( 'lives' ).should.equal( 'life' );
    inflection.singularize( 'baths' ).should.equal( 'bath' );
    inflection.singularize( 'calves' ).should.equal( 'calf' );
    inflection.singularize( 'feet' ).should.equal( 'foot' );
    inflection.singularize( 'books' ).should.equal( 'book' );
    inflection.singularize( 'geese' ).should.equal( 'goose' );
    inflection.singularize( 'teeth' ).should.equal( 'tooth' );
    inflection.singularize( 'tooth' ).should.equal( 'tooth' );
    inflection.singularize( 'knives' ).should.equal( 'knife' );
    inflection.singularize( 'halves' ).should.equal( 'half' );
    inflection.singularize( 'caves' ).should.equal( 'cave' );
    inflection.singularize( 'saves' ).should.equal( 'save' );
    inflection.singularize( 'street' ).should.equal( 'street' );
    inflection.singularize( 'streets' ).should.equal( 'street' );
    inflection.singularize( 'data' ).should.equal( 'datum' );
    inflection.singularize( 'meta' ).should.equal( 'metum' );
    inflection.singularize( 'whereases' ).should.equal( 'whereas' );
    inflection.singularize( 'guys', 'person' ).should.equal( 'person' );
    inflection.singularize( 'matrices' ).should.equal( 'matrix' );
    inflection.singularize( 'vertices' ).should.equal( 'vertex' );
    inflection.singularize( 'canvases' ).should.equal( 'canvas' );
    inflection.singularize( 'campuses' ).should.equal( 'campus' );
    inflection.singularize( 'campus' ).should.equal( 'campus' );
    inflection.singularize( 'criteria' ).should.equal( 'criterion' );
    inflection.singularize( 'criterion' ).should.equal( 'criterion' );
    inflection.singularize( 'genera' ).should.equal( 'genus' );
    inflection.singularize( 'genus' ).should.equal( 'genus' );
    inflection.singularize( 'minus' ).should.equal( 'minus' );

  });
});

describe( 'test .inflect', function (){
  it( 'should correctly inflect the given word based on an integer', function (){
    // zero should use plural state
    inflection.inflect( 'people', 0 ).should.equal( 'people' );
    inflection.inflect( 'men', 0 ).should.equal( 'men' );
    inflection.inflect( 'person', 0 ).should.equal( 'people' );
    inflection.inflect( 'octopus', 0 ).should.equal( 'octopi' );
    inflection.inflect( 'Hat', 0 ).should.equal( 'Hats' );
    inflection.inflect( 'data', 0 ).should.equal( 'data' );
    inflection.inflect( 'meta', 0 ).should.equal( 'meta' );
    inflection.inflect( 'person', 0, 'guy', 'guys' ).should.equal( 'guys' );
    // greater than 1 should use plural state
    inflection.inflect( 'people', 2 ).should.equal( 'people' );
    inflection.inflect( 'men', 2 ).should.equal( 'men' );
    inflection.inflect( 'person', 2 ).should.equal( 'people' );
    inflection.inflect( 'octopus', 2 ).should.equal( 'octopi' );
    inflection.inflect( 'Hat', 2 ).should.equal( 'Hats' );
    inflection.inflect( 'data', 2 ).should.equal( 'data' );
    inflection.inflect( 'meta', 2 ).should.equal( 'meta' );
    inflection.inflect( 'person', 2, 'guy', 'guys' ).should.equal( 'guys' );
    // 1 should use singular state
    inflection.inflect( 'status', 1 ).should.equal( 'status' );
    inflection.inflect( 'child', 1 ).should.equal( 'child' );
    inflection.inflect( 'children', 1 ).should.equal( 'child' );
    inflection.inflect( 'address', 1 ).should.equal( 'address' );
    inflection.inflect( 'person', 1 ).should.equal( 'person' );
    inflection.inflect( 'people', 1 ).should.equal( 'person' );
    inflection.inflect( 'movies', 1 ).should.equal( 'movie' );
    inflection.inflect( 'queries', 1 ).should.equal( 'query' );
    inflection.inflect( 'octopi', 1 ).should.equal( 'octopus' );
    inflection.inflect( 'Hats', 1 ).should.equal( 'Hat' );
    inflection.inflect( 'data', 1 ).should.equal( 'datum' );
    inflection.inflect( 'meta', 1 ).should.equal( 'metum' );
    inflection.inflect( 'guys', 1, 'person', 'people' ).should.equal( 'person' );
    // not a number should return original value
    inflection.inflect( 'original', 'not a number' ).should.equal( 'original' );
  });
});

describe( 'test .camelize', function (){
  it( 'should camelize the given word', function (){
    inflection.camelize( 'message_properties' ).should.equal( 'MessageProperties' );
    inflection.camelize( 'message_properties', true ).should.equal( 'messageProperties' );
    inflection.camelize( 'Message_Properties' ).should.equal( 'MessageProperties' );
    inflection.camelize( 'Message_Properties', true ).should.equal( 'messageProperties' );
    inflection.camelize( 'MESSAGE_PROPERTIES' ).should.equal( 'MESSAGEProperties' );
    inflection.camelize( 'MESSAGE_PROPERTIES', true ).should.equal( 'mESSAGEProperties' );
    inflection.camelize( 'fooBar_Baz', true ).should.equal( 'fooBarBaz' );
    inflection.camelize( 'FooBar_Baz', true ).should.equal( 'fooBarBaz' );
    inflection.camelize( 'fooBar_fooBaz', true ).should.equal( 'fooBarFoobaz' );
    inflection.camelize( 'FooBar_FooBaz', true ).should.equal( 'fooBarFoobaz' );
    inflection.camelize( 'FooBar' ).should.equal( 'FooBar' );
    inflection.camelize( 'FooBar', true ).should.equal( 'fooBar' );
    inflection.camelize( 'Foo/Bar', true ).should.equal( 'foo::Bar' );
    inflection.camelize( 'Foo/Bar' ).should.equal( 'Foo::Bar' );
  });
});

describe( 'test .underscore', function (){
  it( 'should transform the given word with underscore', function (){
    inflection.underscore( 'MessageProperties' ).should.equal( 'message_properties' );
    inflection.underscore( 'messageProperties' ).should.equal( 'message_properties' );
    inflection.underscore( 'MP' ).should.equal( 'm_p' );
    inflection.underscore( 'MP', true ).should.equal( 'MP' );
  });
});

describe( 'test .humanize', function (){
  it( 'should humanize the given word', function (){
    inflection.humanize( 'message_properties' ).should.equal( 'Message properties' );
    inflection.humanize( 'message_properties', true ).should.equal( 'message properties' );
  });
});

describe( 'test .capitalize', function (){
  it( 'should capitalize the given word', function (){
    inflection.capitalize( 'message_properties' ).should.equal( 'Message_properties' );
    inflection.capitalize( 'message properties' ).should.equal( 'Message properties' );
  });
});

describe( 'test .dasherize', function (){
  it( 'should dasherize the given word', function (){
    inflection.dasherize( 'message_properties' ).should.equal( 'message-properties' );
    inflection.dasherize( 'Message Properties' ).should.equal( 'Message-Properties' );
  });
});

describe( 'test .titleize', function (){
  it( 'should titleize the given word', function (){
    inflection.titleize( 'message_properties' ).should.equal( 'Message Properties' );
    inflection.titleize( 'message properties to keep' ).should.equal( 'Message Properties to Keep' );
  });
});

describe( 'test .demodulize', function (){
  it( 'should demodulize the given word', function (){
    inflection.demodulize( 'Message::Bus::Properties' ).should.equal( 'Properties' );
  });
});

describe( 'test .tableize', function (){
  it( 'should tableize the given word', function (){
    inflection.tableize( 'people' ).should.equal( 'people' );
    inflection.tableize( 'MessageBusProperty' ).should.equal( 'message_bus_properties' );
  });
});

describe( 'test .kebabize', function (){
  it( 'should kebabize the given word', function (){
    inflection.kebabize( 'people' ).should.equal( 'people' );
    inflection.kebabize( 'MessageBusProperty' ).should.equal( 'message-bus-property' );
  });
});

describe( 'test .classify', function (){
  it( 'should classify the given word', function (){
    inflection.classify( 'message_bus_properties' ).should.equal( 'MessageBusProperty' );
  });
});

describe( 'test .foreign_key', function (){
  it( 'should transform the given word to foreign_key', function (){
    inflection.foreign_key( 'MessageBusProperty' ).should.equal( 'message_bus_property_id' );
    inflection.foreign_key( 'MessageBusProperty', true ).should.equal( 'message_bus_propertyid' );
  });
});

describe( 'test .ordinalize', function (){
  it( 'should ordinalize the given word', function (){
    inflection.ordinalize( 'the 1 pitch' ).should.equal( 'the 1st pitch' );
  });
});

describe( 'test .transform', function (){
  it( 'should transform the given word with given methods', function (){
    inflection.transform( 'all job', [ 'pluralize', 'dasherize' ] ).should.equal( 'all-jobs' );
    inflection.transform( 'all job', [ 'pluralize', 'anInvalidMethod' ] ).should.equal( 'all jobs' );
    inflection.transform( 'all job', [ 'capitalize', 'pluralize', 'dasherize' ] ).should.equal( 'All-jobs' );
  });
});
