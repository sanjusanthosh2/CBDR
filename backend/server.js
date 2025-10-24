const express = require('express');
const cors = require('cors');
const scoreRoutes = require('./routes/scoreRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Basic CORS setup
app.use(cors());
app.use(express.json());

// Routes
app.use('/', scoreRoutes);

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
