"use client";

import { useEffect, useState } from "react";
import { Listing, NormalizedReview } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Chrome as Home,
	Star,
	MessageSquare,
	Settings,
	MapPin,
} from "lucide-react";
import Link from "next/link";

export default function PropertiesPage() {
	const [listings, setListings] = useState<Listing[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchListings();
	}, []);

	const fetchListings = async () => {
		try {
			const response = await fetch("/api/listings");
			const data = await response.json();

			const loadedApprovals = localStorage.getItem("reviewApprovals");
			const approvals = loadedApprovals ? JSON.parse(loadedApprovals) : {};

			const reviewsResponse = await fetch("/api/reviews/hostaway");
			const reviewsData = await reviewsResponse.json();

			const listingsWithApprovedCounts = data.data.map((listing: Listing) => {
				const listingReviews = reviewsData.data.filter(
					(r: NormalizedReview) => r.listingId === listing.id
				);
				const approvedCount = listingReviews.filter(
					(r: NormalizedReview) => approvals[r.id]
				).length;

				return {
					...listing,
					approvedReviews: approvedCount,
				};
			});

			setListings(listingsWithApprovedCounts);
		} catch (error) {
			console.error("Error fetching listings:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#274e4c] mx-auto mb-4"></div>
					<p className="text-gray-600">Loading properties...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-gradient-to-br from-[#274e4c] to-[#1a3a38] text-white">
				<div className="container mx-auto px-6 py-12">
					<div className="flex items-center justify-between">
						<div>
							<div className="flex items-center gap-2 mb-3">
								<Home className="w-8 h-8" />
								<span className="text-sm font-medium opacity-90">
									Flex Living
								</span>
							</div>
							<h1 className="text-4xl font-bold mb-3">Our Properties</h1>
							<p className="text-lg opacity-90 max-w-2xl">
								Discover our premium short-term rental properties across London
							</p>
						</div>
						<Link href="/dashboard">
							<Button variant='secondary'>
								<Settings className="w-4 h-4 mr-2" />
								Manager Access
							</Button>
						</Link>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-6 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{listings.map((listing) => (
						<Link key={listing.id} href={`/properties/${listing.id}`}>
							<Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer h-full">
								<div className="h-48 bg-gradient-to-br from-[#274e4c] to-[#1a3a38] relative">
									<div className="absolute inset-0 flex items-center justify-center">
										<Home className="w-16 h-16 text-white/20" />
									</div>
								</div>
								<CardContent className="p-6 space-y-4">
									<div>
										<h3 className="font-semibold text-lg text-[#274e4c] mb-2 line-clamp-2">
											{listing.name}
										</h3>
										{listing.address && (
											<div className="flex items-center gap-1 text-sm text-gray-600">
												<MapPin className="w-4 h-4" />
												<span>{listing.address}</span>
											</div>
										)}
									</div>

									<div className="flex items-center justify-between pt-4 border-t">
										<div className="flex items-center gap-2">
											<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
											<span className="font-semibold text-lg">
												{(listing.averageRating || 0).toFixed(1)}
											</span>
										</div>
										<div className="flex items-center gap-2 text-gray-600">
											<MessageSquare className="w-5 h-5" />
											<span className="font-semibold">
												{listing.approvedReviews || 0}
											</span>
											<span className="text-sm">
												{listing.approvedReviews === 1 ? "review" : "reviews"}
											</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</main>
		</div>
	);
}
