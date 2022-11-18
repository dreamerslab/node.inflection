import * as inflection from "../src/inflection";
import { describe, it, expect } from "vitest";

describe("test .pluralize", function () {
  it("should pluralize the given word", function () {
    expect(inflection.pluralize("people")).toEqual("people");
    expect(inflection.pluralize("men")).toEqual("men");
    expect(inflection.pluralize("women")).toEqual("women");
    expect(inflection.pluralize("woman")).toEqual("women");
    expect(inflection.pluralize("person")).toEqual("people");
    expect(inflection.pluralize("octopus")).toEqual("octopuses");
    expect(inflection.pluralize("human")).toEqual("humans");
    expect(inflection.pluralize("aircraft")).toEqual("aircraft");
    expect(inflection.pluralize("luck")).toEqual("luck");
    expect(inflection.pluralize("Hat")).toEqual("Hats");
    expect(inflection.pluralize("life")).toEqual("lives");
    expect(inflection.pluralize("bath")).toEqual("baths");
    expect(inflection.pluralize("calf")).toEqual("calves");
    expect(inflection.pluralize("foot")).toEqual("feet");
    expect(inflection.pluralize("book")).toEqual("books");
    expect(inflection.pluralize("goose")).toEqual("geese");
    expect(inflection.pluralize("tooth")).toEqual("teeth");
    expect(inflection.pluralize("teeth")).toEqual("teeth");
    expect(inflection.pluralize("knife")).toEqual("knives");
    expect(inflection.pluralize("half")).toEqual("halves");
    expect(inflection.pluralize("cave")).toEqual("caves");
    expect(inflection.pluralize("save")).toEqual("saves");
    expect(inflection.pluralize("street")).toEqual("streets");
    expect(inflection.pluralize("streets")).toEqual("streets");
    expect(inflection.pluralize("data")).toEqual("data");
    expect(inflection.pluralize("meta")).toEqual("meta");
    expect(inflection.pluralize("summons")).toEqual("summonses");
    expect(inflection.pluralize("whereas")).toEqual("whereases");
    expect(inflection.pluralize("person", "guys")).toEqual("guys");
    expect(inflection.pluralize("index")).toEqual("indices");
    expect(inflection.pluralize("matrix")).toEqual("matrices");
    expect(inflection.pluralize("vertex")).toEqual("vertices");
    expect(inflection.pluralize("canvas")).toEqual("canvases");
    expect(inflection.pluralize("campus")).toEqual("campuses");
    expect(inflection.pluralize("campuses")).toEqual("campuses");
    expect(inflection.pluralize("criterion")).toEqual("criteria");
    expect(inflection.pluralize("criteria")).toEqual("criteria");
    expect(inflection.pluralize("genus")).toEqual("genera");
    expect(inflection.pluralize("genera")).toEqual("genera");
    expect(inflection.pluralize("bonus")).toEqual("bonuses");
    expect(inflection.pluralize("grammar")).toEqual("grammars");
    expect(inflection.pluralize("drive")).toEqual("drives");
    expect(inflection.pluralize("database")).toEqual("databases");
  });
});

describe("test .singularize", function () {
  it("should singularize the given word", function () {
    expect(inflection.singularize("status")).toEqual("status");
    expect(inflection.singularize("child")).toEqual("child");
    expect(inflection.singularize("children")).toEqual("child");
    expect(inflection.singularize("address")).toEqual("address");
    expect(inflection.singularize("man")).toEqual("man");
    expect(inflection.singularize("woman")).toEqual("woman");
    expect(inflection.singularize("women")).toEqual("woman");
    expect(inflection.singularize("person")).toEqual("person");
    expect(inflection.singularize("people")).toEqual("person");
    expect(inflection.singularize("movies")).toEqual("movie");
    expect(inflection.singularize("queries")).toEqual("query");
    expect(inflection.singularize("octopuses")).toEqual("octopus");
    expect(inflection.singularize("Hats")).toEqual("Hat");
    expect(inflection.singularize("lives")).toEqual("life");
    expect(inflection.singularize("baths")).toEqual("bath");
    expect(inflection.singularize("calves")).toEqual("calf");
    expect(inflection.singularize("feet")).toEqual("foot");
    expect(inflection.singularize("books")).toEqual("book");
    expect(inflection.singularize("geese")).toEqual("goose");
    expect(inflection.singularize("teeth")).toEqual("tooth");
    expect(inflection.singularize("tooth")).toEqual("tooth");
    expect(inflection.singularize("knives")).toEqual("knife");
    expect(inflection.singularize("halves")).toEqual("half");
    expect(inflection.singularize("caves")).toEqual("cave");
    expect(inflection.singularize("saves")).toEqual("save");
    expect(inflection.singularize("street")).toEqual("street");
    expect(inflection.singularize("streets")).toEqual("street");
    expect(inflection.singularize("data")).toEqual("datum");
    expect(inflection.singularize("meta")).toEqual("metum");
    expect(inflection.singularize("whereases")).toEqual("whereas");
    expect(inflection.singularize("guys", "person")).toEqual("person");
    expect(inflection.singularize("matrices")).toEqual("matrix");
    expect(inflection.singularize("vertices")).toEqual("vertex");
    expect(inflection.singularize("canvases")).toEqual("canvas");
    expect(inflection.singularize("campuses")).toEqual("campus");
    expect(inflection.singularize("campus")).toEqual("campus");
    expect(inflection.singularize("criteria")).toEqual("criterion");
    expect(inflection.singularize("criterion")).toEqual("criterion");
    expect(inflection.singularize("genera")).toEqual("genus");
    expect(inflection.singularize("genus")).toEqual("genus");
    expect(inflection.singularize("minus")).toEqual("minus");
    expect(inflection.singularize("bonuses")).toEqual("bonus");
    expect(inflection.singularize("grammars")).toEqual("grammar");
    expect(inflection.singularize("drives")).toEqual("drive");
    expect(inflection.singularize("databases")).toEqual("database");
  });
});

describe("test .inflect", function () {
  it("should correctly inflect the given word based on an integer", function () {
    // zero should use plural state
    expect(inflection.inflect("people", 0)).toEqual("people");
    expect(inflection.inflect("men", 0)).toEqual("men");
    expect(inflection.inflect("person", 0)).toEqual("people");
    expect(inflection.inflect("octopus", 0)).toEqual("octopuses");
    expect(inflection.inflect("Hat", 0)).toEqual("Hats");
    expect(inflection.inflect("data", 0)).toEqual("data");
    expect(inflection.inflect("meta", 0)).toEqual("meta");
    expect(inflection.inflect("person", 0, "guy", "guys")).toEqual("guys");
    expect(inflection.inflect("drive", 0)).toEqual("drives");
    // greater than 1 should use plural state
    expect(inflection.inflect("people", 2)).toEqual("people");
    expect(inflection.inflect("men", 2)).toEqual("men");
    expect(inflection.inflect("person", 2)).toEqual("people");
    expect(inflection.inflect("octopus", 2)).toEqual("octopuses");
    expect(inflection.inflect("Hat", 2)).toEqual("Hats");
    expect(inflection.inflect("data", 2)).toEqual("data");
    expect(inflection.inflect("meta", 2)).toEqual("meta");
    expect(inflection.inflect("person", 2, "guy", "guys")).toEqual("guys");
    expect(inflection.inflect("drive", 2)).toEqual("drives");
    // 1 should use singular state
    expect(inflection.inflect("status", 1)).toEqual("status");
    expect(inflection.inflect("child", 1)).toEqual("child");
    expect(inflection.inflect("children", 1)).toEqual("child");
    expect(inflection.inflect("address", 1)).toEqual("address");
    expect(inflection.inflect("person", 1)).toEqual("person");
    expect(inflection.inflect("people", 1)).toEqual("person");
    expect(inflection.inflect("movies", 1)).toEqual("movie");
    expect(inflection.inflect("queries", 1)).toEqual("query");
    expect(inflection.inflect("octopuses", 1)).toEqual("octopus");
    expect(inflection.inflect("Hats", 1)).toEqual("Hat");
    expect(inflection.inflect("data", 1)).toEqual("datum");
    expect(inflection.inflect("meta", 1)).toEqual("metum");
    expect(inflection.inflect("guys", 1, "person", "people")).toEqual("person");
    // not a number should return original value
    expect(inflection.inflect("drive", 1)).toEqual("drive");
    expect(inflection.inflect("drives", 1)).toEqual("drive");
    // decimal numbers should use plural state
    expect(inflection.inflect("inches", 1.5)).toEqual("inches");
    expect(inflection.inflect("inches", 1.0)).toEqual("inch");
  });
});

describe("test .camelize", function () {
  it("should camelize the given word", function () {
    expect(inflection.camelize("message_properties")).toEqual(
      "MessageProperties"
    );
    expect(inflection.camelize("message_properties", true)).toEqual(
      "messageProperties"
    );
    expect(inflection.camelize("Message_Properties")).toEqual(
      "MessageProperties"
    );
    expect(inflection.camelize("Message_Properties", true)).toEqual(
      "messageProperties"
    );
    expect(inflection.camelize("MESSAGE_PROPERTIES")).toEqual(
      "MESSAGEProperties"
    );
    expect(inflection.camelize("MESSAGE_PROPERTIES", true)).toEqual(
      "mESSAGEProperties"
    );
    expect(inflection.camelize("fooBar_Baz", true)).toEqual("fooBarBaz");
    expect(inflection.camelize("FooBar_Baz", true)).toEqual("fooBarBaz");
    expect(inflection.camelize("fooBar_fooBaz", true)).toEqual("fooBarFoobaz");
    expect(inflection.camelize("FooBar_FooBaz", true)).toEqual("fooBarFoobaz");
    expect(inflection.camelize("FooBar")).toEqual("FooBar");
    expect(inflection.camelize("FooBar", true)).toEqual("fooBar");
    expect(inflection.camelize("Foo/Bar", true)).toEqual("foo::Bar");
    expect(inflection.camelize("Foo/Bar")).toEqual("Foo::Bar");
  });
});

describe("test .underscore", function () {
  it("should transform the given word with underscore", function () {
    expect(inflection.underscore("MessageProperties")).toEqual(
      "message_properties"
    );
    expect(inflection.underscore("messageProperties")).toEqual(
      "message_properties"
    );
    expect(inflection.underscore("MP")).toEqual("m_p");
    expect(inflection.underscore("MP", true)).toEqual("MP");
  });
});

describe("test .humanize", function () {
  it("should humanize the given word", function () {
    expect(inflection.humanize("message_properties")).toEqual(
      "Message properties"
    );
    expect(inflection.humanize("message_properties", true)).toEqual(
      "message properties"
    );
  });
});

describe("test .capitalize", function () {
  it("should capitalize the given word", function () {
    expect(inflection.capitalize("message_properties")).toEqual(
      "Message_properties"
    );
    expect(inflection.capitalize("message properties")).toEqual(
      "Message properties"
    );
  });
});

describe("test .dasherize", function () {
  it("should dasherize the given word", function () {
    expect(inflection.dasherize("message_properties")).toEqual(
      "message-properties"
    );
    expect(inflection.dasherize("Message Properties")).toEqual(
      "Message-Properties"
    );
  });
});

describe("test .titleize", function () {
  it("should titleize the given word", function () {
    expect(inflection.titleize("message_properties")).toEqual(
      "Message Properties"
    );
    expect(inflection.titleize("message properties to keep")).toEqual(
      "Message Properties to Keep"
    );
  });
});

describe("test .demodulize", function () {
  it("should demodulize the given word", function () {
    expect(inflection.demodulize("Message::Bus::Properties")).toEqual(
      "Properties"
    );
  });
});

describe("test .tableize", function () {
  it("should tableize the given word", function () {
    expect(inflection.tableize("people")).toEqual("people");
    expect(inflection.tableize("MessageBusProperty")).toEqual(
      "message_bus_properties"
    );
  });
});

describe("test .classify", function () {
  it("should classify the given word", function () {
    expect(inflection.classify("message_bus_properties")).toEqual(
      "MessageBusProperty"
    );
  });
});

describe("test .foreignKey", function () {
  it("should transform the given word to foreignKey", function () {
    expect(inflection.foreignKey("MessageBusProperty")).toEqual(
      "message_bus_property_id"
    );
    expect(inflection.foreignKey("MessageBusProperty", true)).toEqual(
      "message_bus_propertyid"
    );
  });
});

describe("test .ordinalize", function () {
  it("should ordinalize the given word", function () {
    expect(inflection.ordinalize("the 1 pitch")).toEqual("the 1st pitch");
  });
});

describe("test .transform", function () {
  it("should transform the given word with given methods", function () {
    expect(inflection.transform("all job", ["pluralize", "dasherize"])).toEqual(
      "all-jobs"
    );
    expect(inflection.transform("all job", ["pluralize"])).toEqual("all jobs");
    expect(
      inflection.transform("all job", ["capitalize", "pluralize", "dasherize"])
    ).toEqual("All-jobs");
  });
});
