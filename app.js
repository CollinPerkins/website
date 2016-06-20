var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'assets/views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'assets/public')));

app.get('/', function(req, res){
  res.render('index');
});

app.post('/send', function(req, res){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: '',
      pass: ''
    }
  });

  var mailOptions = {
    from: 'Collin Perkins <collinperkinsweb@gmail.com>',
    to: 'collinperkinsweb@gmail.com',
    subject: 'Website Submission',
    text: 'You have a submission with the following details... Name: ' + req.body.name + 'Email: ' + req.body.email + 'Phone Number: ' + req.body.number + 'Message: ' + req.body.comment,
    html: '<p> You have a submission with the following details...</p><ul><li>Name: ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Phone Number: ' + req.body.number + '</li><li>Comment: ' + req.body.comment + '</li></ul>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.redirect('/');
    } else {
      console.log('Message Sent: ' + info.response);
      res.redirect('/');
    }
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });
