"use client";

import { Product } from "@prisma/client";
import { useStore } from '../../store';

type AddProductButtonProps = {
  product: Product
}

export const AddProductButton = ({ product }: AddProductButtonProps) => {
// export const AddProductButton = ({ product }: { product: Product }) => {
const addToOrder = useStore((state) => state.addToOrder);
	return (
		<button type="button" className="bg-indigo-800 hover:bg-indigo-500 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer shadow-2xl" onClick={() => addToOrder(product)}>
			Agregar
		</button>
	);
};
