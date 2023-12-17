const express = require("express");
const {
  getAllEmployees,
  createNewEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} = require("../../controllers/employeeController");
const router = express.Router();

router
  .route("/")
  .get(getAllEmployees)
  .post(createNewEmployees)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route("/:id").get(getEmployee);
module.exports = router;
