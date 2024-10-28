const express = require("express");
const getRouter = express.Router();
const postRouter = express.Router();
const delRouter = express.Router();
const editRouter = express.Router();
const pool = require("../config/db");
const multer = require("multer");

module.exports = { pool, getRouter, postRouter, delRouter, editRouter, multer }