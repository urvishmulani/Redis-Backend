const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/index');
const config=require('./config/config')
const app = express();
const port = 3000;

// use of body-parser
const { json, urlencoded } = bodyParser; // this is called dstrucring of code
app.use(urlencoded({ extended: false }));
app.use(json()); // it will receive json file

// set base of route
app.use('/api', routes); // this is middleware

app.listen(config.port, () => {
    console.log(config.port)
    console.log(`Express is listening at http://localhost:${config.port}`);
});
