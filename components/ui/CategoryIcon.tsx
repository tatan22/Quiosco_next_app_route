"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Category } from "@prisma/client";

type CategoryIconProps = {
	category: Category;
};
export const CategoryIcon = ({ category }: CategoryIconProps) => {
	const params = useParams<{ category: string }>();

	return (
		<div
			className={`${
				category.slug === params.category && "bg-amber-500"
			} flex items-center gap-4 w-full border-t border-gray-200 border p-3`}
		>
			<div className="w-16 h-16 relative">
				<Image
					// width={32}
					// height={32}
					fill
					src={`/icon_${category.slug}.svg`}
					alt={category.name}
					className="w-8 h-8"
				/>
			</div>
			<Link className="text-xl font-bold" href={`/order/${category.slug}`}>
				{category.name}
			</Link>
		</div>
	);
};
// /order/3 ó /order/hamburguesa
