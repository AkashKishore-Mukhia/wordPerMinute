const express = require('express')
const cors = require('cors')
const home = require('./Routes/routes')
const signUp = require('./Routes/signUp')
const login = require('./Routes/login');
const user = require('./Routes/user');
const connectDb = require('./utils/db')
require('dotenv').config()

const app = express();

app.set('view engine', 'ejs');

app.set('view engine', 'ejs');
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/v1', home)
app.use('/api/v1/signup', signUp)
app.use('/api/v1/login', login);
app.use('/api/v1/quotes', home);
app.use('/api/v1/user', user);

app.listen(process.env.PORT || 4000, () => {
  console.log(`server is listening at ${process.env.PORT}`);
  connectDb();
})