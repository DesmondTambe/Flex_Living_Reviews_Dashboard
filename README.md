# Flex Living Reviews Dashboard

A comprehensive reviews management system for Flex Living properties, featuring a manager dashboard and public-facing review display.

## Features

### Manager Dashboard
- View all property reviews in one place
- Filter by property, rating, channel, review type, and search text
- Approve/unapprove reviews for public display
- See property performance statistics
- Track review trends and ratings

### Public Property Pages
- Beautiful property listings
- Display only manager-approved reviews
- Professional review presentation
- Property amenities showcase
- Responsive design

## Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

## Navigation

- `/` - Home (redirects to properties)
- `/properties` - Public property listings
- `/properties/[id]` - Individual property page with reviews
- `/dashboard` - Manager dashboard (review management)

## Tech Stack

- **Framework**: Next.js 15.5.4
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **Icons**: Lucide React
- **Data**: Mock Hostaway API data

## API Routes

### GET /api/reviews/hostaway
Fetch normalized reviews with optional filters:
- `listingId` - Filter by property
- `minRating` - Minimum rating
- `channel` - Filter by channel
- `approvedOnly` - Only approved reviews

### GET /api/listings
Get all listings with aggregated statistics

## Documentation

See [DOCUMENTATION.md](./DOCUMENTATION.md) for:
- Detailed architecture
- Design decisions
- Google Reviews integration research
- Future enhancements

## Primary Color

The application uses `#274e4c` (deep teal) as the primary brand color throughout.

## Key Components

- **Filter Sidebar** - Advanced filtering for reviews
- **Review Card** - Individual review display with approval controls
- **Property Stats** - Dashboard statistics
- **Property Card** - Property performance overview
- **Review Display** - Public review grid

## Data Persistence

Currently uses localStorage for demo purposes.

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge)

---

Built with Next.js and Tailwind CSS
