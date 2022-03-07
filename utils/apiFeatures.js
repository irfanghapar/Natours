class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
// class APIFeatures {
//   // fucntion that auto call as soon as we call the object
//   constructor(query, queryString) {
//     this.query = query;
//     this.queryString = queryString;
//   }

//   filter() {
//     const queryObj = { ...this.queryString };
//     const excludedFields = ['page', 'sort', 'limit', 'fields'];
//     excludedFields.forEach((el) => delete queryObj[el]);
//     // 1B) Advanced filtering
//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b{gte|gt|lte|lt\}b/g, (match) => `$${match}`); //g for replace occurence
//     // console.log(JSON.parse(queryStr));
//     // { difficulty : 'easy', duration : {gte: 5}}
//     // { difficulty : 'easy', duration : {$gte: 5}}
//     // gte, gt, lte, lt
//     this.query = this.query.find(JSON.parse(queryStr));
//     // let query = Tour.find(JSON.parse(queryStr)); //find method will return query
//     return this;
//   }

//   sort() {
//     if (this.req.query.sort) {
//       const sortBy = this.queryString.sort.split(',').join(' ');
//       // console.log(sortBy);
//       this.query = this.query.sort(sortBy);
//       // sort('price ratingsAverage')
//     } else {
//       this.query = this.query.sort('-createdAt'); //ordered by date we create
//     }
//     return this;
//   }

//   limitFields() {
//     if (this.queryString.fields) {
//       const fields = this.queryString.fields.split(',').join(' ');
//       // console.log(sortBy);
//       this.query = this.query.select(fields);
//       // sort('price ratingsAverage')
//     } else {
//       this.query = this.query.select('--__v'); //ordered by date we create
//     }
//     return this;
//   }

//   paginate() {
//     const page = this.queryString.page * 1 || 1;
//     const limit = this.queryString.limit * 1 || 100;
//     const skip = (page - 1) * limit;
//     // page=2&limit=10, 1-10, page 1, 11-20, page 2, 21-30, page 3
//     this.query = this.query.skip(skip).limit(limit); // limit amount of the result
//     // if (this.queryString.page) {
//     //   const numTours = await Tour.countDocuments();
//     //   if (skip >= numTours) throw new Error('This page does not exist');
//     // }
//     return this;
//   }
// }
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is : ${val}`);

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       // important to have return is that it works like if else so that it woould not go to next function
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

//BUILD QUERY
// 1A) Filtering
// const queryObj = { ...req.query };
// const excludedFields = ['page', 'sort', 'limit', 'fields'];
// excludedFields.forEach((el) => delete queryObj[el]);
// // 1B) Advanced filtering
// let queryStr = JSON.stringify(queryObj);
// queryStr = queryStr.replace(
//   /\b{gte|gt|lte|lt\}b/g,
//   (match) => `$ ${match}`
// ); //g for replace occurence
// // console.log(JSON.parse(queryStr));
// // { difficulty : 'easy', duration : {gte: 5}}
// // { difficulty : 'easy', duration : {$gte: 5}}
// // gte, gt, lte, lt
// let query = Tour.find(JSON.parse(queryStr)); //find method will return query

// 2) SORTING
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(',').join(' ');
//   // console.log(sortBy);
//   query = query.sort(sortBy);
//   // sort('price ratingsAverage')
// } else {
//   query = query.sort('-createdAt'); //ordered by date we create
// }

// 3) FIELD LIMITING
// if (req.query.fields) {
//   const fields = req.query.fields.split(',').join(' ');
//   // console.log(sortBy);
//   query = query.select(fields);
//   // sort('price ratingsAverage')
// } else {
//   query = query.select('--__v'); //ordered by date we create
// }
//4) PAGINATION
// const page = req.query.page * 1 || 1;
// const limit = req.query.limit * 1 || 100;
// const skip = (page - 1) * limit;
// // page=2&limit=10, 1-10, page 1, 11-20, page 2, 21-30, page 3
// query = query.skip(skip).limit(limit); // limit amount of the result
// if (req.query.page) {
//   const numTours = await Tour.countDocuments();
//   if (skip >= numTours) throw new Error('This page does not exist');
// }
// const query = await Tour.find({
//   duration: 5,
//   difficulty: 'easy',
// }); // return array all of these documents
// const tours = await Tour.find()
//   .where('duration')
//   .equal(5)
//   .where('difficulty')
//   .equals('easy');
module.exports = APIFeatures;
