'use strict';

const { Router } = require("express");
const router = Router();

router.use(require("./auth-route"));
router.use(require("./add-expense"));

module.exports = router;