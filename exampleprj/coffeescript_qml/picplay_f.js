.pragma library

var jsexports = {};


(function() {
  var EasyXhr, TwitterSearch, lgg, pics, sayhello;
  lgg = console.log;
  EasyXhr = (function() {
    function EasyXhr(method, url, is_json) {
      this.method = method;
      this.url = url;
      this.is_json = is_json;
    }
    EasyXhr.prototype.go = function(donecallback, headerscallback) {
      var doc;
      doc = new XMLHttpRequest();
      doc.onreadystatechange = function() {
        var obj;
        lgg("stch");
        if (doc.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
          lgg("headers");
          lgg(doc.getAllResponseHeaders());
          headerscallback(doc);
        }
        if (doc.readyState === XMLHttpRequest.DONE) {
          lgg("DONE");
          lgg(doc.responseText);
          if (this.is_json) {
            obj = JSON.parse(doc.responseText);
          } else {
            obj = doc.responseText;
          }
          return donecallback(obj);
        }
      };
      doc.open(this.method, this.url);
      return doc.send();
    };
    return EasyXhr;
  })();
  TwitterSearch = (function() {
    function TwitterSearch() {}
    TwitterSearch.prototype.search = function(term, callback) {
      var cb, xhr;
      xhr = new EasyXhr("GET", "http://search.twitter.com/search.json?q=" + encodeURI(term), true);
      cb = callback;
      return xhr.go(function(res) {
        return cb(res);
      });
    };
    return TwitterSearch;
  })();
  jsexports.TwitterSearch = TwitterSearch;
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
