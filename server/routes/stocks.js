const express = require('express')
const { addCandle  } = require('../controllers/candle-controllers.jsx')
// const db = require('../db/database-init');

const router = express.Router();

// add candle via api (just for some testing)
router.post('/add', addCandle);

// router.get('/getCandles', getCandles);

module.exports = router
