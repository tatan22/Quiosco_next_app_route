"use client";
import { createProduct } from "@/actions/create-product-action";
import { ProductSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function AddProductForm({
	children,
}: {
	children: React.ReactNode;
}) {
	const handleSubmit = async (formData: FormData) => {
		// "use server";
		const data = {
			name: formData.get("name") as string,
			price: formData.get("price") as string,
			categoryId: formData.get("categoryId") as string,
			image: formData.get("image") as string,
		};
		const result = ProductSchema.safeParse(data);
		if (!result.success) {
			result.error.issues.forEach((issue) => {
				toast.error(issue.message, {
					autoClose: 3000,
				});
			});
			return;
		}
		const response = await createProduct(result.data);
		if (response?.errors) {
			response.errors.forEach((error) => {
				toast.error(error.message, {
					autoClose: 3000,
				});
			});
		}

		toast.success("Producto creado con éxito", {
			autoClose: 3000,
		});
	};
	return (
		<div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
			<form className="space-y-5" action={handleSubmit}>
				{/* <ProductForm /> */}
				{/* Implementando composición  */}
				{children}
				<input
					type="submit"
					className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer shadow-2xl"
					value="Registrar Producto"
				/>
			</form>
		</div>
	);
}
