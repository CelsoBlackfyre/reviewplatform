//Models for the reviews

       const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: String,
    score: Number,
    body: String,
})
