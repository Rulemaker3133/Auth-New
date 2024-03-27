const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
const mongoose = require('mongoose');
const router = require('./router.js')


app.use(express.json());

app.use('/auth', router);



const start = () => {
    try {
        mongoose.connect('mongodb+srv://user:1kloUvZNUyy8hwAa@auth-new.pjl0pex.mongodb.net/?retryWrites=true&w=majority&appName=AUTH-NEW');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}...`);
        });
    } catch (error) {
        console.log(error);
    }
}


start();

