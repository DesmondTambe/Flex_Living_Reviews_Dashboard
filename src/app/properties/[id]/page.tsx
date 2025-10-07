"use client";

import { useEffect, useState } from "react";
import { PropertyHero } from "@/components/public/property-hero";
import { ReviewDisplay } from "@/components/public/review-display";
import { PropertyAmenities } from "@/components/public/property-amenities";
import { Button } from "@/components/ui/button";
import { NormalizedReview, Listing } from "@/lib/types";
import { ArrowLeft, Settings } from "lucide-react";
import Link from "next/link";

export default async function PropertyPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return <PropertyPageClient id={id} />;
}

function PropertyPageClient({ id }: { id: string }) {
	const [listing, setListing] = useState<Listing | null>(null);
	const [reviews, setReviews] = useState<NormalizedReview[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchPropertyData();
	}, [id]);

	const fetchPropertyData = async () => {
		try {
			const listingsResponse = await fetch("/api/listings");
			const listingsData = await listingsResponse.json();
			const foundListing = listingsData.data.find((l: Listing) => l.id === id);

			if (foundListing) {
				setListing(foundListing);
			}

			const loadedApprovals = localStorage.getItem("reviewApprovals");
			const approvals = loadedApprovals ? JSON.parse(loadedApprovals) : {};

			const reviewsResponse = await fetch(
				`/api/reviews/hostaway?listingId=${id}`
			);
			const reviewsData = await reviewsResponse.json();

			const approvedReviews = reviewsData.data
				.map((review: NormalizedReview) => ({
					...review,
					approvedForWebsite: approvals[review.id] || false,
				}))
				.filter((review: NormalizedReview) => review.approvedForWebsite);

			const updatedListing = {
				...foundListing,
				approvedReviews: approvedReviews.length,
			};
			setListing(updatedListing);
			setReviews(approvedReviews);
		} catch (error) {
			console.error("Error fetching property data:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#274e4c] mx-auto mb-4"></div>
					<p className="text-gray-600">Loading property...</p>
				</div>
			</div>
		);
	}

	if (!listing) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-800 mb-4">
						Property Not Found
					</h1>
					<Link href="/properties">
						<Button className="bg-[#274e4c] hover:bg-[#1a3a38]">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back to Properties
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<header className="bg-white border-b border-gray-200 sticky top-0 z-10">
				<div className="container mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<Link href="/properties">
							<Button variant="ghost" className="text-[#274e4c]">
								<ArrowLeft className="w-4 h-4 mr-2" />
								All Properties
							</Button>
						</Link>
						<Link href="/dashboard">
							<Button
								variant="outline"
								className="border-[#274e4c] text-[#274e4c]"
							>
								<Settings className="w-4 h-4 mr-2" />
								Manager Dashboard
							</Button>
						</Link>
					</div>
				</div>
			</header>

			<PropertyHero listing={listing} />
			<PropertyAmenities />
			<ReviewDisplay reviews={reviews} />
		</div>
	);
}
