import React, { useState } from 'react';

function App() {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const questions = [
    {
      id: 1,
      question: "Do you have a documented cloud backup strategy with defined backup frequencies?",
      category: "Cloud Backup Strategy",
      options: ["Yes", "Partially", "No"]
    },
    {
      id: 2,
      question: "Are your backups automated and scheduled regularly?",
      category: "Backup Frequency and Automation",
      options: ["Yes", "Partially", "No"]
    },
    {
      id: 3,
      question: "Have you defined Recovery Time Objectives (RTO) for critical systems?",
      category: "Recovery Time Objective (RTO)",
      options: ["Yes", "Partially", "No"]
    },
    {
      id: 4,
      question: "Have you established Recovery Point Objectives (RPO) for data loss tolerance?",
      category: "Recovery Point Objective (RPO)",
      options: ["Yes", "Partially", "No"]
    },
    {
      id: 5,
      question: "Are your cloud backup storage locations secured with encryption?",
      category: "Cloud Storage Security",
      options: ["Yes", "Partially", "No"]
    },
    {
      id: 6,
      question: "Do you regularly test your disaster recovery procedures and backup restoration?",
      category: "Disaster Recovery Testing",
      options: ["Yes", "Partially", "No"]
    },
    {
      id: 7,
      question: "Do you have a business continuity plan that includes backup and recovery procedures?",
      category: "Business Continuity Planning",
      options: ["Yes", "Partially", "No"]
    },
    {
      id: 8,
      question: "Have you established backup retention policies for different data types?",
      category: "Backup Retention Policy",
      options: ["Yes", "Partially", "No"]
    },
    {
      id: 9,
      question: "Do you use multi-region or geo-redundant backup storage?",
      category: "Multi-region / Geo-redundancy",
      options: ["Yes", "Partially", "No"]
    },
    {
      id: 10,
      question: "Do you validate backup integrity and maintain backup logs?",
      category: "Backup Validation and Logs",
      options: ["Yes", "Partially", "No"]
    }
  ];

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    setError(null);
    setResults(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const answersArray = questions.map(q => answers[q.id] || null);
    
    if (answersArray.some(answer => answer === null)) {
      setError("Please answer all questions before submitting.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('http://localhost:5000/api/cbdr-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: answersArray }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to calculate score');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'An error occurred while calculating the score');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">CBDR Readiness Assessment</h1>
      <p className="text-gray-600 mb-6">Evaluate your organization's Cloud Backup and Disaster Recovery readiness across key areas.</p>
      
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div key={q.id} className="mb-6 p-4 border rounded">
            <h3 className="text-lg font-semibold mb-2">{q.question}</h3>
            <p className="text-sm text-gray-500 mb-3">Category: {q.category}</p>
            {q.options.map((option) => (
              <label key={option} className="block mb-2">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={() => handleAnswerChange(q.id, option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        
        <button 
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Calculating...' : 'Submit CBDR Assessment'}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-800">Error: {error}</p>
        </div>
      )}

      {results && (
        <div className="mt-6 p-4 bg-gray-50 border rounded">
          <h2 className="text-xl font-bold mb-4">Assessment Results</h2>
          <div className="space-y-2">
            <p><strong>Readiness Level:</strong> {results.readinessLevel}</p>
            <p><strong>Total Score:</strong> {results.totalScore} / 30</p>
            <p><strong>Percentage:</strong> {results.percentage}%</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
