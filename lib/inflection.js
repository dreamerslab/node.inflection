/*!
 * inflection
 * Copyright(c) 2011 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * A port of inflection-js to node.js module.
 */

( function ( root, factory ){
  if( typeof define === 'function' && define.amd ){
    define([], factory );
  }else if( typeof exports === 'object' ){
    module.exports = factory();
  }else{
    root.inflection = factory();
  }
}( this, function (){

  /**
   * @description This is a list of nouns that use the same form for both singular and plural.
   *              This list should remain entirely in lower case to correctly match Strings.
   * @private
   */
  var uncountable_words = [
    'access',
    'accommodation',
    'adulthood',
    'advertising',
    'advice',
    'aggression',
    'aid',
    'air',
    'aircraft',
    'alcohol',
    'anger',
    'applause',
    'arithmetic',
    'art',
    'assistance',
    'athletics',
    'attention',

    'bacon',
    'baggage',
    'ballet',
    'beauty',
    'beef',
    'beer',
    'behavior',
    'biology',
    // 'billiards',
    'blood',
    'botany',
    // 'bowels',
    'bread',
    'business',
    'butter',

    'carbon',
    'cardboard',
    'cash',
    'chalk',
    'chaos',
    'chess',
    'crossroads',
    'countryside',

    'damage',
    'dancing',
    'danger',
    'deer',
    'delight',
    'dessert',
    'dignity',
    'dirt',
    'distribution',
    'dust',

    'economics',
    'education',
    'electricity',
    'employment',
    'energy',
    'engineering',
    'enjoyment',
    'entertainment',
    'envy',
    'equipment',
    'ethics',
    'evidence',
    'evolution',

    'failure',
    'faith',
    'fame',
    'fiction',
    // 'fish',
    'flour',
    'flu',
    'food',
    'freedom',
    'fruit',
    'fuel',
    'fun',
    // 'funeral',
    'furniture',

    'gallows',
    'garbage',
    'garlic',
    'gas',
    'genetics',
    'glass',
    'gold',
    'golf',
    'gossip',
    'grammar',
    'grass',
    'gratitude',
    'grief',
    'ground',
    'guilt',
    'gymnastics',

    'hair',
    'happiness',
    'hardware',
    'harm',
    'hate',
    'hatred',
    'health',
    'heat',
    'height',
    'help',
    'homework',
    'honesty',
    'honey',
    'hospitality',
    'housework',
    'humour',
    'hunger',
    'hydrogen',

    'ice',
    'importance',
    'inflation',
    'information',
    'injustice',
    'innocence',
    'intelligence',
    'iron',
    'irony',

    'jam',
    'jealousy',
    'jelly',
    'jewelry',
    'joy',
    'judo',
    'juice',
    'justice',

    'karate',
    'kindness',
    'knowledge',

    'labour',
    'lack',
    'land',
    'laughter',
    'lava',
    'leather',
    'leisure',
    'lightning',
    'linguine',
    'linguini',
    'linguistics',
    'literature',
    'litter',
    'livestock',
    'logic',
    'loneliness',
    'love',
    'luck',
    'luggage',

    'macaroni',
    'machinery',
    'magic',
    'mail',
    'management',
    'mankind',
    'marble',
    'mathematics',
    'mayonnaise',
    'measles',
    'meat',
    'metal',
    'methane',
    'milk',
    'money',
    // 'moose',
    'mud',
    'music',
    'mumps',

    'nature',
    'news',
    'nitrogen',
    'nonsense',
    'nurture',
    'nutrition',

    'obedience',
    'obesity',
    'oil',
    'oxygen',

    'paper',
    'passion',
    'pasta',
    'patience',
    'permission',
    'physics',
    'poetry',
    'pollution',
    'poverty',
    'power',
    'pride',
    'production',
    'progress',
    'pronunciation',
    'psychology',
    'publicity',
    'punctuation',

    'quality',
    'quantity',
    'quartz',

    'racism',
    'rain',
    'recreation',
    'relaxation',
    'reliability',
    'research',
    'respect',
    'revenge',
    'rice',
    'rubbish',
    'rum',

    'safety',
    'salad',
    'salt',
    'sand',
    'satire',
    'scenery',
    'seafood',
    'seaside',
    'series',
    'shame',
    'sheep',
    'shopping',
    'silence',
    'sleep',
    // 'slang'
    'smoke',
    'smoking',
    'snow',
    'soap',
    'software',
    'soil',
    'sorrow',
    'soup',
    'spaghetti',
    'speed',
    'species',
    'spelling',
    'sport',
    'steam',
    'strength',
    'stuff',
    'stupidity',
    'success',
    'sugar',
    'sunshine',
    'symmetry',

    'tea',
    'tennis',
    'thirst',
    'thunder',
    'timber',
    'time',
    'toast',
    'tolerance',
    'trade',
    'traffic',
    'transportation',
    'travel',
    'trust',

    'understanding',
    'underwear',
    'unemployment',
    'unity',
    'usage',

    'validity',
    'veal',
    'vegetation',
    'vegetarianism',
    'vengeance',
    'violence',
    'vision',
    'vitality',

    'warmth',
    'water',
    'wealth',
    'weather',
    'weight',
    'welfare',
    'wheat',
    'whiskey',
    'width',
    'wildlife',
    'wine',
    'wisdom',
    'wood',
    'wool',
    'work',

    'yeast',
    'yoga',

    'zinc',
    'zoology'
  ];

  /**
   * @description These rules translate from the singular form of a noun to its plural form.
   * @private
   */
  var plural_rules = [

    // do not replace if its already a plural word
    [ new RegExp( '^(m)en$'    , 'gi' )],
    [ new RegExp( '(pe)ople$'  , 'gi' )],
    [ new RegExp( '(child)ren$', 'gi' )],
    [ new RegExp( '([ti])a$'   , 'gi' )],
    [ new RegExp( '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$','gi' )],
    [ new RegExp( '(hi|ti)ves$'       , 'gi' )],
    [ new RegExp( '(curve)s$'         , 'gi' )],
    [ new RegExp( '([lr])ves$'        , 'gi' )],
    [ new RegExp( '([^fo])ves$'       , 'gi' )],
    [ new RegExp( '([^aeiouy]|qu)ies$', 'gi' )],
    [ new RegExp( '(s)eries$'         , 'gi' )],
    [ new RegExp( '(m)ovies$'         , 'gi' )],
    [ new RegExp( '(x|ch|ss|sh)es$'   , 'gi' )],
    [ new RegExp( '([m|l])ice$'       , 'gi' )],
    [ new RegExp( '(bus)es$'          , 'gi' )],
    [ new RegExp( '(o)es$'            , 'gi' )],
    [ new RegExp( '(shoe)s$'          , 'gi' )],
    [ new RegExp( '(cris|ax|test)es$' , 'gi' )],
    [ new RegExp( '(octop|vir)i$'     , 'gi' )],
    [ new RegExp( '(alias|status)es$' , 'gi' )],
    [ new RegExp( '^(summons)es$'     , 'gi' )],
    [ new RegExp( '^(ox)en'           , 'gi' )],
    [ new RegExp( '(vert|ind)ices$'   , 'gi' )],
    [ new RegExp( '(matr)ices$'       , 'gi' )],
    [ new RegExp( '^feet$'            , 'gi' )],
    [ new RegExp( '^teeth$'           , 'gi' )],
    [ new RegExp( '^geese$'           , 'gi' )],
    [ new RegExp( '(quiz)zes$'        , 'gi' )],

    // original rule
    [ new RegExp( '^(m)an$'                      , 'gi' ), '$1en' ],
    [ new RegExp( '(pe)rson$'                    , 'gi' ), '$1ople' ],
    [ new RegExp( '(child)$'                     , 'gi' ), '$1ren' ],
    [ new RegExp( '^(ox)$'                       , 'gi' ), '$1en' ],
    [ new RegExp( '(ax|test)is$'                 , 'gi' ), '$1es' ],
    [ new RegExp( '(octop|vir)us$'               , 'gi' ), '$1i' ],
    [ new RegExp( '(alias|status)$'              , 'gi' ), '$1es' ],
    [ new RegExp( '^(summons)$'                  , 'gi' ), '$1es' ],
    [ new RegExp( '(bu)s$'                       , 'gi' ), '$1ses' ],
    [ new RegExp( '(buffal|tomat|potat|volcan)o$', 'gi' ), '$1oes' ],
    [ new RegExp( '([ti])um$'                    , 'gi' ), '$1a' ],
    [ new RegExp( 'sis$'                         , 'gi' ), 'ses' ],
    [ new RegExp( '(?:([^f])fe|([lr])f)$'        , 'gi' ), '$1$2ves' ],
    [ new RegExp( '(hi|ti)ve$'                   , 'gi' ), '$1ves' ],
    [ new RegExp( '([^aeiouy]|qu)y$'             , 'gi' ), '$1ies' ],
    [ new RegExp( '(x|ch|ss|sh)$'                , 'gi' ), '$1es' ],
    [ new RegExp( '(matr|vert|ind)ix|ex$'        , 'gi' ), '$1ices' ],
    [ new RegExp( '([m|l])ouse$'                 , 'gi' ), '$1ice' ],
    [ new RegExp( '^foot$'                       , 'gi' ), 'feet' ],
    [ new RegExp( '^tooth$'                      , 'gi' ), 'teeth' ],
    [ new RegExp( '^goose$'                      , 'gi' ), 'geese' ],
    [ new RegExp( '(quiz)$'                      , 'gi' ), '$1zes' ],

    [ new RegExp( 's$', 'gi' ), 's' ],
    [ new RegExp( '$' , 'gi' ), 's' ]
  ];

  /**
   * @description These rules translate from the plural form of a noun to its singular form.
   * @private
   */
  var singular_rules = [

    // do not replace if its already a singular word
    [ new RegExp( '^(m)an$'               , 'gi' )],
    [ new RegExp( '(pe)rson$'             , 'gi' )],
    [ new RegExp( '(child)$'              , 'gi' )],
    [ new RegExp( '^(ox)$'                , 'gi' )],
    [ new RegExp( '(ax|test)is$'          , 'gi' )],
    [ new RegExp( '(octop|vir)us$'        , 'gi' )],
    [ new RegExp( '(alias|status)$'       , 'gi' )],
    [ new RegExp( '^(summons)$'           , 'gi' )],
    [ new RegExp( '(bu)s$'                , 'gi' )],
    [ new RegExp( '(buffal|tomat|potat)o$', 'gi' )],
    [ new RegExp( '([ti])um$'             , 'gi' )],
    [ new RegExp( 'sis$'                  , 'gi' )],
    [ new RegExp( '(?:([^f])fe|([lr])f)$' , 'gi' )],
    [ new RegExp( '(hi|ti)ve$'            , 'gi' )],
    [ new RegExp( '([^aeiouy]|qu)y$'      , 'gi' )],
    [ new RegExp( '(x|ch|ss|sh)$'         , 'gi' )],
    [ new RegExp( '(matr|vert|ind)ix|ex$' , 'gi' )],
    [ new RegExp( '([m|l])ouse$'          , 'gi' )],
    [ new RegExp( '^foot$'                , 'gi' )],
    [ new RegExp( '^tooth$'               , 'gi' )],
    [ new RegExp( '^goose$'               , 'gi' )],
    [ new RegExp( '(quiz)$'               , 'gi' )],

    // original rule
    [ new RegExp( '^(m)en$'    , 'gi' ), '$1an' ],
    [ new RegExp( '(pe)ople$'  , 'gi' ), '$1rson' ],
    [ new RegExp( '(child)ren$', 'gi' ), '$1' ],
    [ new RegExp( '([ti])a$'   , 'gi' ), '$1um' ],
    [ new RegExp( '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$','gi' ), '$1$2sis' ],
    [ new RegExp( '(hi|ti)ves$'       , 'gi' ), '$1ve' ],
    [ new RegExp( '(curve)s$'         , 'gi' ), '$1' ],
    [ new RegExp( '([lr])ves$'        , 'gi' ), '$1f' ],
    [ new RegExp( '([^fo])ves$'       , 'gi' ), '$1fe' ],
    [ new RegExp( '(m)ovies$'         , 'gi' ), '$1ovie' ],
    [ new RegExp( '([^aeiouy]|qu)ies$', 'gi' ), '$1y' ],
    [ new RegExp( '(s)eries$'         , 'gi' ), '$1eries' ],
    [ new RegExp( '(x|ch|ss|sh)es$'   , 'gi' ), '$1' ],
    [ new RegExp( '([m|l])ice$'       , 'gi' ), '$1ouse' ],
    [ new RegExp( '(bus)es$'          , 'gi' ), '$1' ],
    [ new RegExp( '(o)es$'            , 'gi' ), '$1' ],
    [ new RegExp( '(shoe)s$'          , 'gi' ), '$1' ],
    [ new RegExp( '(cris|ax|test)es$' , 'gi' ), '$1is' ],
    [ new RegExp( '(octop|vir)i$'     , 'gi' ), '$1us' ],
    [ new RegExp( '(alias|status)es$' , 'gi' ), '$1' ],
    [ new RegExp( '^(summons)es$'     , 'gi' ), '$1' ],
    [ new RegExp( '^(ox)en'           , 'gi' ), '$1' ],
    [ new RegExp( '(vert|ind)ices$'   , 'gi' ), '$1ex' ],
    [ new RegExp( '(matr)ices$'       , 'gi' ), '$1ix' ],
    [ new RegExp( '^feet$'            , 'gi' ), 'foot' ],
    [ new RegExp( '^teeth$'           , 'gi' ), 'tooth' ],
    [ new RegExp( '^geese$'           , 'gi' ), 'goose' ],
    [ new RegExp( '(quiz)zes$'        , 'gi' ), '$1' ],
    [ new RegExp( 'ss$'               , 'gi' ), 'ss' ],
    [ new RegExp( 's$'                , 'gi' ), '' ]
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

  var inflector = {

  /**
   * A helper method that applies rules based replacement to a String.
   * @private
   * @function
   * @param {String} str String to modify and return based on the passed rules.
   * @param {Array: [RegExp, String]} rules Regexp to match paired with String to use for replacement
   * @param {Array: [String]} skip Strings to skip if they match
   * @param {String} override String to return as though this method succeeded (used to conform to APIs)
   * @returns {String} Return passed String modified by passed rules.
   * @example
   *
   *     this._apply_rules( 'cows', singular_rules ); // === 'cow'
   */
    _apply_rules : function ( str, rules, skip, override ){
      if( override ){
        str = override;
      }else{
        var ignore = ( inflector.indexOf( skip, str.toLowerCase()) > -1 );

        if( !ignore ){
          var i = 0;
          var j = rules.length;

          for( ; i < j; i++ ){
            if( str.match( rules[ i ][ 0 ])){
              if( rules[ i ][ 1 ] !== undefined ){
                str = str.replace( rules[ i ][ 0 ], rules[ i ][ 1 ]);
              }
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
   * @param {Number} from_index Starts checking from this position in the Array.(optional)
   * @param {Function} compare_func Function used to compare Array item vs passed item.(optional)
   * @returns {Number} Return index position in the Array of the passed item.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.indexOf([ 'hi','there' ], 'guys' ); // === -1
   *     inflection.indexOf([ 'hi','there' ], 'hi' ); // === 0
   */
    indexOf : function ( arr, item, from_index, compare_func ){
      if( !from_index ){
        from_index = -1;
      }

      var index = -1;
      var i     = from_index;
      var j     = arr.length;

      for( ; i < j; i++ ){
        if( arr[ i ]  === item || compare_func && compare_func( arr[ i ], item )){
          index = i;
          break;
        }
      }

      return index;
    },



  /**
   * This function adds pluralization support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @param {String} plural Overrides normal output with said String.(optional)
   * @returns {String} Singular English language nouns are returned in plural form.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.pluralize( 'person' ); // === 'people'
   *     inflection.pluralize( 'octopus' ); // === 'octopi'
   *     inflection.pluralize( 'Hat' ); // === 'Hats'
   *     inflection.pluralize( 'person', 'guys' ); // === 'guys'
   */
    pluralize : function ( str, plural ){

			if(str) {
				return inflector._apply_rules(str, plural_rules, uncountable_words, plural);
			} else {
				return str;
			}
    },



  /**
   * This function adds singularization support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @param {String} singular Overrides normal output with said String.(optional)
   * @returns {String} Plural English language nouns are returned in singular form.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.singularize( 'people' ); // === 'person'
   *     inflection.singularize( 'octopi' ); // === 'octopus'
   *     inflection.singularize( 'Hats' ); // === 'Hat'
   *     inflection.singularize( 'guys', 'person' ); // === 'person'
   */
    singularize : function ( str, singular ){

			if(str) {
      	return inflector._apply_rules( str, singular_rules, uncountable_words, singular );
			} else {
				return str;
			}
    },


  /**
   * This function will pluralize or singularlize a String appropriately based on an integer value
   * @public
   * @function
   * @param {String} str The subject string.
   * @param {Number} count The number to base pluralization off of.
   * @param {String} singular Overrides normal output with said String.(optional)
   * @param {String} plural Overrides normal output with said String.(optional)
   * @returns {String} English language nouns are returned in the plural or singular form based on the count.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.inflect( 'people' 1 ); // === 'person'
   *     inflection.inflect( 'octopi' 1 ); // === 'octopus'
   *     inflection.inflect( 'Hats' 1 ); // === 'Hat'
   *     inflection.inflect( 'guys', 1 , 'person' ); // === 'person'
   *     inflection.inflect( 'person', 2 ); // === 'people'
   *     inflection.inflect( 'octopus', 2 ); // === 'octopi'
   *     inflection.inflect( 'Hat', 2 ); // === 'Hats'
   *     inflection.inflect( 'person', 2, null, 'guys' ); // === 'guys'
   */
    inflect : function ( str, count, singular, plural ){

			if(str) {
				count = parseInt(count, 10);

				if (isNaN(count)) return str;

				if (count === 0 || count > 1) {
					return inflector._apply_rules(str, plural_rules, uncountable_words, plural);
				} else {
					return inflector._apply_rules(str, singular_rules, uncountable_words, singular);
				}
			} else {
				return str;
			}
    },



  /**
   * This function adds camelization support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @param {Boolean} low_first_letter Default is to capitalize the first letter of the results.(optional)
   *                                 Passing true will lowercase it.
   * @returns {String} Lower case underscored words will be returned in camel case.
   *                  additionally '/' is translated to '::'
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.camelize( 'message_properties' ); // === 'MessageProperties'
   *     inflection.camelize( 'message_properties', true ); // === 'messageProperties'
   */
    camelize : function ( str, low_first_letter ){

			if(str) {
				var str_path = str.split('/');
				var i = 0;
				var j = str_path.length;
				var str_arr, init_x, k, l, first;

				for (; i < j; i++) {
					str_arr = str_path[ i ].split('_');
					k = 0;
					l = str_arr.length;

					for (; k < l; k++) {
						if (k !== 0) {
							str_arr[ k ] = str_arr[ k ].toLowerCase();
						}

						first = str_arr[ k ].charAt(0);
						first = low_first_letter && i === 0 && k === 0
								? first.toLowerCase() : first.toUpperCase();
						str_arr[ k ] = first + str_arr[ k ].substring(1);
					}

					str_path[ i ] = str_arr.join('');
				}

				return str_path.join('::');
			} else {
				return str;
			}
    },



  /**
   * This function adds underscore support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @param {Boolean} all_upper_case Default is to lowercase and add underscore prefix.(optional)
   *                  Passing true will return as entered.
   * @returns {String} Camel cased words are returned as lower cased and underscored.
   *                  additionally '::' is translated to '/'.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.underscore( 'MessageProperties' ); // === 'message_properties'
   *     inflection.underscore( 'messageProperties' ); // === 'message_properties'
   *     inflection.underscore( 'MP', true ); // === 'MP'
   */
    underscore : function ( str, all_upper_case ){

			if(str) {
				if (all_upper_case && str === str.toUpperCase()) return str;

				var str_path = str.split('::');
				var i = 0;
				var j = str_path.length;

				for (; i < j; i++) {
					str_path[ i ] = str_path[ i ].replace(uppercase, '_$1');
					str_path[ i ] = str_path[ i ].replace(underbar_prefix, '');
				}

				return str_path.join('/').toLowerCase();
			} else {
				return str;
			}
    },



  /**
   * This function adds humanize support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @param {Boolean} low_first_letter Default is to capitalize the first letter of the results.(optional)
   *                                 Passing true will lowercase it.
   * @returns {String} Lower case underscored words will be returned in humanized form.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.humanize( 'message_properties' ); // === 'Message properties'
   *     inflection.humanize( 'message_properties', true ); // === 'message properties'
   */
    humanize : function ( str, low_first_letter ){

			if(str) {
				str = str.toLowerCase();
				str = str.replace(id_suffix, '');
				str = str.replace(underbar, ' ');

				if (!low_first_letter) {
					str = inflector.capitalize(str);
				}

				return str;
			} else {
				return str;
			}
    },



  /**
   * This function adds capitalization support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @returns {String} All characters will be lower case and the first will be upper.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.capitalize( 'message_properties' ); // === 'Message_properties'
   *     inflection.capitalize( 'message properties', true ); // === 'Message properties'
   */
    capitalize : function ( str ){

			if(str) {
				str = str.toLowerCase();

				return str.substring(0, 1).toUpperCase() + str.substring(1);
			} else {
				return str;
			}
    },



  /**
   * This function adds dasherization support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @returns {String} Replaces all spaces or underbars with dashes.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.dasherize( 'message_properties' ); // === 'message-properties'
   *     inflection.dasherize( 'Message Properties' ); // === 'Message-Properties'
   */
    dasherize : function ( str ){

			if(str) {
				return str.replace(space_or_underbar, '-');
			} else {
				return str;
			}
    },



  /**
   * This function adds titleize support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @returns {String} Capitalizes words as you would for a book title.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.titleize( 'message_properties' ); // === 'Message Properties'
   *     inflection.titleize( 'message properties to keep' ); // === 'Message Properties to Keep'
   */
    titleize : function ( str ){

			if(str) {
				str = str.toLowerCase().replace(underbar, ' ');
				var str_arr = str.split(' ');
				var i = 0;
				var j = str_arr.length;
				var d, k, l;

				for (; i < j; i++) {
					d = str_arr[ i ].split('-');
					k = 0;
					l = d.length;

					for (; k < l; k++) {
						if (inflector.indexOf(non_titlecased_words, d[ k ].toLowerCase()) < 0) {
							d[ k ] = inflector.capitalize(d[ k ]);
						}
					}

					str_arr[ i ] = d.join('-');
				}

				str = str_arr.join(' ');
				str = str.substring(0, 1).toUpperCase() + str.substring(1);

				return str;
			} else {
				return str;
			}
    },



  /**
   * This function adds demodulize support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @returns {String} Removes module names leaving only class names.(Ruby style)
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.demodulize( 'Message::Bus::Properties' ); // === 'Properties'
   */
    demodulize : function ( str ){

			if(str) {
				var str_arr = str.split('::');

				return str_arr[ str_arr.length - 1 ];
			} else {
				return str;
			}
    },



  /**
   * This function adds tableize support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @returns {String} Return camel cased words into their underscored plural form.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.tableize( 'MessageBusProperty' ); // === 'message_bus_properties'
   */
    tableize : function ( str ){

			if(str) {
				str = inflector.underscore(str);
				str = inflector.pluralize(str);

				return str;
			} else {
				return str;
			}
    },



  /**
   * This function adds classification support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @returns {String} Underscored plural nouns become the camel cased singular form.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.classify( 'message_bus_properties' ); // === 'MessageBusProperty'
   */
    classify : function ( str ){

			if(str) {
				str = inflector.camelize(str);
				str = inflector.singularize(str);

				return str;
			} else {
				return str;
			}
    },



  /**
   * This function adds foreign key support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @param {Boolean} drop_id_ubar Default is to seperate id with an underbar at the end of the class name,
                                 you can pass true to skip it.(optional)
   * @returns {String} Underscored plural nouns become the camel cased singular form.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.foreign_key( 'MessageBusProperty' ); // === 'message_bus_property_id'
   *     inflection.foreign_key( 'MessageBusProperty', true ); // === 'message_bus_propertyid'
   */
    foreign_key : function ( str, drop_id_ubar ){

			if(str) {
				str = inflector.demodulize(str);
				str = inflector.underscore(str) + (( drop_id_ubar ) ? ( '' ) : ( '_' )) + 'id';

				return str;
			}
    },



  /**
   * This function adds ordinalize support to every String object.
   * @public
   * @function
   * @param {String} str The subject string.
   * @returns {String} Return all found numbers their sequence like '22nd'.
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.ordinalize( 'the 1 pitch' ); // === 'the 1st pitch'
   */
    ordinalize : function ( str ){

			if(str) {
				var str_arr = str.split(' ');
				var i = 0;
				var j = str_arr.length;

				for (; i < j; i++) {
					var k = parseInt(str_arr[ i ], 10);

					if (!isNaN(k)) {
						var ltd = str_arr[ i ].substring(str_arr[ i ].length - 2);
						var ld = str_arr[ i ].substring(str_arr[ i ].length - 1);
						var suf = 'th';

						if (ltd != '11' && ltd != '12' && ltd != '13') {
							if (ld === '1') {
								suf = 'st';
							} else if (ld === '2') {
								suf = 'nd';
							} else if (ld === '3') {
								suf = 'rd';
							}
						}

						str_arr[ i ] += suf;
					}
				}

				return str_arr.join(' ');
			} else {
				return str;
			}
    },

  /**
   * This function performs multiple inflection methods on a string
   * @public
   * @function
   * @param {String} str The subject string.
   * @param {Array} arr An array of inflection methods.
   * @returns {String}
   * @example
   *
   *     var inflection = require( 'inflection' );
   *
   *     inflection.transform( 'all job', [ 'pluralize', 'capitalize', 'dasherize' ]); // === 'All-jobs'
   */
    transform : function ( str, arr ){

			if(str) {
				var i = 0;
				var j = arr.length;

				for (; i < j; i++) {
					var method = arr[ i ];

					if (this.hasOwnProperty(method)) {
						str = this[ method ](str);
					}
				}

				return str;
			} else {
				return str;
			}
    }
  };

/**
 * @public
 */
  inflector.version = '1.5.1';

  return inflector;
}));
