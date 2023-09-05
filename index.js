const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connection = require("./db");
const cors = require("cors");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    connection.query(`SELECT * FROM TODO`, (err, result, fields) => {
        if (err) console.log(err);
        if (result) return res.status(200).json(result);
    })
})

app.post("/", (req, res) => {
  const { title } = req.body;
  connection.query(
    `INSERT INTO TODO (title) VALUES ('${title}')`,
    (err, result, fields) => {
      console.log("err", err);
      if (err) return res.status(400).json(err);
      if (result) {
          connection.query(`SELECT * FROM TODO`, (err, result, fields) => {
              if (err) console.log(err);
              if (result) return res.status(200).json(result);
          })
      }
    },
  );
});

app.listen(PORT, () => {
  console.log("listening to port on", PORT);
});
