# Gemini Context: vpc-next

This file provides instructional context for Gemini CLI interactions within the `vpc-next` repository.

## Project Overview

`vpc-next` is a Next.js application designed to provide leaderboards, statistics, and competition data for the **Virtual Pinball Chat (VPC)** league. It aggregates data from VPC APIs and the Virtual Pinball Spreadsheet (VPS) to display player rankings, weekly competition results, high scores, and detailed player profiles.

### Main Technologies

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** JavaScript (ES Modules)
- **UI & Styling:** [Tailwind CSS](https://tailwindcss.com/), [Ant Design (antd)](https://ant.design/), [React Icons](https://react-icons.github.io/react-icons/)
- **Data Visualization:** [Chart.js](https://www.chartjs.org/) via `react-chartjs-2`
- **Deployment:** Docker support with standalone output.

## Building and Running

### Prerequisites

- Node.js (v24+ recommended)
- Environment variables configured in `.env` (see `README.md` for required keys).

### Commands

| Task                 | Command                           |
| :------------------- | :-------------------------------- |
| **Development**      | `npm run dev` (Runs on port 8080) |
| **Build**            | `npm run build`                   |
| **Production Start** | `npm start` (Runs on port 80)     |
| **Linting**          | `npm run lint`                    |
| **Docker Build**     | `docker build -t vpc-next .`      |
| **Docker Run**       | `docker run -p 80:80 vpc-next`    |

## Project Structure

- `app/`: Contains the Next.js App Router structure.
  - `layout.js`: Root layout including global navigation.
  - `page.js`: Main entry point (Main Dashboard).
  - `player/[username]/page.js`: Dynamic routes for player profiles.
  - Other directories (`competitions`, `highscores`, `season`, `stats`) correspond to main site sections.
- `components/`: Modular React components grouped by feature:
  - `main/`: Core dashboard components (`WeeklyLeaderboard`, `RankLeaderboard`).
  - `player/`: Components for player-specific views (`PlayerBio`, `PlayerCharts`).
  - `shared/`: Reusable UI elements.
- `lib/`: Business logic and data processing utilities.
  - `LeagueStats.js`: Complex ranking and win-percentage calculations.
  - `LeaderboardStats.js`: Processing of weekly competition data.
- `public/`: Static assets (icons, images).

## Development Conventions

- **Server Components:** Prefer React Server Components (RSC) for data fetching where possible (e.g., `MainDashboard.js`).
- **Data Fetching:** Uses standard `fetch` with Next.js no cache (`{ cache: "no-store" }`) and revalidation options (`{ next: { revalidate: ... } }`).
- **Styling:** Primarily utility-first CSS using Tailwind. Components from Ant Design are used for complex UI elements like dropdowns or tables.
- **State Management:** Relies on URL parameters and server-side state for most navigation-driven data.
- **Standalone Output:** The project is configured for `output: 'standalone'` in `next.config.mjs` for optimized Docker deployments.

## Key API Integration

The app integrates with:

1. **VPC API:** Provides league data, scores, and channel-specific weeks.
2. **VPS API:** Provides metadata about virtual pinball tables and games.
3. **Discord CDN:** Used for fetching player avatars.
