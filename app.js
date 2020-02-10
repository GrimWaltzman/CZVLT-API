const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.port || 3000;
require('dotenv/config');

const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const articlesRoute = require('./routes/articles');
app.use('/api/articles',articlesRoute);

const usersRoute = require('./routes/users');
app.use('/api/users',usersRoute);

app.get('/', (req, res) => {  
   res.send('Success');
})

mongoose.connect(
   process.env.DB_CONNECTION,
   {useNewUrlParser: true },
   () => console.log('Connected to db')
);

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))