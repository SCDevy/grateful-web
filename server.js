var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// additional middleware which will set headers that we need on each request
app.use(function(req, res, next) {
    // set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server
    res.setHeader('Access-Control-Allow-Origin', '*');

    // disable caching so we'll always get the latest comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});

var submissionSchema = mongoose.Schema({
    text: String,
    date: { type: Date, default: Date.now }
});
submissionSchema.methods.prettyDate = function() {
    var prettyDate = this.date.getMonth() + 1 + '.' + this.date.getDate() + '.' + this.date.getFullYear();
    return prettyDate;
}
var Submission = mongoose.model('Submission', submissionSchema);

app.get('/api/submissions', function(req, res) {
    Submission.find(function (err, submission) {
        if (err) return console.error(err);
        res.json(submission);
    })
});

app.post('/api/submissions', function(req, res) {
    Submission.find(function (err, submission) {
      if (err) return console.error(err);

      var newSubmission = {
          text: req.body.text
      };

      var post = new Submission(newSubmission);
      post.save(function(err, post) {
          if(err) return console.error(err);
          console.log(post);
      });
    })
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
