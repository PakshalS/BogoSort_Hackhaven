const express = require('express');
const  router  = require('./routes/routes.js');
const cors =  require('cors');

const app = express();

app.use(cors());
app.use('/',router);


const PORT = 8000;
app.listen(PORT,() => `Server is listening on port ${PORT}`);