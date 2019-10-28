const express = require('express');
const router = express.Router()
const { cleanOffice } = require('../../controllers/v1/executionsController');

router.post(
  '/tibber-developer-test/enter-path',
  (req, res) => cleanOffice(req, res)
);

module.exports = router;
