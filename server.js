const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  // server.close(() => {
  process.exit(1);
  // });
});
// console.log(x); // not defined (uncaught exception)

dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(app.get('env')); // the environemt we currently in
// console.log(app.get('process.env'));
// 4) START SERVER

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  // (process.env.DATABASE_LOCAL)
  .connect(DB, {
    //return promise
    //deprecation warnings
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connections successful');
  });

// mongoose is all about model
// to create model we need schema
// use schema tu describe and validate our data

// const tourSchema = new mongoose.Schema({
//   name: String,
//   rating: Number,
//   price: Number,
// });
// basic schema
// const tourSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'A tour must have a name'], // validator
//     unique: true, // unique value for a give path
//   },
//   rating: {
//     type: Number,
//     default: 4.5,
//   },
//   price: {
//     type: Number,
//     required: [true, ' A tour must have a price'], //validator
//   },
// });

// const Tour = mongoose.model('Tour', tourSchema); // capital T to know we re dealing with mode

// const testTour = new Tour({
//   // new document
//   name: 'The Forest Hiker',
//   rating: 4.7,
//   price: 497,
// });
// const testTour = new Tour({
//   // new document
//   name: 'The Park Camper',
//   price: 997,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR', err);
//   }); // save document to database // it will return promise

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port} `);
});

// safety net // backup all the asynchornous error
process.on('unhandledRejection', (err) => {
  // handle the unhandled promise rejection if mongo db not connected ;example
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
