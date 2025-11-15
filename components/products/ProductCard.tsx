import { formatCurrency, getImagePath } from "@/src/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import { AddProductButton } from "./AddProductButton";

type ProductCardProps = {
	product: Product;
};
export const ProductCard = ({ product }: ProductCardProps) => {
	const imagePath = getImagePath(product.image);
	return (
		<div className="border-gray-400 bg-white ">
			<div className="relative w-full ">
				<Image
					className="object-cover"
					src={imagePath}
					width={400}
					height={500}
					alt={`Imagen platillo ${product.name}`}
					quality={75}
				/>
			</div>
			<div className="p-5">
				<h3
					className="text-2xl font-bold line-clamp-2 leading-[1.2] h-[3.6rem] overflow-hidden">
					{product.name}
				</h3>
				<p className="mt-5 font-black text-4xl text-amber-500">
					{formatCurrency(product.price)}
				</p>
				<AddProductButton product={product} />
			</div>
		</div>
	);
};
