lgg = console.log

class EasyXhr
  constructor: (@method, @url, @is_json) ->
    
  go: (donecallback, headerscallback) ->
    doc = new XMLHttpRequest()
    doc.onreadystatechange = ->
      lgg "stch"
      if doc.readyState == XMLHttpRequest.HEADERS_RECEIVED
          lgg "headers"
          lgg doc.getAllResponseHeaders()
          headerscallback doc
          
      if doc.readyState == XMLHttpRequest.DONE
          lgg "DONE"
          lgg doc.responseText 
          if @is_json
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
       
      
      
jsexports.TwitterSearch = TwitterSearch
    
    
    
     


pics = () -> 
    ["a.jpg", "b.jpg"]

sayhello = () ->
    console.log("Test")
    console.log("Hello world")

jsexports.sayhello = sayhello
jsexports.pics = pics
