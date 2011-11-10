lgg = (s) -> console.log s.toString().substr(0, 1000)


class EasyXhr
  constructor: (@method, @url, is_json = true) ->
    @is_json = is_json
    
  go: (donecallback, headerscallback) ->
    doc = new XMLHttpRequest()
    lgg "XHR to " + @url
    doc.onreadystatechange = =>
      lgg "stch"
      if doc.readyState == XMLHttpRequest.HEADERS_RECEIVED
          lgg "headers"
          lgg doc.getAllResponseHeaders()
          headerscallback doc if headerscallback?
          
      if doc.readyState == XMLHttpRequest.DONE
          lgg "DONE" + @is_json
          lgg doc.responseText 
          if @is_json
              lgg("json parsing")
              obj = JSON.parse doc.responseText
          else
              obj = doc.responseText
          donecallback obj
      
    doc.open(@method, @url)
    doc.send()
    

class TwitterSearch
  constructor: ->
    
  search: (term, callback) ->
    xhr = new EasyXhr("GET", "http://search.twitter.com/search.json?q=" + encodeURI(term), true)
    cb = callback
    xhr.go( (res) -> cb(res))       
       
      
      
class YahooPipe
    constructor: ->
      
    fetch: (pipeid, callback) ->    
      url =   "http://pipes.yahoo.com/pipes/pipe.run?_id=" + pipeid + "&_render=json"
      xhr = new EasyXhr("GET", url, true)
      xhr.go (res) ->
        lgg(typeof(res))
        items = res["value"]["items"]
        simplified = ([i.title, i.link] for i in items)
        lgg simplified
        lgg items.length
        callback(res)
                          
      
jsexports.TwitterSearch = TwitterSearch
jsexports.YahooPipe = YahooPipe    
