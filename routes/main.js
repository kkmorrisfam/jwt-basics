const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");

console.log("loading routes");

router.route("/dashboard").get(dashboard);
router.route("/login").post(login);

module.exports = router;
