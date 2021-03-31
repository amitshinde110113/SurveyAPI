var express = require('express');
var path = require('path');
var logger = require('morgan');
const mongoose = require('mongoose')
var usersRouter = require('./routes/users');
var surveysRouter = require('./routes/survey');
var questionsRouter = require('./routes/questions');
var surveyResultsRouter = require('./routes/survey-result');

const checkAuth = require('./middleware/check-auth');


var app = express();
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
  {
    useNewUrlParser: true,
  });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/surveys', checkAuth, surveysRouter);
app.use('/questions', checkAuth, questionsRouter);
app.use('/results', checkAuth, surveyResultsRouter);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error['status'] = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error });
});

app.listen(3000, () => {
  console.log(`listening on ${3000}`);
})

module.exports = app;
