.pragma library

var jsexports = {};


(function() {
  var EasyXhr, TwitterSearch, YahooPipe, lgg;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  lgg = function(s) {
    return console.log(s.toString().substr(0, 1000));
  };
  EasyXhr = (function() {
    function EasyXhr(method, url, is_json) {
      this.method = method;
      this.url = url;
      if (is_json == null) {
        is_json = true;
      }
      this.is_json = is_json;
    }
    EasyXhr.prototype.go = function(donecallback, headerscallback) {
      var doc;
      doc = new XMLHttpRequest();
      lgg("XHR to " + this.url);
      doc.onreadystatechange = __bind(function() {
        var obj;
        lgg("stch");
        if (doc.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
          lgg("headers");
          lgg(doc.getAllResponseHeaders());
          if (headerscallback != null) {
            headerscallback(doc);
          }
        }
        if (doc.readyState === XMLHttpRequest.DONE) {
          lgg("DONE" + this.is_json);
          lgg(doc.responseText);
          if (this.is_json) {
            lgg("json parsing");
            obj = JSON.parse(doc.responseText);
          } else {
            obj = doc.responseText;
          }
          return donecallback(obj);
        }
      }, this);
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
  YahooPipe = (function() {
    function YahooPipe() {}
    YahooPipe.prototype.fetch = function(pipeid, callback) {
      var url, xhr;
      url = "http://pipes.yahoo.com/pipes/pipe.run?_id=" + pipeid + "&_render=json";
      xhr = new EasyXhr("GET", url, true);
      return xhr.go(function(res) {
        var i, items, simplified;
        lgg(typeof res);
        items = res["value"]["items"];
        simplified = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = items.length; _i < _len; _i++) {
            i = items[_i];
            _results.push([i.title, i.link]);
          }
          return _results;
        })();
        lgg(simplified);
        lgg(items.length);
        return callback(res);
      });
    };
    return YahooPipe;
  })();
  jsexports.TwitterSearch = TwitterSearch;
  jsexports.YahooPipe = YahooPipe;
}).call(this);
(function() {
  var foo;
  foo = function() {
    return console.log("Another func");
  };
}).call(this);
