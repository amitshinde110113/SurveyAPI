const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose')
const usersRouter = require('./routes/users');
const surveysRouter = require('./routes/survey');
const questionsRouter = require('./routes/questions');
const surveyResultsRouter = require('./routes/survey-result');
const checkAuth = require('./middleware/check-auth');
const PORT = process.env.PORT || 3000
const app = express();
mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
  {
    useNewUrlParser: true,
  });
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})
module.exports = app;
