# Multi-stage build for a lean and production-ready Docker image.

# -----------------------------------------------------------
# STAGE 1: The Builder Stage
# This stage installs all dependencies and builds the Next.js application.
# -----------------------------------------------------------
FROM node:24-slim AS builder

# Set the working directory inside the container. All subsequent commands will
# run in this directory unless otherwise specified.
WORKDIR /app

# Install native dependencies for the 'sharp' image processing library.
# This is a critical step to prevent the build error on ARM architectures.
# We use 'apt-get' since we're using a Debian-based image.
# These libraries are required for the `sharp` dependency to build correctly.
RUN apt-get update && apt-get install -y \
    libvips-dev

# Copy package.json and package-lock.json first to leverage Docker's layer caching.
# This ensures that npm dependencies are only re-installed when these files change.
COPY package*.json ./

# Install dependencies. `npm ci` is used instead of `npm install` for reproducible
# builds, as it uses the exact versions specified in package-lock.json.
RUN npm ci

# Copy the rest of the application source code into the container.
COPY . .

# Build the Next.js application for production.
# NEXT_TELEMETRY_DISABLED=1 prevents Next.js from collecting anonymous telemetry data.
# The next build command will now generate a 'standalone' folder.
RUN NEXT_TELEMETRY_DISABLED=1 npm run build

# -----------------------------------------------------------
# STAGE 2: The Production Stage
# This stage uses a much smaller, non-development-focused Node.js image to run
# the production application, reducing the final image size and attack surface.
# -----------------------------------------------------------
FROM node:24-slim AS runner

ENV PORT=3333
# Set the working directory.
WORKDIR /app

# Set the user to 'node' for enhanced security.
USER node

# The Next.js app needs specific files to run. We copy them from the builder stage.
# We only copy the files that are absolutely necessary.
# We no longer need to copy node_modules separately as they are part of the standalone build.
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# Expose the port on which the Next.js application will listen.
EXPOSE 3333

# The command to run the Next.js application in production.
# This starts the Next.js server.
CMD ["node", "server.js"]
