const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dataFile = path.join(__dirname, 'data.json');

const initData = () => {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ rates: [] }));
  }
};

const readData = () => {
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
};

const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

app.post('/api/rates', (req, res) => {
  const { category, experience, location, hourlyRate, skills } = req.body;

  const data = readData();
  data.rates.push({
    id: Date.now(),
    category,
    experience,
    location,
    hourlyRate: parseFloat(hourlyRate),
    skills,
    timestamp: new Date().toISOString()
  });
  writeData(data);

  res.json({ success: true, message: 'Rate submitted' });
});

app.get('/api/rates', (req, res) => {
  const { category, experience, location } = req.query;
  const data = readData();

  let filtered = data.rates;
  if (category) filtered = filtered.filter(r => r.category === category);
  if (experience) filtered = filtered.filter(r => r.experience === experience);
  if (location) filtered = filtered.filter(r => r.location.toLowerCase().includes(location.toLowerCase()));

  const stats = filtered.length > 0 ? {
    count: filtered.length,
    median: filtered.map(r => r.hourlyRate).sort((a, b) => a - b)[Math.floor(filtered.length / 2)],
    mean: filtered.reduce((a, b) => a + b.hourlyRate, 0) / filtered.length,
    min: Math.min(...filtered.map(r => r.hourlyRate)),
    max: Math.max(...filtered.map(r => r.hourlyRate)),
    p25: filtered.map(r => r.hourlyRate).sort((a, b) => a - b)[Math.floor(filtered.length * 0.25)],
    p75: filtered.map(r => r.hourlyRate).sort((a, b) => a - b)[Math.floor(filtered.length * 0.75)]
  } : null;

  res.json({ rates: filtered, stats });
});

app.get('/api/categories', (req, res) => {
  const data = readData();
  const categories = [...new Set(data.rates.map(r => r.category))];
  res.json({ categories });
});

const PORT = 3001;
initData();
app.listen(PORT, () => {
  console.log(`Boardroom API running on port ${PORT}`);
});
