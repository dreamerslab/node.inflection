# inflection

A package to transform english strings into other forms like the plural form, singular form, camelCase form, etc.

<a href="https://www.npmjs.com/package/inflection"><img src="https://img.shields.io/npm/v/inflection" alt="NPM Version" /></a>

## Description

This package was originally a port of [inflection-js](http://code.google.com/p/inflection-js/), which is a port of the functionality from Ruby on Rails' Active Support Inflection classes into Javascript.

Note: This library uses [Wiktionary](http://en.wiktionary.org) as its reference.

## Requires

Checkout `package.json` for dependencies.

## Angular Support

Checkout [ngInflection](https://github.com/konsumer/ngInflection) from [konsumer](https://github.com/konsumer)

## Meteor Support

Checkout [Meteor Inflector](https://github.com/katrotz/meteor-inflector) from [Veaceslav Cotruta](https://github.com/katrotz)

## Installation

Install inflection through npm
```bash
npm install inflection
```
## API

- [pluralize(str, plural)](#pluralizestr-plural)
- [singularize(str, singular)](#singularizestr-singular)
- [inflect(str, count, singular, plural)](#inflectstr-count-singular-plural)
- [camelize(str, low_first_letter)](#camelizestr-low_first_letter)
- [underscore(str, all_upper_case)](#underscorestr-all_upper_case)
- [humanize(str, low_first_letter)](#humanizestr-low_first_letter)
- [capitalize(str)](#capitalizestr)
- [dasherize(str)](#dasherizestr)
- [titleize(str)](#titleizestr)
- [demodulize(str)](#demodulizestr)
- [tableize(str)](#tableizestr)
- [classify(str)](#classifystr)
- [foreign_key(str, drop_id_ubar)](#foreign_keystr-drop_id_ubar)
- [ordinalize(str)](#ordinalizestr)
- [transform(str, arr)](#transformstr-arr)

## Usage

> Require the module before using

```js
const inflection = require('inflection');
```

### pluralize(str, plural)

This function adds pluralization support to every String object.

#### Arguments

> str

    type: String
    desc: The subject string.

> plural

    type: String
    desc: Overrides normal output with said String.(optional)

#### Example code
```js
var inflection = require('inflection');

pluralize('person'); // === 'people'
pluralize('octopus'); // === "octopi"
pluralize('Hat'); // === 'Hats'
pluralize('person', 'guys'); // === 'guys'
```

### singularize(str, singular)

This function adds singularization support to every String object.

#### Arguments

> str

    type: String
    desc: The subject string.

> singular

    type: String
    desc: Overrides normal output with said String.(optional)

#### Example code
```js
var inflection = require('inflection');

singularize('people'); // === 'person'
singularize('octopi'); // === "octopus"
singularize('Hats'); // === 'Hat'
singularize('guys', 'person'); // === 'person'
```

### inflect(str, count, singular, plural)

This function will pluralize or singularlize a String appropriately based on an integer value.

#### Arguments

> str

    type: String
    desc: The subject string.

> count

    type: Number
    desc: The number to base pluralization off of.

> singular

    type: String
    desc: Overrides normal output with said String.(optional)

> plural

    type: String
    desc: Overrides normal output with said String.(optional)

#### Example code
```js
var inflection = require('inflection');

inflect('people', 1); // === 'person'
inflect('octopi', 1); // === 'octopus'
inflect('Hats', 1); // === 'Hat'
inflect('guys', 1 , 'person'); // === 'person'
inflect('person', 2); // === 'people'
inflect('octopus', 2); // === 'octopi'
inflect('Hat', 2); // === 'Hats'
inflect('person', 2, null, 'guys'); // === 'guys'
```

### camelize(str, low_first_letter)

This function transforms String object from underscore to camelcase.

#### Arguments

> str

    type: String
    desc: The subject string.

> low_first_letter

    type: Boolean
    desc: Default is to capitalize the first letter of the results. Passing true will lowercase it. (optional)

#### Example code
```js
var inflection = require('inflection');

camelize('message_properties'); // === 'MessageProperties'
camelize('message_properties', true); // === 'messageProperties'
```

### underscore(str, all_upper_case)

This function transforms String object from camelcase to underscore.

#### Arguments

> str

    type: String
    desc: The subject string.

> all_upper_case

    type: Boolean
    desc: Default is to lowercase and add underscore prefix

#### Example code
```js
var inflection = require('inflection');

underscore('MessageProperties'); // === 'message_properties'
underscore('messageProperties'); // === 'message_properties'
underscore('MP'); // === 'm_p'
underscore('MP', true); // === 'MP'
```

### humanize(str, low_first_letter)

This function adds humanize support to every String object.

#### Arguments

> str

    type: String
    desc: The subject string.

> low_first_letter

    type: Boolean
    desc: Default is to capitalize the first letter of the results. Passing true will lowercase it. (optional)

#### Example code
```js
var inflection = require('inflection');

humanize('message_properties'); // === 'Message properties'
humanize('message_properties', true); // === 'message properties'
```

### capitalize(str)

This function adds capitalization support to every String object.

#### Arguments

> str

    type: String
    desc: The subject string.

#### Example code
```js
var inflection = require('inflection');

capitalize('message_properties'); // === 'Message_properties'
capitalize('message properties', true); // === 'Message properties'
```

### dasherize(str)

This function replaces underscores with dashes in the string.

#### Arguments

> str

    type: String
    desc: The subject string.

#### Example code
```js
var inflection = require('inflection');

dasherize('message_properties'); // === 'message-properties'
dasherize('Message Properties'); // === 'Message-Properties'
```

### titleize(str)

This function adds titleize support to every String object.

#### Arguments

> str

    type: String
    desc: The subject string.

#### Example code
```js
var inflection = require('inflection');

titleize('message_properties'); // === 'Message Properties'
titleize('message properties to keep'); // === 'Message Properties to Keep'
```

### demodulize(str)

This function adds demodulize support to every String object.

#### Arguments

> str

    type: String
    desc: The subject string.

#### Example code
```js
var inflection = require('inflection');

demodulize('Message::Bus::Properties'); // === 'Properties'
```

### tableize(str)

This function adds tableize support to every String object.

#### Arguments

> str

    type: String
    desc: The subject string.

#### Example code
```js
var inflection = require('inflection');

tableize('MessageBusProperty'); // === 'message_bus_properties'
```

### classify(str)

This function adds classification support to every String object.

#### Arguments

> str

    type: String
    desc: The subject string.

#### Example code
```js
var inflection = require('inflection');

classify('message_bus_properties'); // === 'MessageBusProperty'
```

### foreign_key(str, drop_id_ubar)

This function adds foreign key support to every String object.

#### Arguments

> str

    type: String
    desc: The subject string.

> low_first_letter

    type: Boolean
    desc: Default is to seperate id with an underbar at the end of the class name, you can pass true to skip it.(optional)

#### Example code
```js
var inflection = require('inflection');

foreign_key('MessageBusProperty'); // === 'message_bus_property_id'
foreign_key('MessageBusProperty', true); // === 'message_bus_propertyid'
```

### ordinalize(str)

This function adds ordinalize support to every String object.

#### Arguments

> str

    type: String
    desc: The subject string.

#### Example code
```js
var inflection = require('inflection');

ordinalize('the 1 pitch'); // === 'the 1st pitch'
```

### transform(str, arr)

This function performs multiple inflection methods on a string.

#### Arguments

> str

    type: String
    desc: The subject string.

> arr

    type: Array
    desc: An array of inflection methods.

#### Example code
```js
var inflection = require('inflection');

transform('all job', [ 'pluralize', 'capitalize', 'dasherize' ]); // === 'All-jobs'
```

## Credit

- Ryan Schuft <ryan.schuft@gmail.com>
- Lance Pollard <lancejpollard@gmail.com> (Browser support)
- Dane O'Connor <dane.oconnor@gmail.com>
- brandondewitt
- luk3thomas
- Marcel Klehr
- Raymond Feng
- Kane Cohen <kanecohen@gmail.com>
- Gianni Chiappetta <gianni@runlevel6.org>
- Eric Brody
- overlookmotel
- Patrick Mowrer
- Greger Olsson
- Jason Crawford <jason@jasoncrawford.org>
- Ray Myers <ray.myers@gmail.com>

## License

(The MIT License)

Copyright (c) 2011 dreamerslab &lt;ben@dreamerslab.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
