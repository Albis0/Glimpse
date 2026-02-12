# Glimpse

Glimpse is a small image search app that lets you search **multiple photo APIs from a single place**.
Pick a provider, type a keyword, and browse results.

## Features

- Keyword search
- Provider selection: **Unsplash** / **Pexels**
- Masonry-style grid layout
- Basic loading state + basic toast notifications
- Image preview modal
- Download image from modal

## Screenshots

_Will be updated._

## Setup

### Install & Run

```bash
npm i
npm run dev
```

## Environment Variables

Copy the example file and fill in your keys:

```bash
cp .env.example .env
```

Then edit `.env` and add your API keys.

> Do not commit `.env` to GitHub. Keep your keys private.

## Roadmap

- [ ] Image quality selector (thumbnail / HD / Full HD / 4K / original)
- [ ] Infinite scroll (Pinterest-style)
- [ ] Better error states (network / rate limit / empty)
- [ ] Responsive UI improvements
- [ ] More providers (Pixabay, etc.)
- [ ] User accounts
- [ ] Favorites

## Tech Stack

**Frontend**  
React (Vite) • CSS3 • Axios

**APIs**  
Unsplash • Pexels
