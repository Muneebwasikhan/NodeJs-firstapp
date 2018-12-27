const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})


module.exports = users = mongoose.model("users",userSchema);