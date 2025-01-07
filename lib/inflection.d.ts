/*!
 * inflection
 * Copyright(c) 2011 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * A port of inflection-js to node.js module.
 */
/**
 * This function adds pluralization support to every String object.
 * @param str The subject string.
 * @param plural Overrides normal output with said String.(optional)
 * @returns Singular English language nouns are returned in plural form.
 * @example
 *
 *     const inflection = require( 'inflection' );
 *
 *     inflection.pluralize( 'person' ); // === 'people'
 *     inflection.pluralize( 'octopus' ); // === 'octopuses'
 *     inflection.pluralize( 'Hat' ); // === 'Hats'
 *     inflection.pluralize( 'person', 'guys' ); // === 'guys'
 */
export declare function pluralize(str: string, plural?: string): string;
/**
 * This function adds singularization support to every String object.
 * @param str The subject string.
 * @param singular Overrides normal output with said String.(optional)
 * @returns Plural English language nouns are returned in singular form.
 * @example
 *
 *     const inflection = require( 'inflection' );
 *
 *     inflection.singularize( 'people' ); // === 'person'
 *     inflection.singularize( 'octopuses' ); // === 'octopus'
 *     inflection.singularize( 'Hats' ); // === 'Hat'
 *     inflection.singularize( 'guys', 'person' ); // === 'person'
 */
export declare function singularize(str: string, singular?: string): string;
/**
 * This function will pluralize or singularlize a String appropriately based on a number value
 * @param str The subject string.
 * @param count The number to base pluralization off of.
 * @param singular Overrides normal output with said String.(optional)
 * @param plural Overrides normal output with said String.(optional)
 * @returns English language nouns are returned in the plural or singular form based on the count.
 * @example
 *
 *     const inflection = require( 'inflection' );
 *
 *     inflection.inflect( 'people' 1 ); // === 'person'
 *     inflection.inflect( 'octopuses' 1 ); // === 'octopus'
 *     inflection.inflect( 'Hats' 1 ); // === 'Hat'
 *     inflection.inflect( 'guys', 1 , 'person' ); // === 'person'
 *     inflection.inflect( 'inches', 1.5 ); // === 'inches'
 *     inflection.inflect( 'person', 2 ); // === 'people'
 *     inflection.inflect( 'octopus', 2 ); // === 'octopuses'
 *     inflection.inflect( 'Hat', 2 ); // === 'Hats'
 *     inflection.inflect( 'person', 2, null, 'guys' ); // === 'guys'
 */
export declare function inflect(str: string, count: number, singular?: string, plural?: string): string;
/**
 * This function adds camelization support to every String object.
 * @param str The subject string.
 * @param lowFirstLetter Default is to capitalize the first letter of the results.(optional)
 *                                 Passing true will lowercase it.
 * @returns Lower case underscored words will be returned in camel case.
 *                  additionally '/' is translated to '::'
 * @example
 *
 *     const inflection = require( 'inflection' );
 *
 *     inflection.camelize( 'message_properties' ); // === 'MessageProperties'
 *     inflection.camelize( 'message_properties', true ); // === 'messageProperties'
 */
export declare function camelize(str: string, lowFirstLetter?: boolean): string;
/**
 * This function adds underscore support to every String object.
 * @param str The subject string.
 * @param allUpperCase Default is to lowercase and add underscore prefix.(optional)
 *                  Passing true will return as entered.
 * @returns Camel cased words are returned as lower cased and underscored.
 *                  additionally '::' is translated to '/'.
 * @example
 *
 *     const inflection = require( 'inflection' );
 *
 *     inflection.underscore( 'MessageProperties' ); // === 'message_properties'
 *     inflection.underscore( 'messageProperties' ); // === 'message_properties'
 *     inflection.underscore( 'MP', true ); // === 'MP'
 */
export declare function underscore(str: string, allUpperCase?: boolean): string;
/**
 * This function adds humanize support to every String object.
 * @param str The subject string.
 * @param lowFirstLetter Default is to capitalize the first letter of the results.(optional)
 *                                 Passing true will lowercase it.
 * @returns Lower case underscored words will be returned in humanized form.
 * @example
 *
 *     const inflection = require( 'inflection' );
 *
 *     inflection.humanize( 'message_properties' ); // === 'Message properties'
 *     inflection.humanize( 'message_properties', true ); // === 'message properties'
 */
export declare function humanize(str: string, lowFirstLetter?: boolean): string;
/**
 * This function adds capitalization support to every String object.
 * @param str The subject string.
 * @returns All characters will be lower case and the first will be upper.
 * @example
 *
 *     const inflection = require( 'inflection' );
 *
 *     inflection.capitalize( 'message_properties' ); // === 'Message_properties'
 *     inflection.capitalize( 'message properties', true ); // === 'Message properties'
 */
export declare function capitalize(str: string): string;
/**
 * This function replaces underscores with dashes in the string.
 * @param str The subject string.
 * @returns Replaces all spaces or underscores with dashes.
 * @example
 *
 *     const inflection = require( 'inflection' );
 *
 *     inflection.dasherize( 'message_properties' ); // === 'message-properties'
 *     inflection.dasherize( 'Message Properties' ); // === 'Message-Properties'
 */
export declare function dasherize(str: string): string;
/**
 * This function adds titleize support to every String object.
 * @param str The subject string.
 * @returns Capitalizes words as you would for a book title.
 * @example
 *
 *     const inflection = require( 'inflection' );
 *
 *     inflection.titleize( 'message_properties' ); // === 'Message Properties'
 *     inflection.titleize( 'message properties to keep' ); // === 'Message Properties to Keep'
 */
export declare function titleize(str: string): string;
/**
 * This function adds demodulize support to every String object.
 * @param str The subject string.
 * @returns Removes module names leaving only class names.(Ruby style)
 * @example
 *
 *     const inflection = require( 'inflection' );
 *
 *     inflection.demodulize( 'Message::Bus::Properties' ); // === 'Properties'
 */
export declare function demodulize(str: string): string;
/**
 * This function adds tableize support to every String object.
 * @param str The subject string.
 * @returns Return camel cased words into their underscored plural form.
 * @example
 *
 *     const inflection = require( 'inflection' );
 *
 *     inflection.tableize( 'MessageBusProperty' ); // === 'message_bus_properties'
 */
export declare function tableize(str: string): string;
/**
 * This function adds classification support to every String object.
 * @param str The subject string.
 * @returns Underscored plural nouns become the camel cased singular form.
 * @example
 *
 *     const inflection = require( 'inflection' );
 *
 *     inflection.classify( 'message_bus_properties' ); // === 'MessageBusProperty'
 */
export declare function classify(str: string): string;
/**
   * This function adds foreign key support to every String object.
   * @param str The subject string.
   * @param dropIdUbar Default is to seperate id with an underbar at the end of the class name,
                                 you can pass true to skip it.(optional)
   * @returns Underscored plural nouns become the camel cased singular form.
   * @example
   *
   *     const inflection = require( 'inflection' );
   *
   *     inflection.foreign_key( 'MessageBusProperty' ); // === 'message_bus_property_id'
   *     inflection.foreign_key( 'MessageBusProperty', true ); // === 'message_bus_propertyid'
   */
export declare function foreignKey(str: string, dropIdUbar?: boolean): string;
/**
 * This function adds ordinalize support to every String object.
 * @param str The subject string.
 * @returns Return all found numbers their sequence like '22nd'.
 * @example
 *
 *     const inflection = require( 'inflection' );
 *
 *     inflection.ordinalize( 'the 1 pitch' ); // === 'the 1st pitch'
 */
export declare function ordinalize(str: string): string;
declare const transformFunctions: {
    readonly pluralize: typeof pluralize;
    readonly singularize: typeof singularize;
    readonly camelize: typeof camelize;
    readonly underscore: typeof underscore;
    readonly humanize: typeof humanize;
    readonly capitalize: typeof capitalize;
    readonly dasherize: typeof dasherize;
    readonly titleize: typeof titleize;
    readonly demodulize: typeof demodulize;
    readonly tableize: typeof tableize;
    readonly classify: typeof classify;
    readonly foreignKey: typeof foreignKey;
    readonly ordinalize: typeof ordinalize;
};
/**
 * This function performs multiple inflection methods on a string
 * @param str The subject string.
 * @param arr An array of inflection methods.
 * @returns
 * @example
 *
 *     const inflection = require( 'inflection' );
 *
 *     inflection.transform( 'all job', [ 'pluralize', 'capitalize', 'dasherize' ]); // === 'All-jobs'
 */
export declare function transform(str: string, arr: (keyof typeof transformFunctions)[]): string;
export {};
