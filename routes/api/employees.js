const express = require("express");
const router = express.router();
const path = require("path");
const data = {};

data.employees = require("../../data/employees.json");

module.exports = router;
