# Flex Living Reviews Dashboard - Documentation

## Overview
This is a comprehensive Reviews Dashboard system built for Flex Living that allows property managers to assess property performance based on guest reviews from multiple channels. The system includes both a private manager dashboard and a public-facing review display.

## Tech Stack

### Frontend
- **Framework**: Next.js 15.5.4 (React 19.1.0)
- **Styling**: Tailwind CSS 4.1.14
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **Typography**: System fonts with custom color scheme

### Backend
- **API Routes**: Next.js API routes
- **Data Storage**: LocalStorage (for demo purposes)
- **Mock Data**: Comprehensive mock review dataset

### Color Scheme
- **Primary Color**: #274e4c (Deep teal/green)
- **Secondary Color**: White
- **Accent Colors**: Yellow for ratings, Green for success states

## Architecture & Design Decisions

### 1. Data Normalization
The system receives reviews from the Hostaway API and normalizes them into a consistent format:
- Converts listing names to URL-friendly IDs
- Calculates average category ratings when overall rating is missing
- Standardizes date formats
- Adds approval status tracking

### 2. Component Structure
The application follows a modular component architecture:

**Dashboard Components** (`/components/dashboard/`)
- `filter-sidebar.tsx` - Filtering interface with multiple filter options
- `review-card.tsx` - Individual review display with approval controls
- `property-stats.tsx` - Summary statistics dashboard
- `property-card.tsx` - Property overview cards with performance indicators

**Public Components** (`/components/public/`)
- `property-hero.tsx` - Hero section for property pages
- `review-display.tsx` - Public review display grid
- `property-amenities.tsx` - Amenities showcase section

### 3. State Management
- React hooks (useState, useEffect) for component-level state
- LocalStorage for persistent approval states
- No external state management library required for this scope

### 4. Routing Structure
```
/                       → Redirects to /properties
/properties             → Public property listing page
/properties/[id]        → Individual property page with approved reviews
/dashboard              → Manager dashboard with review management
/api/reviews/hostaway   → Reviews API endpoint with filtering
/api/listings           → Listings API endpoint with aggregated stats
```

## Key Features

### Manager Dashboard (`/dashboard`)

1. **Overview Statistics**
   - Total properties count
   - Average rating across all properties
   - Total reviews count
   - Approved reviews count

2. **Property Performance View**
   - Visual cards showing each property
   - Performance indicators (Top Performer, Needs Attention)
   - Average ratings and review counts
   - Click to filter reviews by property

3. **Review Management**
   - Approve/Unapprove reviews for public display
   - Real-time filtering by:
     - Property/Listing
     - Minimum rating
     - Channel (Airbnb, Booking.com, VRBO)
     - Review type (guest-to-host, host-to-guest)
     - Search text (guest name, review content, property name)
   - Category ratings breakdown
   - Guest information and submission date
   - Channel badges

4. **Dual View Modes**
   - Reviews List View: All reviews with filtering
   - Properties Grid View: Property performance overview

### Public Property Pages (`/properties`)

1. **Property Listing Page**
   - Grid of all properties
   - Average ratings display
   - Approved review counts
   - Click through to individual property pages

2. **Individual Property Page** (`/properties/[id]`)
   - Property hero section with key stats
   - Amenities showcase
   - Approved reviews display in grid format
   - Only shows reviews approved by managers
   - Star ratings visualization
   - Category ratings breakdown
   - Guest names and review dates

### API Routes

#### `GET /api/reviews/hostaway`
Returns normalized review data from Hostaway API (mocked).

**Query Parameters:**
- `listingId` - Filter by property ID
- `minRating` - Minimum rating threshold
- `channel` - Filter by channel (Airbnb, Booking.com, etc.)
- `approvedOnly` - Show only approved reviews

**Response:**
```json
{
  "status": "success",
  "count": 12,
  "data": [
    {
      "id": "review-7453",
      "hostawayReviewId": 7453,
      "listingId": "2b-n1-a-29-shoreditch-heights",
      "listingName": "2B N1 A - 29 Shoreditch Heights",
      "type": "guest-to-host",
      "status": "published",
      "rating": 9,
      "publicReview": "Amazing property...",
      "guestName": "Emma Thompson",
      "channel": "Airbnb",
      "submittedAt": "2024-03-15 14:30:22",
      "approvedForWebsite": false,
      "categories": [
        { "category": "cleanliness", "rating": 10 },
        { "category": "communication", "rating": 9 }
      ],
      "averageCategoryRating": 9.5
    }
  ]
}
```

#### `GET /api/listings`
Returns aggregated listing data with statistics.

**Response:**
```json
{
  "status": "success",
  "count": 3,
  "data": [
    {
      "id": "2b-n1-a-29-shoreditch-heights",
      "hostawayListingId": "2b-n1-a-29-shoreditch-heights",
      "name": "2B N1 A - 29 Shoreditch Heights",
      "totalReviews": 5,
      "approvedReviews": 0,
      "averageRating": 8.8
    }
  ]
}
```

## Mock Data

The system includes 12 mock reviews across 3 properties:
- 2B N1 A - 29 Shoreditch Heights (5 reviews)
- 1B S2 B - Camden Lock View (4 reviews)
- Studio NH1 - Notting Hill Garden Retreat (3 reviews)

Mock data includes:
- Varied ratings (6-10 out of 10)
- Detailed category breakdowns
- Realistic review text
- Different submission dates (2020-2024)
- Guest names

## Google Reviews Integration Research

### Current State

**Available APIs:**
1. **Google Places API (New)** - The current version (legacy API deprecated)
2. **Google Business Profile API** - For business owners managing their reviews

### Integration Capabilities

#### What's Possible:
- Fetch reviews for any business using Place ID
- Access user ratings, review text, author info, and photos
- Get AI-powered review summaries (available in US, UK, India, Japan)
- Filter and sort reviews
- Display reviewer attribution with Google Maps profile links

#### Review Data Available:
- Review text
- Star ratings (1-5 scale)
- Author name and profile photo
- Review date
- Helpful vote counts
- Response from business owner

#### Implementation Steps:
1. **Get a Google Cloud API Key**
   - Create project in Google Cloud Console
   - Enable Places API (New)
   - Generate API key with Places API access

2. **Obtain Place IDs**
   - Each property needs a Google Place ID
   - Use Places API or Place ID Finder tool
   - Store Place IDs with each listing

3. **Fetch Reviews**
   ```javascript
   // Example API call
   const response = await fetch(
     `https://places.googleapis.com/maps/api/place/details/json?place_id=$${placeId}?fields=name,rating,reviews&key=${apiKey}`
   );
   ```

4. **Display Requirements**
   - Must show Google attribution
   - Link to reviewer Google Maps profiles
   - Follow Google's review display policies

### Limitations:
- **Maximum 5 reviews** returned per place (API limitation)
- Reviews are not real-time (cached by Google)
- Cannot filter by date or rating via API
- Must comply with Google's Terms of Service
- Attribution requirements for display

### Cost Considerations:
- Places API (New) uses pay-as-you-go pricing
- Place Details requests charged per field requested
- Review summaries (AI) may have additional costs
- Free tier: $200 monthly credit

### Integration Recommendation:

**Feasibility**: ✅ Feasible with limitations

**Recommended Approach**:
1. Add Place ID field to listings database
2. Create Edge Function to proxy Google Places API calls
3. Cache reviews server-side to minimize API costs
4. Combine Google reviews with Hostaway reviews in unified display
5. Implement fallback for properties without Place IDs
6. Add "Powered by Google" attribution where required

**Implementation Priority**:
- **Phase 1**: Core Hostaway review system (✅ Complete)
- **Phase 2**: Google Places API integration (Recommended next step)
- **Phase 3**: AI review summaries and sentiment analysis

**Code Example** (Future Implementation):
```typescript
// /app/api/reviews/google/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get('placeId');

  if (!placeId) {
    return NextResponse.json({ error: 'Missing placeId parameter' }, { status: 400 });
  }

  const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY!,
        },
      }
    );

  const data = await response.json();
  return NextResponse.json(normalizeGoogleReviews(data.reviews));
}
```

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Testing the System

### Manager Workflow:
1. Navigate to `/dashboard`
2. View property statistics and performance
3. Use filters to find specific reviews
4. Click "Approve" on reviews to make them public
5. Switch to Properties tab to see property performance
6. Click "View Public Site" to see what customers see

### Public User Workflow:
1. Navigate to `/properties`
2. Browse available properties
3. Click on a property to see details
4. View only approved reviews
5. See amenities and ratings

## Future Enhancements

### Recommended Features:
1. **Authentication System**
   - Manager login/logout
   - Role-based access control
   - Secure dashboard access

2. **Database Integration**
   - Move from LocalStorage to Supabase
   - Persistent review approvals
   - Review history tracking

3. **Google Reviews Integration**
   - Implement Places API integration
   - Combine multiple review sources
   - Unified review display

4. **Analytics Dashboard**
   - Review trends over time
   - Sentiment analysis
   - Performance comparisons
   - Export capabilities

5. **Email Notifications**
   - New review alerts
   - Low rating warnings
   - Weekly performance summaries

6. **Bulk Actions**
   - Approve/unapprove multiple reviews
   - Batch export
   - Bulk filtering

7. **Response Management**
   - Reply to reviews
   - Response templates
   - Response tracking

## Design Philosophy

### Manager Dashboard
- **Clean & Professional**: Designed for daily use by property managers
- **Information Dense**: Maximum information with minimal scrolling
- **Action-Oriented**: Quick approve/unapprove workflow
- **Insightful**: Visual indicators for performance (colors, badges)

### Public Pages
- **Trust-Building**: Professional presentation of reviews
- **Scannable**: Grid layout for easy browsing
- **Consistent**: Matches Flex Living brand identity
- **Mobile-Responsive**: Works on all device sizes

### Color Usage
- **#274e4c (Primary)**: Trust, stability, premium feel
- **White**: Clean, modern, professional
- **Yellow (Ratings)**: Universal star rating convention
- **Green (Success)**: Positive performance indicators
- **Red (Warning)**: Properties needing attention

## Performance Considerations

- Server-side API routes for data fetching
- Client-side filtering for instant feedback
- LocalStorage for persistent state
- Optimized component re-renders
- Lazy loading for large review lists (future enhancement)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2017+ JavaScript features
- CSS Grid and Flexbox layouts

## License

This project is proprietary to Flex Living.

---

**Last Updated**: October 2025
**Version**: 1.0.0
