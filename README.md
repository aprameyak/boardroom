# Boardroom

Transparent freelancer rate database. See what freelancers in your category, experience level, and location actually charge.

## Features

- Submit your hourly rate with category, experience, location, and skills
- Browse market rates filtered by category, experience, and location
- View statistics: median, quartiles, count
- All data crowdsourced and transparent

## Quick Start

```bash
npm install
npm start
```

Then open `index.html` in your browser and make API calls to `http://localhost:3001`.

## API

- `POST /api/rates` - Submit a rate
- `GET /api/rates` - Get rates (with optional filters: category, experience, location)
- `GET /api/categories` - Get all categories

## Tech

- Node.js + Express
- Plain HTML/JS frontend
- JSON file storage
