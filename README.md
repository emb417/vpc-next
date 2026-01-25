# vpc-next

`vpc-next` is a Next.js application designed to provide leaderboards, statistics, and competition data for the **Virtual Pinball Chat (VPC)** league. It aggregates data from VPC APIs and the Virtual Pinball Spreadsheet (VPS) to display player rankings, weekly competition results, high scores, and detailed player profiles.

## Main Technologies

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** JavaScript (ES Modules)
- **UI & Styling:** [Tailwind CSS](https://tailwindcss.com/), [Ant Design (antd)](https://ant.design/), [React Icons](https://react-icons.github.io/react-icons/)
- **Data Visualization:** [Chart.js](https://www.chartjs.org/) via `react-chartjs-2`
- **Deployment:** Docker support with standalone output.

## Prerequisites

- Node.js (v22+ recommended)
- Environment variables configured in `.env` (see `README.md` for required keys).

## Building and Running

### Development

To run the development server:
```bash
npm install
npm run dev
```
The application will be available at `http://localhost:8080`.

### Production Build

To build the application for production:
```bash
npm run build
```

### Production Start

To start the production server:
```bash
npm start
```
The application will be available at `http://localhost:80`.

## Docker Deployment

This project includes Docker support for streamlined deployment.

### Build Docker Image

```bash
docker build -t vpc-next .
```

### Run Docker Container

```bash
docker run -p 80:80 vpc-next
```
The application will be accessible at `http://localhost`.

## Project Structure

- `app/`: Contains the Next.js App Router structure.
    - `layout.js`: Root layout including global navigation.
    - `page.js`: Main entry point (Main Dashboard).
    - `player/[username]/page.js`: Dynamic routes for player profiles.
    - Other directories (`competitions`, `highscores`, `season`, `stats`) correspond to main site sections.
- `components/`: Modular React components grouped by feature.
- `lib/`: Business logic and data processing utilities.

## Key API Integration

The app integrates with:
1.  **VPC API:** Provides league data, scores, and channel-specific weeks.
2.  **VPS API:** Provides metadata about virtual pinball tables and games.
3.  **Discord CDN:** Used for fetching player avatars.

## Contributing

1. Fork this repo
1. Create a feature branch: `git checkout -b my-new-feature`
1. Commit your changes: `git commit -am 'Add some feature'`
1. Push to the branch: `git push origin my-new-feature`
1. Create a pull request