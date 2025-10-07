"use client";

import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterOptions, Listing } from "@/lib/types";
import { Filter, X } from "lucide-react";

interface FilterSidebarProps {
	listings: Listing[];
	filters: FilterOptions;
	onFilterChange: (filters: FilterOptions) => void;
	onClearFilters: () => void;
	className?: string | undefined;
	isOpen?: boolean;
	onClose?: () => void;
}

export function FilterSidebar({
	listings,
	filters,
	onFilterChange,
	onClearFilters,
	className,
	isOpen = true,
	onClose,
}: FilterSidebarProps) {
	const hasActiveFilters = Object.keys(filters).some(
		(key) => filters[key as keyof FilterOptions]
	);

	return (
		<div
			className={`
      bg-white border-r border-gray-200 p-6 space-y-6
      w-full lg:w-80
      fixed bottom-0 left-0 right-0 lg:relative lg:top-0
      transition-transform duration-300 ease-in-out
      lg:h-screen
      z-30
      ${isOpen ? "translate-y-0" : "translate-y-full"} 
      lg:translate-y-0
      ${className}
    `}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Filter className="w-5 h-5 text-[#274e4c]" />
					<h2 className="text-lg font-semibold text-[#274e4c]">Filters</h2>
				</div>
				{hasActiveFilters && (
					<Button
						variant="ghost"
						size="sm"
						onClick={onClearFilters}
						className="h-8 text-xs hidden lg:flex"
					>
						<X className="w-4 h-4 mr-1" />
						Clear
					</Button>
				)}
				{onClose && (
					<Button
						variant="ghost"
						size="sm"
						onClick={onClose}
						className="h-8 text-xs lg:hidden"
					>
						<X className="w-4 h-4" />
					</Button>
				)}
			</div>

			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="listing">Property</Label>
					<Select
						value={filters.listingId || "all"}
						onValueChange={(value) =>
							onFilterChange({
								...filters,
								listingId: value === "all" ? undefined : value,
							})
						}
					>
						<SelectTrigger id="listing">
							<SelectValue placeholder="All Properties" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Properties</SelectItem>
							{listings.map((listing) => (
								<SelectItem key={listing.id} value={listing.id}>
									{listing.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="minRating">Minimum Rating</Label>
					<Select
						value={filters.minRating?.toString() || "all"}
						onValueChange={(value) =>
							onFilterChange({
								...filters,
								minRating: value === "all" ? undefined : parseInt(value),
							})
						}
					>
						<SelectTrigger id="minRating">
							<SelectValue placeholder="Any Rating" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Any Rating</SelectItem>
							<SelectItem value="9">9+ Stars</SelectItem>
							<SelectItem value="8">8+ Stars</SelectItem>
							<SelectItem value="7">7+ Stars</SelectItem>
							<SelectItem value="6">6+ Stars</SelectItem>
							<SelectItem value="5">5+ Stars</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="channel">Channel</Label>
					<Select
						value={filters.channel || "all"}
						onValueChange={(value) =>
							onFilterChange({
								...filters,
								channel: value === "all" ? undefined : value,
							})
						}
					>
						<SelectTrigger id="channel">
							<SelectValue placeholder="All Channels" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Channels</SelectItem>
							<SelectItem value="Airbnb">Airbnb</SelectItem>
							<SelectItem value="Booking.com">Booking.com</SelectItem>
							<SelectItem value="VRBO">VRBO</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="type">Review Type</Label>
					<Select
						value={filters.type || "all"}
						onValueChange={(value) =>
							onFilterChange({
								...filters,
								type: value === "all" ? undefined : value,
							})
						}
					>
						<SelectTrigger id="type">
							<SelectValue placeholder="All Types" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Types</SelectItem>
							<SelectItem value="guest-to-host">Guest to Host</SelectItem>
							<SelectItem value="host-to-guest">Host to Guest</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="search">Search Reviews</Label>
					<Input
						id="search"
						type="text"
						placeholder="Search by guest name or review text..."
						value={filters.searchQuery || ""}
						onChange={(e) =>
							onFilterChange({
								...filters,
								searchQuery: e.target.value || undefined,
							})
						}
					/>
				</div>

				{/* Mobile action buttons */}
				<div className="flex gap-3 mt-2 lg:hidden">
					<Button
						variant="outline"
						className="flex-1"
						onClick={onClearFilters}
						disabled={!hasActiveFilters}
					>
						Clear
					</Button>
					<Button variant="default" className="flex-1" onClick={onClose}>
						Done
					</Button>
				</div>
			</div>
		</div>
	);
}
