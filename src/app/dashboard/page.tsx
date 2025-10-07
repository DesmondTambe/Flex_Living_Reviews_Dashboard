"use client";

import { useEffect, useState } from "react";
import { FilterSidebar } from "@/components/dashboard/filter-sidebar";
import { ReviewCard } from "@/components/dashboard/review-card";
import { PropertyStats } from "@/components/dashboard/property-stats";
import { PropertyCard } from "@/components/dashboard/property-card";
import { NormalizedReview, Listing, FilterOptions } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, List, Eye, Menu } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
	const [reviews, setReviews] = useState<NormalizedReview[]>([]);
	const [allReviews, setAllReviews] = useState<NormalizedReview[]>([]);
	const [listings, setListings] = useState<Listing[]>([]);
	const [filters, setFilters] = useState<FilterOptions>({});
	const [loading, setLoading] = useState(true);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleDashboardClick = () => {
		// toggle sidebar only on mobile
		if (window.innerWidth < 768) {
			setIsSidebarOpen(true);
		}
	};

	useEffect(() => {
		const loadedApprovals = localStorage.getItem("reviewApprovals");
		if (loadedApprovals) {
			const approvals = JSON.parse(loadedApprovals);
			fetchReviews(approvals);
		} else {
			fetchReviews({});
		}
		fetchListings();
	}, []);

	const fetchReviews = async (approvals: Record<string, boolean>) => {
		try {
			const response = await fetch("/api/reviews/hostaway");
			const data = await response.json();
			const reviewsWithApprovals = data.data.map(
				(review: NormalizedReview) => ({
					...review,
					approvedForWebsite: approvals[review.id] || false,
				})
			);
			setAllReviews(reviewsWithApprovals);
			setReviews(reviewsWithApprovals);
		} catch (error) {
			console.error("Error fetching reviews:", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchListings = async () => {
		try {
			const response = await fetch("/api/listings");
			const data = await response.json();
			setListings(data.data);
		} catch (error) {
			console.error("Error fetching listings:", error);
		}
	};

	useEffect(() => {
		let filtered = [...allReviews];

		if (filters.listingId) {
			filtered = filtered.filter((r) => r.listingId === filters.listingId);
		}

		if (filters.minRating) {
			filtered = filtered.filter((r) => {
				const rating = r.rating || r.averageCategoryRating || 0;
				return rating >= filters.minRating!;
			});
		}

		if (filters.channel) {
			filtered = filtered.filter((r) => r.channel === filters.channel);
		}

		if (filters.type) {
			filtered = filtered.filter((r) => r.type === filters.type);
		}

		if (filters.searchQuery) {
			const query = filters.searchQuery.toLowerCase();
			filtered = filtered.filter(
				(r) =>
					r.guestName.toLowerCase().includes(query) ||
					r.publicReview.toLowerCase().includes(query) ||
					r.listingName.toLowerCase().includes(query)
			);
		}

		setReviews(filtered);
	}, [filters, allReviews]);

	const handleToggleApproval = (reviewId: string, approved: boolean) => {
		const updatedReviews = allReviews.map((review) =>
			review.id === reviewId
				? { ...review, approvedForWebsite: approved }
				: review
		);
		setAllReviews(updatedReviews);

		const approvals: Record<string, boolean> = {};
		updatedReviews.forEach((review) => {
			if (review.approvedForWebsite) {
				approvals[review.id] = true;
			}
		});
		localStorage.setItem("reviewApprovals", JSON.stringify(approvals));
	};

	const handleClearFilters = () => {
		setFilters({});
	};

	const handlePropertyClick = (listingId: string) => {
		setFilters({ ...filters, listingId });
	};

	const updatedListings = listings.map((listing) => {
		const listingReviews = allReviews.filter((r) => r.listingId === listing.id);
		const approvedCount = listingReviews.filter(
			(r) => r.approvedForWebsite
		).length;
		const avgRating =
			listingReviews.length > 0
				? listingReviews.reduce((sum, r) => {
						const rating = r.rating || r.averageCategoryRating || 0;
						return sum + rating;
				  }, 0) / listingReviews.length
				: 0;

		return {
			...listing,
			totalReviews: listingReviews.length,
			approvedReviews: approvedCount,
			averageRating: avgRating,
		};
	});

	const totalApproved = allReviews.filter((r) => r.approvedForWebsite).length;

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#274e4c] mx-auto mb-4"></div>
					<p className="text-gray-600">Loading dashboard...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white border-b border-gray-200 sticky top-0 z-10">
				<div className="container mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Menu
								className="w-8 h-8 text-[#274e4c] cursor-pointer lg:hidden"
								onClick={handleDashboardClick}
							/>
							<div>
								<h1 className="text-2xl font-bold text-[#274e4c]">
									Flex Living
								</h1>
								<p className="text-sm text-gray-600">Reviews Dashboard</p>
							</div>
						</div>
						<Link href="/properties">
							<Button className="bg-[#274e4c] hover:bg-[#1a3a38]">
								<Eye className="w-4 h-4 mr-2" />
								View Public Site
							</Button>
						</Link>
					</div>
				</div>
			</header>

			<div className="flex flex-1 h-[calc(100vh-64px)]">
				{/* Sidebar */}
				<FilterSidebar
					listings={updatedListings}
					filters={filters}
					onFilterChange={setFilters}
					onClearFilters={handleClearFilters}
					isOpen={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
					className={`
            ${isSidebarOpen ? "fixed inset-0 z-20" : "hidden"}
            lg:relative lg:block lg:w-80
            bg-white border-r border-gray-200
          `}
				/>

				<main className="flex-1 p-6 space-y-6 overflow-auto h-full">
					<PropertyStats
						listings={updatedListings}
						totalReviews={allReviews.length}
						approvedReviews={totalApproved}
					/>

					<Tabs defaultValue="reviews" className="w-full">
						<TabsList>
							<TabsTrigger value="reviews">
								<List className="w-4 h-4 mr-2" />
								All Reviews ({reviews.length})
							</TabsTrigger>
							<TabsTrigger value="properties">
								<LayoutDashboard className="w-4 h-4 mr-2" />
								Properties ({updatedListings.length})
							</TabsTrigger>
						</TabsList>

						<TabsContent value="reviews" className="space-y-4 mt-6">
							{reviews.length === 0 ? (
								<div className="text-center py-12 bg-white rounded-lg border border-gray-200">
									<p className="text-gray-600">
										No reviews found matching your filters.
									</p>
								</div>
							) : (
								reviews.map((review) => (
									<ReviewCard
										key={review.id}
										review={review}
										onToggleApproval={handleToggleApproval}
									/>
								))
							)}
						</TabsContent>

						<TabsContent value="properties" className="mt-6">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{updatedListings.map((listing) => (
									<PropertyCard
										key={listing.id}
										listing={listing}
										onClick={() => handlePropertyClick(listing.id)}
									/>
								))}
							</div>
						</TabsContent>
					</Tabs>
				</main>
			</div>
		</div>
	);
}
