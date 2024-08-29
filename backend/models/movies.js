//Model for the movies
const mongoose = require('mongoose');
const {Schema} = require("node:inspector");

//Index Schema
const MoviesSchema = new mongoose.Schema({
    title: String,

    directors: [String],
    stars: [String],
    description: String,
})