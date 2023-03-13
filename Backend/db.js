const mongoose = require("mongoose");
const mongoUrl = "mongodb://localhost:27017/iNotebook";

const connectToMongo = () => {
  mongoose.connect(
    mongoUrl,
    () => {
      console.log("Connected to mongo successfully");
    },
    { useNewUrlParser: true }
  );
};
mongoose.set("strictQuery", false);

module.exports = connectToMongo;
