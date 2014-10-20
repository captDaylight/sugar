var express = require('express')
var favicon = require('serve-favicon');
var app = express();

app.set('port', (process.env.PORT || 5000))

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/build'))
app.use(favicon(__dirname + '/favicon.ico'));

app.get('/', function (req, res) {
  res.render('index')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
