// CBDR scoring controller
exports.calculateCBDRScore = (req, res) => {
  try {
    const { answers } = req.body;

    // Validation: Check if answers array exists and has correct length
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ 
        error: "Answers array is required" 
      });
    }

    if (answers.length !== 10) {
      return res.status(400).json({ 
        error: "Exactly 10 answers are required" 
      });
    }

    // Map answers to scores
    const scoreMap = {
      "Yes": 3,
      "Partially": 2,
      "No": 1
    };

    // Calculate total score
    let totalScore = 0;
    answers.forEach(answer => {
      const score = scoreMap[answer] || 0;
      totalScore += score;
    });

    // Calculate percentage (max score is 30: 10 questions × 3 points)
    const maxScore = 30;
    const percentageScore = (totalScore / maxScore) * 100;

    // Determine readiness level
    let readinessLevel;
    if (percentageScore >= 80) {
      readinessLevel = "High Readiness";
    } else if (percentageScore >= 50) {
      readinessLevel = "Moderate Readiness";
    } else {
      readinessLevel = "Low Readiness";
    }

    // Return response
    res.json({
      totalScore: totalScore,
      percentage: Math.round(percentageScore * 100) / 100,
      readinessLevel: readinessLevel
    });

  } catch (error) {
    res.status(500).json({ 
      error: "Internal server error during score calculation" 
    });
  }
};
