import { NextResponse } from 'next/server';
import { mockHostawayReviews } from '@/lib/mock-data';
import { NormalizedReview, HostawayReviewResponse } from '@/lib/types';

function normalizeReviews(hostawayReviews: HostawayReviewResponse[]): NormalizedReview[] {
  return hostawayReviews.map((review) => {
    const averageCategoryRating = review.reviewCategory.length > 0
      ? review.reviewCategory.reduce((sum, cat) => sum + cat.rating, 0) / review.reviewCategory.length
      : null;

    const listingId = review.listingName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    return {
      id: `review-${review.id}`,
      hostawayReviewId: review.id,
      listingId,
      listingName: review.listingName,
      type: review.type,
      status: review.status,
      rating: review.rating,
      publicReview: review.publicReview,
      guestName: review.guestName,
      channel: 'Airbnb',
      submittedAt: review.submittedAt,
      approvedForWebsite: false,
      categories: review.reviewCategory,
      averageCategoryRating: averageCategoryRating || undefined,
    };
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const listingId = searchParams.get('listingId');
  const minRating = searchParams.get('minRating');
  const channel = searchParams.get('channel');
  const approvedOnly = searchParams.get('approvedOnly') === 'true';

  let reviews = normalizeReviews(mockHostawayReviews);

  if (listingId) {
    reviews = reviews.filter(r => r.listingId === listingId);
  }

  if (minRating) {
    const minRatingNum = parseInt(minRating, 10);
    reviews = reviews.filter(r => {
      const ratingToCheck = r.rating || r.averageCategoryRating || 0;
      return ratingToCheck >= minRatingNum;
    });
  }

  if (channel) {
    reviews = reviews.filter(r => r.channel === channel);
  }

  if (approvedOnly) {
    reviews = reviews.filter(r => r.approvedForWebsite);
  }

  reviews.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  return NextResponse.json({
    status: 'success',
    count: reviews.length,
    data: reviews,
  });
}
