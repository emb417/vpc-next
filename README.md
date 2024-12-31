# virtualpinballchat.com

Virtual pinball chat league leaderboards and stats.

## Getting Started with Developing

This project uses a .env file for a few use cases:

1. Virtual Pinball Chat Base URL
   - VPC_BASE_URL=[BASE URL]
1. Virtual Pinball Chat API Path
   - VPC_API_PATH=[API PATH]
1. Virtual Pinball Chat Scores API Path
   - VPC_API_SCORES_PATH=[API PATH]
1. Virtual Pinball Spreadsheet Tables API Path
   - VPS_API_TABLES_PATH=[API PATH]
1. Virtual Pinball Spreadsheet Games API Path
   - VPS_API_GAMES_PATH=[API PATH]

Install and run the development server:

```bash
npm install
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:8080) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Getting Started with Production

Install and run the development server:

```bash
npm install
```

```bash
npm run build
```

```bash
npm start
```

Open [http://localhost](http://localhost) with your browser to see the result.

## Tech Stack

### Next.js

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React](https://react.dev/) - React lets you build user interfaces out of individual pieces called components. Create your own React components like Thumbnail, LikeButton, and Video. Then combine them into entire screens, pages, and apps.
- [TailwindCSS](https://v2.tailwindcss.com/docs) - A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.
- [React-Icons](https://react-icons.github.io/react-icons/) - Include popular icons in your React projects easily with react-icons, which utilizes ES6 imports that allows you to include only the icons that your project is using.
- [Chart.js](https://www.chartjs.org/docs/latest/) - Chart.js provides a set of frequently used chart types, plugins, and customization options.
- [react-chartjs-v2](https://github.com/reactchartjs/react-chartjs-2) - React components for Chart.js, the most popular charting library.
- [antd](https://ant.design/docs/spec/introduce) - Help designers/developers building beautiful products more flexible and working with happiness
- [sharp](https://github.com/lovell/sharp) - The typical use case for this high speed Node-API module is to convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions.

### Docker

- [Docker](https://www.docker.com/) - Docker is a platform for building and running applications using containers. Docker is a platform for building and running applications using containers.
