const mongoose = require("mongoose");
let howManyTrys = 0;
let connect = async () => {
  try {
    await mongoose.connect(process.env.DB_mongodb, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('connect to database successfully')
  } catch (error) {
    console.log('how many times we tried to connect to database and failed', howManyTrys)
    howManyTrys += 1;
    console.error('error connecting to database :', error.message);
    setTimeout(() => {
      connect();
    }, howManyTrys % 5 ? 10000 : 2500);
  }

}


exports.connectDatabase = connect;

