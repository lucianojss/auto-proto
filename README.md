# Car Search

This is a demo app to demonstrate car listing web application built with Next.js, TypeScript, and Tailwind CSS.
The usage of Next.js is to amplify the usage of server components for faster rendering and routing capabilities optimizing SEO.

⚠️ The web application is using fake static data that might be not consistent. ex: car images not matching the brand/model. The static data is simply for demo purposes.

## Demo Features

- 🚗 **Simple Car Listing**: Browse a curated list of cars with detailed information and images.
- 📊 **SEO Metadata Generation**: Opengraph metadata generation when sharing a car page.
- 🔗 **Instagram photos like approach with routes**: Opengraph metadata generation when sharing a car page.
- 📊 **Price History Graph**: Visualize price trends for each car over time.
- ⭐ **Price Rating Indicator**: Instantly see how a car's price compares to the market.
- 🖼️ **Image Gallery**: View high-quality images of car exteriors and interiors.
- 📱 **Responsive Design**: Fully responsive and mobile-friendly UI.
- 🧩 **Reusable Components**: Modular component architecture for easy maintenance and scalability.
- 🌓 **Dark Mode**: Toggle between light and dark themes.
- 🔗 **Shareable Links**: Easily share car details with others.
- 🧭 **Breadcrumb Navigation**: Seamless navigation throughout the app.
- ⏳ **Loading Skeletons**: Smooth loading experience with skeleton components.

## Project Routes

- `/` - Landing page route
- `/cars` - Cars Listing page
- `/cars/[slug]` - Car details page by slug

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

1. **Install dependencies**
   ```sh
   pnpm install
   ```
2. **Run the development server**
   ```sh
   pnpm dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` - Application routes and pages
- `src/components/` - UI and feature components
- `src/data/` - Static data for cars and images (mocked data)
- `src/lib/` - Utility libraries
- `src/utils/` - Helper functions
