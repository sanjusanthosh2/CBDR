const express = require('express');
const { calculateCBDRScore } = require('../controllers/scoreController');

const router = express.Router();

// CBDR scoring route
router.post('/cbdr-score', (req, res) => {
  try {
    calculateCBDRScore(req, res);
  } catch (error) {
    res.status(500).json({ 
      error: "Route error: " + error.message 
    });
  }
});

// CBDR readiness assessment route
router.post('/cbdr-readiness', calculateCBDRScore);

module.exports = router;
