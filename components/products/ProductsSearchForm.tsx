"use client";
import { SearchSchema } from "@/src/schema";
import { toast } from "react-toastify";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation"; // el de next/navigation es para el cliente 

export default function ProductsSearchForm() {
  const router = useRouter();
	const handleSearchActions = (formaData: FormData) => {
		const data = {
			search: formaData.get("search") as string,
		};
		const result = SearchSchema.safeParse(data);
		if (!result.success) {
			result.error.issues.forEach((issue) => {
				toast.error(issue.message, {
					autoClose: 3000,
				});
			});
			return;
		}
    // redirect(`/admin/products?search=${result.data.search}`)
    router.push(`/admin/products/search?search=${result.data.search}`)
	};
	return (
		<form action={handleSearchActions} className="flex items-center">
			<input
				type="text"
				placeholder="Buscar Producto"
				className="p-2 bg-white placeholder-gray-400 w-full"
				name="search"
			/>
			<input
				type="submit"
				value="Buscar"
				className="bg-indigo-600 text-white p-2 uppercase cursor-pointer "
			/>
		</form>
	);
}
