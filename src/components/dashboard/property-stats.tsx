'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Listing } from '@/lib/types';
import { Building2, Star, MessageSquare, CircleCheck as CheckCircle2 } from 'lucide-react';

interface PropertyStatsProps {
  listings: Listing[];
  totalReviews: number;
  approvedReviews: number;
}

export function PropertyStats({ listings, totalReviews, approvedReviews }: PropertyStatsProps) {
  const avgRating =
    listings.length > 0
      ? listings.reduce((sum, l) => sum + (l.averageRating || 0), 0) / listings.length
      : 0;

  const stats = [
    {
      label: 'Total Properties',
      value: listings.length,
      icon: Building2,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Average Rating',
      value: avgRating.toFixed(1),
      icon: Star,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
    {
      label: 'Total Reviews',
      value: totalReviews,
      icon: MessageSquare,
      color: 'text-[#274e4c]',
      bg: 'bg-green-50',
    },
    {
      label: 'Approved Reviews',
      value: approvedReviews,
      icon: CheckCircle2,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <Card key={idx}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-[#274e4c]">{stat.value}</p>
              </div>
              <div className={`${stat.bg} p-3 rounded-full`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
