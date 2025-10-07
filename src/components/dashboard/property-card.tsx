'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Listing } from '@/lib/types';
import { MapPin, Star, MessageSquare, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  listing: Listing;
  onClick?: () => void;
}

export function PropertyCard({ listing, onClick }: PropertyCardProps) {
  const ratingColor =
    (listing.averageRating || 0) >= 9
      ? 'text-green-600'
      : (listing.averageRating || 0) >= 7
      ? 'text-yellow-600'
      : 'text-red-600';

  const TrendIcon =
    (listing.averageRating || 0) >= 9
      ? TrendingUp
      : (listing.averageRating || 0) >= 7
      ? Minus
      : TrendingDown;

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-lg text-[#274e4c] line-clamp-2">
              {listing.name}
            </h3>
            {listing.address && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-xs">{listing.address}</span>
              </div>
            )}
          </div>
          <TrendIcon className={`w-5 h-5 ${ratingColor}`} />
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className={`text-lg font-bold ${ratingColor}`}>
                {(listing.averageRating || 0).toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-gray-600">Avg Rating</p>
          </div>

          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1">
              <MessageSquare className="w-4 h-4 text-[#274e4c]" />
              <span className="text-lg font-bold text-[#274e4c]">
                {listing.totalReviews || 0}
              </span>
            </div>
            <p className="text-xs text-gray-600">Reviews</p>
          </div>

          <div className="text-center space-y-1">
            <span className="text-lg font-bold text-green-600">
              {listing.approvedReviews || 0}
            </span>
            <p className="text-xs text-gray-600">Approved</p>
          </div>
        </div>

        {(listing.averageRating || 0) >= 9 && (
          <div className="pt-2">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Top Performer
            </Badge>
          </div>
        )}
        {(listing.averageRating || 0) < 7 && (
          <div className="pt-2">
            <Badge variant="destructive">Needs Attention</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
