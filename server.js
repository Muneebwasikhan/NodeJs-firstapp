const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const users = require('./Routes/API/users.js')
const profile = require('./Routes/API/profile.js')
const posts = require('./Routes/API/posts.js')

//bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))


app.get('/',(req, res) => {res.send("Hello friends chai peelo !")});

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));