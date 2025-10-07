import { NextResponse } from 'next/server';
import { mockHostawayReviews } from '@/lib/mock-data';
import { Listing } from '@/lib/types';

export async function GET() {
  const listingsMap = new Map<string, Listing>();

  mockHostawayReviews.forEach((review) => {
    const listingId = review.listingName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    if (!listingsMap.has(listingId)) {
      listingsMap.set(listingId, {
        id: listingId,
        hostawayListingId: listingId,
        name: review.listingName,
        totalReviews: 0,
        approvedReviews: 0,
        averageRating: 0,
      });
    }

    const listing = listingsMap.get(listingId)!;
    listing.totalReviews = (listing.totalReviews || 0) + 1;

    const rating = review.rating || (review.reviewCategory.length > 0
      ? review.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0) / review.reviewCategory.length
      : 0);

    listing.averageRating = ((listing.averageRating || 0) * ((listing.totalReviews || 1) - 1) + rating) / (listing.totalReviews || 1);
  });

  const listings = Array.from(listingsMap.values()).sort((a, b) =>
    (b.totalReviews || 0) - (a.totalReviews || 0)
  );

  return NextResponse.json({
    status: 'success',
    count: listings.length,
    data: listings,
  });
}
