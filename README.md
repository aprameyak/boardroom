# Boardroom

A shared table of freelancer hourly rates. Freelancers submit what they charge, and anyone can filter by category, experience level, and location to see the median and typical range.

## Features

- Submit an hourly rate with category, experience level (junior, mid, senior), location, and key skills
- Filter rates by category, experience, and location (partial, case-insensitive match)
- See the median rate, the 25th to 75th percentile range, and the number of matching rates
- Entries are saved to a local JSON file

## Getting started

Requires Node.js.

```bash
npm install
npm start
```

This starts the API on http://localhost:3001. The server does not serve the page, so open `index.html` directly in your browser. `npm run dev` runs the same command.

## How it works

- `index.html` has a submit form and a "Market Rates" panel with filters, stats, and the matching rates. It calls the API at `http://localhost:3001`.
- `server.js` is an Express app with three endpoints:
  - `POST /api/rates` to save a rate.
  - `GET /api/rates` to return matching rates and stats (median, mean, min, max, p25, p75). Filters: `category`, `experience`, `location`.
  - `GET /api/categories` to list categories that have submissions.
- Data is written to `data.json`, created on first run and ignored by git. `utils.js` holds helpers not yet wired in.

## Status

Prototype. Rates are self-reported and anonymous, with no verification.

## License

MIT, see [LICENSE](LICENSE).
