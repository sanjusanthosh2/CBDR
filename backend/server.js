const express = require('express');
const cors = require('cors');
const scoreRoutes = require('./routes/scoreRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
app.use(cors());

// Body parsing middleware
app.use(express.json());

// CBDR scoring routes
app.use("/api", scoreRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
