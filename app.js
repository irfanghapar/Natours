// express application
// const fs = require('fs');
const express = require('express');
// const { create } = require('domain');
// const req = require('express/lib/request');
// app.use(express.json()); //middleware a function
const morgan = require('morgan');
// const router = require('./routes/tourRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const router = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARE
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //calling morgan will return a function similar to the middleware below this
  // app.use(morgan('tiny')); // different order/colour
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`)); // to access file systems through browser

app.use((req, res, next) => {
  // we can call other than next
  console.log('Hello from the middleware ✌️');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers); // http header / req headers
  next();
});
// app.get('/', (req, res) => {
//   //send is send the string
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.json({ message: 'You can post to this endpoint!', app: 'Natours' });
// });

// 2) ROUTE HANDLERS
/// TO PASS THE DATA TO API

// DELETE METHOD
// (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

// 3) ROUTES

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours', getTour);
// app.post('/api/v1/tours/:id', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', router);
app.use('/api/v1/users', userRouter);

// ERROR HANDLING FOR ALL HTTP
app.all('*', (req, res, next) => {
  // this should be the last part of routes
  // for all the http method // * mean everything
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can t find ${req.originalUrl} on this server`,
  // });
  // const err = new Error(`Can t find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can t find ${req.originalUrl} on this server`)); // pass the error to the global handling
});

// //ERROR GLOBAL HANDLING FOR ALL MIDDLEWARE FUNCTIONS
// app.use((err, req, res, next) => {
//   // console.log(err.stack);
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// });
app.use(globalErrorHandler);
module.exports = app;
