export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface HostawayReviewResponse {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory: ReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
}

export interface NormalizedReview {
  id: string;
  hostawayReviewId: number;
  listingId: string;
  listingName: string;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string;
  guestName: string;
  channel: string;
  submittedAt: string;
  approvedForWebsite: boolean;
  categories: ReviewCategory[];
  averageCategoryRating?: number;
}

export interface Listing {
  id: string;
  hostawayListingId: string;
  name: string;
  address?: string;
  averageRating?: number;
  totalReviews?: number;
  approvedReviews?: number;
}

export interface FilterOptions {
  listingId?: string;
  minRating?: number;
  maxRating?: number;
  channel?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  approvedOnly?: boolean;
  searchQuery?: string;
}
