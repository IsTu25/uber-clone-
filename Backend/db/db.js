const mongoose = require('mongoose');

function connectToDb(uri) {
    mongoose.connect(uri)
        .then(() => {
            console.log('Connected to MongoDB successfully');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
}

module.exports = connectToDb;
