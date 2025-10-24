const express = require('express');
const { calculateCBDRReadinessScore } = require('../controllers/scoreController');

const router = express.Router();

// CBDR readiness assessment route - to be implemented
router.post('/api/cbdr-readiness', calculateCBDRReadinessScore);

module.exports = router;
