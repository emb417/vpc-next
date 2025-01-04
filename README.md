# virtualpinballchat.com

Virtual pinball chat league leaderboards and stats.

## Getting Started with Developing

1. This project uses a checked-in .env file to configure Virtual Pinball Chat Data APIs:

   ```bash
   VPC_BASE_URL=https://virtualpinballchat.com:8443
   VPC_API_PATH=/vpc/api/v1/weeksByChannelName
   VPC_API_SCORES_PATH=/vpc/api/v1/scoresByVpsId
   VPS_API_TABLES_PATH=/vps/api/v1/games/tables
   VPS_API_GAMES_PATH=/vps/api/v1/games
   ```

2. Install and run the development server:

   ```bash
   npm install
   ```

   ```bash
   npm run dev
   ```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

### Project Structure

- `/app`: layout, loading, error, and pages routing
- `/components`: page components
- `/lib`: data processing and utility functions

### Contributing

1. Fork this repo
1. Create a feature branch: `git checkout -b my-new-feature`
1. Commit your changes: `git commit -am 'Add some feature'`
1. Test your changes with a local production build: `npm run build && npm start`
1. Push to the branch: `git push origin my-new-feature`
1. Create a pull request

## Getting Started with Production

There are two options for running a production build, either directly in a terminal or using Docker.

1. Install and run a production build:

   ```bash
   npm install
   ```

   ```bash
   npm run build
   ```

   ```bash
   npm start
   ```

2. Run a production build using Docker:

   ```bash
   docker build -t vpc-next .
   ```

   ```bash
   docker run -p 80:80 vpc-next
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

- [Docker](https://docs.docker.com/get-started/) - Docker is a platform for building and running applications using containers.
