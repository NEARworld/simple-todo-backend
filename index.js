const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connection = require("./db");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  const { todo } = req.body;
  connection.query(
    `INSERT INTO TODO (title) VALUES ('${todo}')`,
    (err, result, fields) => {
      console.log("err", err);
      if (err) console.log(err);
      if (result) {
        return res.status(200).json(result);
      }
    },
  );
});

app.listen(PORT, () => {
  console.log("listening to port on", PORT);
});