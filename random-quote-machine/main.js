$(document).ready(function(){
  setTimeout(function () {
    ajaxCall();
  }, 1000);
  $('#newQuote').click(function() {
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
      $('#author').html(author);
    }
  });
}
