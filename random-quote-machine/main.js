window.twttr = (function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0],
  t = window.twttr || {};
if (d.getElementById(id)) return t;
js = d.createElement(s);
js.id = id;
js.src = "https://platform.twitter.com/widgets.js";
fjs.parentNode.insertBefore(js, fjs);

t._e = [];
t.ready = function(f) {
  t._e.push(f);
};

return t;
}(document, "script", "twitter-wjs"));

$(document).ready(function(){
  setTimeout(function () {
    ajaxCall();
  }, 1000);
  $('#newQuote').click(function() {
    $( "#tweet" ).remove();
    $( "#quoteArea" ).append( "<div id='tweet'></div>" );
    ajaxCall();
  });
});

function ajaxCall() {
  var quote;
  var author;
  var randomNumber = Math.floor(Math.random() * 10000);
  $.ajax({
    type: "GET",
    url: "http://api.forismatic.com/api/1.0/?method=getQuote&key=" + randomNumber + "&format=json&lang=en",
    success: function(data){
      quote = data.quoteText;
      author = data.quoteAuthor;
      $('#quote').html(quote);
      $('#author').html('-' + author + '-');
      twttr.widgets.createShareButton(
      'https://dev.twitter.com/',
      document.getElementById('tweet'),
      {
        text: quote + '\n' + '-' + author + '-' + '\n'
      }
    );
    }
  });

}
