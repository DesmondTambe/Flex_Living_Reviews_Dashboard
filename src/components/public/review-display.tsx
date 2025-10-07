'use client';

import { NormalizedReview } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { format } from 'date-fns';

interface ReviewDisplayProps {
  reviews: NormalizedReview[];
}

export function ReviewDisplay({ reviews }: ReviewDisplayProps) {
  if (reviews.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center py-12">
            <p className="text-gray-600">No reviews available yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#274e4c] mb-3">Guest Reviews</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read what our guests have to say about their experience at this property
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {reviews.map((review) => {
            const displayRating = review.rating || review.averageCategoryRating || 0;
            return (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {displayRating > 0 && (
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.round(displayRating / 2)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                        <span className="text-sm font-semibold text-[#274e4c]">
                          {displayRating.toFixed(1)}/10
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900">{review.guestName}</h3>
                      <p className="text-xs text-gray-500">
                        {format(new Date(review.submittedAt), 'MMMM yyyy')}
                      </p>
                    </div>
                    <Quote className="w-8 h-8 text-[#274e4c]/20" />
                  </div>

                  <p className="text-gray-700 leading-relaxed line-clamp-4">
                    {review.publicReview}
                  </p>

                  {review.categories.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
                      {review.categories.slice(0, 4).map((category, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-gray-600 capitalize">
                            {category.category.replace(/_/g, ' ').substring(0, 12)}
                          </span>
                          <span className="font-semibold text-[#274e4c]">
                            {category.rating}/10
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
