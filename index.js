const express = require('express');
require('dotenv').config();
const volleyball = require('volleyball');
const app = express();

// Middlewares
app.use(volleyball);
app.use(express.json());

app.use('/api/v1/auth',require("./routes/Auth"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
