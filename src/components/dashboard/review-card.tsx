'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NormalizedReview } from '@/lib/types';
import { Star, Calendar, MapPin, Check, X } from 'lucide-react';
import { format } from 'date-fns';

interface ReviewCardProps {
  review: NormalizedReview;
  onToggleApproval: (reviewId: string, approved: boolean) => void;
}

export function ReviewCard({ review, onToggleApproval }: ReviewCardProps) {
  const displayRating = review.rating || review.averageCategoryRating || 0;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-[#274e4c]">{review.guestName}</h3>
              {displayRating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{displayRating.toFixed(1)}</span>
                </div>
              )}
              <Badge variant="outline" className="text-xs">
                {review.channel}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="text-xs">{review.listingName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">
                  {format(new Date(review.submittedAt), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {review.approvedForWebsite ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onToggleApproval(review.id, false)}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-1" />
                Unapprove
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => onToggleApproval(review.id, true)}
                className="bg-[#274e4c] hover:bg-[#1a3a38] text-white"
              >
                <Check className="w-4 h-4 mr-1" />
                Approve
              </Button>
            )}
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">{review.publicReview}</p>

        {review.categories.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t">
            {review.categories.map((category, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="text-gray-600 capitalize">
                  {category.category.replace(/_/g, ' ')}
                </span>
                <span className="font-semibold text-[#274e4c]">{category.rating}/10</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
