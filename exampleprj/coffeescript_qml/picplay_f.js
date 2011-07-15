.pragma library

var jsexports = {};


(function() {
  var pics, sayhello;
  pics = function() {
    return ["a.jpg", "b.jpg"];
  };
  sayhello = function() {
    console.log("Test");
    return console.log("Hello world");
  };
  jsexports.sayhello = sayhello;
  jsexports.pics = pics;
}).call(this);
(function() {
  var foo;
  foo = function() {
    return console.log("Another func");
  };
}).call(this);
