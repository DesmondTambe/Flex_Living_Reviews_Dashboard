'use client';

import { Wifi, Tv, Coffee, Utensils, Wind, Waves } from 'lucide-react';

export function PropertyAmenities() {
  const amenities = [
    { icon: Wifi, label: 'High-Speed WiFi' },
    { icon: Tv, label: 'Smart TV' },
    { icon: Coffee, label: 'Coffee Maker' },
    { icon: Utensils, label: 'Fully Equipped Kitchen' },
    { icon: Wind, label: 'Air Conditioning' },
    { icon: Waves, label: 'Premium Linens' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#274e4c] mb-8 text-center">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
          {amenities.map((amenity, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#274e4c]/10 flex items-center justify-center">
                <amenity.icon className="w-8 h-8 text-[#274e4c]" />
              </div>
              <span className="text-sm font-medium text-gray-700">{amenity.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
