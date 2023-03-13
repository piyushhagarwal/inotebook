const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();
const port = 5001;

app.use(cors()); // For connectivity with react
app.use(express.json());
//Available routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("hello word");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
