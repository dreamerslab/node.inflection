/*!
 * inflection
 * Copyright(c) 2010 Ryan Schuft <ryan.schuft@gmail.com>
 * MIT Licensed
 *
 * @fileoverview
 * A port of inflection-js to node.js module
 */

/**
 * @description This is a list of nouns that use the same form for both singular and plural.
 *              This list should remain entirely in lower case to correctly match Strings.
 * @private
 */
var uncountable_words = [
  'equipment', 'information', 'rice', 'money', 'species',
  'series', 'fish', 'sheep', 'moose', 'deer', 'news'
];

/**
 * @description These rules translate from the singular form of a noun to its plural form.
 * @private
 */
var plural_rules = [
  [ new RegExp( '(m)an$', 'gi' ),                 '$1en' ],
  [ new RegExp( '(pe)rson$', 'gi' ),              '$1ople' ],
  [ new RegExp( '(child)$', 'gi' ),               '$1ren' ],
  [ new RegExp( '^(ox)$', 'gi' ),                 '$1en' ],
  [ new RegExp( '(ax|test)is$', 'gi' ),           '$1es' ],
  [ new RegExp( '(octop|vir)us$', 'gi' ),         '$1i' ],
  [ new RegExp( '(alias|status)$', 'gi' ),        '$1es' ],
  [ new RegExp( '(bu)s$', 'gi' ),                 '$1ses' ],
  [ new RegExp( '(buffal|tomat|potat)o$', 'gi' ), '$1oes' ],
  [ new RegExp( '([ti])um$', 'gi' ),              '$1a' ],
  [ new RegExp( 'sis$', 'gi' ),                   'ses' ],
  [ new RegExp( '(?:([^f])fe|([lr])f)$', 'gi' ),  '$1$2ves' ],
  [ new RegExp( '(hive)$', 'gi' ),                '$1s' ],
  [ new RegExp( '([^aeiouy]|qu)y$', 'gi' ),       '$1ies' ],
  [ new RegExp( '(x|ch|ss|sh)$', 'gi' ),          '$1es' ],
  [ new RegExp( '(matr|vert|ind)ix|ex$', 'gi' ),  '$1ices' ],
  [ new RegExp( '([m|l])ouse$', 'gi' ),           '$1ice' ],
  [ new RegExp( '(quiz)$', 'gi' ),                '$1zes' ],
  [ new RegExp( 's$', 'gi' ),                     's' ],
  [ new RegExp( '$', 'gi' ),                      's' ]
];

/**
 * @description These rules translate from the plural form of a noun to its singular form.
 * @private
 */
var singular_rules = [
  [ new RegExp( '(m)en$', 'gi' ),                                                       '$1an' ],
  [ new RegExp( '(pe)ople$', 'gi' ),                                                    '$1rson' ],
  [ new RegExp( '(child)ren$', 'gi' ),                                                  '$1' ],
  [ new RegExp( '([ti])a$', 'gi' ),                                                     '$1um' ],
  [ new RegExp( '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$','gi' ), '$1$2sis' ],
  [ new RegExp( '(hive)s$', 'gi' ),                                                     '$1' ],
  [ new RegExp( '(tive)s$', 'gi' ),                                                     '$1' ],
  [ new RegExp( '(curve)s$', 'gi' ),                                                    '$1' ],
  [ new RegExp( '([lr])ves$', 'gi' ),                                                   '$1f' ],
  [ new RegExp( '([^fo])ves$', 'gi' ),                                                  '$1fe' ],
  [ new RegExp( '([^aeiouy]|qu)ies$', 'gi' ),                                           '$1y' ],
  [ new RegExp( '(s)eries$', 'gi' ),                                                    '$1eries' ],
  [ new RegExp( '(m)ovies$', 'gi' ),                                                    '$1ovie' ],
  [ new RegExp( '(x|ch|ss|sh)es$', 'gi' ),                                              '$1' ],
  [ new RegExp( '([m|l])ice$', 'gi' ),                                                  '$1ouse' ],
  [ new RegExp( '(bus)es$', 'gi' ),                                                     '$1' ],
  [ new RegExp( '(o)es$', 'gi' ),                                                       '$1' ],
  [ new RegExp( '(shoe)s$', 'gi' ),                                                     '$1' ],
  [ new RegExp( '(cris|ax|test)es$', 'gi' ),                                            '$1is' ],
  [ new RegExp( '(octop|vir)i$', 'gi' ),                                                '$1us' ],
  [ new RegExp( '(alias|status)es$', 'gi' ),                                            '$1' ],
  [ new RegExp( '^(ox)en', 'gi' ),                                                      '$1' ],
  [ new RegExp( '(vert|ind)ices$', 'gi' ),                                              '$1ex' ],
  [ new RegExp( '(matr)ices$', 'gi' ),                                                  '$1ix' ],
  [ new RegExp( '(quiz)zes$', 'gi' ),                                                   '$1' ],
  [ new RegExp( 's$', 'gi' ),                                                           '' ]
];

/**
 * @description This is a list of words that should not be capitalized for title case.
 * @private
 */
var non_titlecased_words = [
  'and', 'or', 'nor', 'a', 'an', 'the', 'so', 'but', 'to', 'of', 'at','by',
  'from', 'into', 'on', 'onto', 'off', 'out', 'in', 'over', 'with', 'for'
];

/**
 * @description These are regular expressions used for converting between String formats.
 * @private
 */
var id_suffix         = new RegExp( '(_ids|_id)$', 'g' );
var underbar          = new RegExp( '_', 'g' );
var space_or_underbar = new RegExp( '[\ _]', 'g' );
var uppercase         = new RegExp( '([A-Z])', 'g' );
var underbar_prefix   = new RegExp( '^_' );



module.exports = {

/**
 * @public
 * @version 0.0.1
 */
  version : '0.0.1',



/**
 * A helper method that applies rules based replacement to a String.
 * @private
 * @function
 * @param {String} str String to modify and return based on the passed rules.
 * @param {Array: [RegExp, String]} rules Regexp to match paired with String to use for replacement
 * @param {Array: [String]} skip Strings to skip if they match
 * @param {String} override String to return as though this method succeeded (used to conform to APIs)
 * @return {String} Return passed String modified by passed rules.
 * @example
 *
 *     _apply_rules( "cows", singular_rules ); // === 'cow'
 */
  _apply_rules : function( str, rules, skip, override ){
      if( override ){
        str = override;
      }else{
        var ignore = ( this.indexOf( skip, str.toLowerCase()) > -1 );

        if( !ignore ){
          var i = 0;
          var j = rules.length;

          for( ; i < j; i++ ){
            if( str.match( rules[ i ][ 0 ])){
              str = str.replace( rules[ i ][ 0 ], rules[ i ][ 1 ]);
              break;
            }
          }
        }
      }

      return str;
  },



/**
 * This lets us detect if an Array contains a given element.
 * @public
 * @function
 * @param {Array} arr The subject array.
 * @param {Object} item Object to locate in the Array.
 * @param {Number} fromIndex Starts checking from this position in the Array.(optional)
 * @param {Function} compareFunc Function used to compare Array item vs passed item.(optional)
 * @return {Number} Return index position in the Array of the passed item.
 * @example
 *
 *     indexOf([ 'hi','there' ], 'guys' ); // === -1
 *     indexOf([ 'hi','there' ], 'hi' ); // === 0
 */
  indexOf : function( arr, item, fromIndex, compareFunc ){
    if( !fromIndex ){
      fromIndex = -1;
    }

    var index = -1;
    var i     = fromIndex;
    var j     = arr.length;

    for( ; i < j; i++ ){
      if( arr[ i ]  === item || compareFunc && compareFunc( arr[ i ], item )){
        index = i;
        break;
      }
    }

    return index;
  },



/**
 * This function adds plurilization support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @param {String} plural overrides normal output with said String.(optional)
 * @return {String} Singular English language nouns are returned in plural form.
 * @example
 *
 *     pluralize( 'person' ); // === 'people'
 *     pluralize( 'octopus' ); // === "octopi"
 *     pluralize( 'Hat' ); // === 'Hats'
 *     pluralize( 'person', 'guys' ); // === 'guys'
 */
  pluralize : function ( str, plural ){
    return this._apply_rules( str, plural_rules, uncountable_words, plural );
  },



/**
 * This function adds singularization support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @param {String} singular overrides normal output with said String.(optional)
 * @return {String} Plural English language nouns are returned in singular form.
 * @example
 *
 *     singularize( 'people' ); // === 'person'
 *     singularize( 'octopi' ); // === "octopus"
 *     singularize( 'Hats' ); // === 'Hat'
 *     singularize( 'guys', 'person' ); // === 'person'
 */
  singularize : function ( str, singular ){
    return this._apply_rules( str, singular_rules, uncountable_words, singular );
  },



/**
 * This function adds camelization support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @param {Boolean} lowFirstLetter Default is to capitalize the first letter of the results.(optional)
 *                                 passing true will lowercase it.
 * @return {String} Lower case underscored words will be returned in camel case.
 *                  additionally '/' is translated to '::'
 * @example
 *
 *     camelize( 'message_properties' ); // === 'MessageProperties'
 *     camelize( 'message_properties', true ); // === 'messageProperties'
 */
  camelize : function ( str, lowFirstLetter ){
    var str_path = str.toLowerCase().split( '/' );
    var i        = 0;
    var j        = str_path.length;

    for( ; i < j; i++ ){
      var str_arr = str_path[ i ].split( '_' );
      var initX   = (( lowFirstLetter && i + 1 === j ) ? ( 1 ) : ( 0 ));
      var k       = initX;
      var l       = str_arr.length;

      for( ; k < l; k++ ){
        str_arr[ k ] = str_arr[ k ].charAt( 0 ).toUpperCase() + str_arr[ k ].substring( 1 );
      }

      str_path[ i ] = str_arr.join( '' );
    }

    return str_path.join( '::' );
  },



/**
 * This function adds underscore support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @return {String} Camel cased words are returned as lower cased and underscored.
 *                  additionally '::' is translated to '/'.
 * @example
 *
 *     underscore( 'MessageProperties' ); // === 'message_properties'
 *     underscore( 'messageProperties', true ); // === 'message_properties'
 */
  underscore : function ( str ){
    var str_path = str.split( '::' );
    var i        = 0;
    var j        = str_path.length;

    for( ; i < j; i++ ){
      str_path[ i ] = str_path[ i ].replace( uppercase, '_$1' );
      str_path[ i ] = str_path[ i ].replace( underbar_prefix, '' );
    }

    return str_path.join( '/' ).toLowerCase();
  },



/**
 * This function adds humanize support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @param {Boolean} lowFirstLetter Default is to capitalize the first letter of the results.(optional)
 *                                 passing true will lowercase it.
 * @return {String} Lower case underscored words will be returned in humanized form.
 * @example
 *
 *     humanize( 'message_properties' ); // === 'Message properties'
 *     humanize( 'message_properties', true ); // === 'message properties'
 */
  humanize : function( str, lowFirstLetter ){
    str = str.toLowerCase();
    str = str.replace( id_suffix, '' );
    str = str.replace( underbar, ' ' );

    if( !lowFirstLetter ){
      str = this.capitalize( str );
    }

    return str;
  },



/**
 * This function adds capitalization support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @return {String} All characters will be lower case and the first will be upper.
 * @example
 *
 *     capitalize( 'message_properties' ); // === 'Message_properties'
 *     capitalize( 'message properties', true ); // === 'Message properties'
 */
  capitalize : function ( str ){
    str = str.toLowerCase();

    return str.substring( 0, 1 ).
                toUpperCase() + str.substring( 1 );
  },



/**
 * This function adds dasherization support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @return {String} Replaces all spaces or underbars with dashes.
 * @example
 *
 *     dasherize( 'message_properties' ); // === 'message-properties'
 *     dasherize( 'Message Properties' ); // === 'Message-Properties'
 */
  dasherize : function ( str ){
    return str.replace( space_or_underbar, '-' );
  },



/**
 * This function adds titleize support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @return {String} Capitalizes words as you would for a book title.
 * @example
 *
 *     titleize( 'message_properties' ); // === 'Message Properties'
 *     titleize( 'message properties to keep' ); // === 'Message Properties to Keep'
 */
  titleize : function ( str ){
    str         = str.toLowerCase().replace( underbar, ' ');
    var str_arr = str.split(' ');
    var i       = 0;
    var j       = str_arr.length;

    for( ; i < j; i++ ){
      var d = str_arr[ i ].split( '-' );
      var k = 0;
      var l = d.length;

      for( ; k < l; k++){
        if( this.indexOf( non_titlecased_words, d[ k ].toLowerCase()) < 0 ){
          d[ k ] = this.capitalize( d[ k ]);
        }
      }

      str_arr[ i ] = d.join( '-' );
    }

    str = str_arr.join( ' ' );
    str = str.substring( 0, 1 ).toUpperCase() + str.substring( 1 );

    return str;
  },



/**
 * This function adds demodulize support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @return {String} Removes module names leaving only class names.(Ruby style)
 * @example
 *
 *     demodulize( 'Message::Bus::Properties' ); // === 'Properties'
 */
  demodulize : function ( str ){
    var str_arr = str.split( '::' );

    return str_arr[ str_arr.length - 1 ];
  },



/**
 * This function adds tableize support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @return {String} Return camel cased words into their underscored plural form.
 * @example
 *
 *     tableize( 'MessageBusProperty' ); // === 'message_bus_properties'
 */
  tableize : function ( str ){
    str = this.underscore( str );
    str = this.pluralize( str );

    return str;
  },



/**
 * This function adds classification support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @return {String} Underscored plural nouns become the camel cased singular form.
 * @example
 *
 *     classify( 'message_bus_properties' ); // === 'MessageBusProperty'
 */
  classify : function ( str ){
    str = this.camelize( str );
    str = this.singularize( str );

    return str;
  },



/**
 * This function adds foreign key support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @param {Boolean} dropIdUbar Default is to seperate id with an underbar at the end of the class name,
                               you can pass true to skip it.(optional)
 * @return {String} Underscored plural nouns become the camel cased singular form.
 * @example
 *
 *     foreign_key( 'MessageBusProperty' ); // === 'message_bus_property_id'
 *     foreign_key( 'MessageBusProperty', true ); // === 'message_bus_propertyid'
 */
  foreign_key : function( str, dropIdUbar ){
    str = this.demodulize( str );
    str = this.underscore( str ) + (( dropIdUbar ) ? ( '' ) : ( '_' )) + 'id';

    return str;
  },



/**
 * This function adds ordinalize support to every String object.
 * @public
 * @function
 * @param {String} str The subject string.
 * @return {String} Return all found numbers their sequence like "22nd".
 * @example
 *
 *     ordinalize( 'the 1 pitch' ); // === 'the 1st pitch'
 */
  ordinalize : function ( str ){
    var str_arr = str.split(' ');
    var i       = 0;
    var j       = str_arr.length;

    for( ; i < j; i++ ){
      var k = parseInt( str_arr[ i ], 10 );

      if( !isNaN( k )){
        var ltd = str_arr[ i ].substring( str_arr[ i ].length - 2 );
        var ld  = str_arr[ i ].substring( str_arr[ i ].length - 1 );
        var suf = 'th';

        if( ltd != '11' && ltd != '12' && ltd != '13' ){
          if( ld === '1' ){
            suf = 'st';
          }else if( ld === '2' ){
            suf = 'nd';
          }else if( ld === '3' ){
            suf = 'rd';
          }
        }

        str_arr[ i ] += suf;
      }
    }

    return str_arr.join( ' ' );
  }
};
