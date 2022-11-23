const express = require("express");
// const logger = require("morgan");
// const masterRouters = require('./api/routes/masterRoutes');
// const { port, host } = require("./config");
// const dbConfig = require('./api/data/dbconfig')

const app = express();
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/api", masterRouters);

app.post("/api/post", (req, res, next) => {
  res.status(200).json({ message: "Post Success" });
});

app.get("/api/get", (req, res, next) => {
  res.status(200).json({ message: "Get Success" });
});

app.put("/api/put", (req, res, next) => {
  res.status(200).json({ message: "Put Success" });
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error["status"] = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error });
});

app.listen(3000, "localhost", () => {
  console.log(`listening on ${3000}:${"port"}`);
});
module.exports = app;
