'use client';

import { Listing } from '@/lib/types';
import { MapPin, Star, Chrome as Home } from 'lucide-react';

interface PropertyHeroProps {
  listing: Listing;
}

export function PropertyHero({ listing }: PropertyHeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-[#274e4c] to-[#1a3a38] text-white">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <Home className="w-6 h-6" />
            <span className="text-sm font-medium opacity-90">Flex Living Property</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{listing.name}</h1>
          {listing.address && (
            <div className="flex items-center gap-2 text-lg mb-6">
              <MapPin className="w-5 h-5" />
              <span>{listing.address}</span>
            </div>
          )}
          <div className="flex items-center gap-6 pt-6 border-t border-white/20">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold">
                {(listing.averageRating || 0).toFixed(1)}
              </span>
              <span className="text-sm opacity-75">/ 10</span>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div>
              <span className="text-2xl font-bold">{listing.approvedReviews || 0}</span>
              <span className="text-sm opacity-75 ml-2">
                {listing.approvedReviews === 1 ? 'Review' : 'Reviews'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
