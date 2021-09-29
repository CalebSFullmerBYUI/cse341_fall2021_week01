//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();

const ta03Control = require('../controllers/ta03-control');

let items = [];


router.get('/', ta03Control.getAllProducts);
router.post('/search-items', ta03Control.searchItems)

module.exports = router;
