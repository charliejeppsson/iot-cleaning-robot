const express = require('express');
const router = express.Router()
const { cleanOffice } = require('../../controllers/v1/executionsController');

router.get('/', (req, res) => res.send('Ba ba bip bip bop'));

router.post(
  '/tibber-developer-test/enter-path',
  (req, res) => cleanOffice(req, res)
);

module.exports = router;
