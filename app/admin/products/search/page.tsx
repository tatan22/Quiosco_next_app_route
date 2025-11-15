import ProductsSearchForm from "@/components/products/ProductsSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
	const products = await prisma.product.findMany({
		where: {
			name: {
				contains: searchTerm, //contains es un filtro de búsqueda (existen: startsWith, endsWith, contains, not,...)
				mode: "insensitive", // Ignorar mayúsculas
			},
		},
		include: {
			category: true,
		},
	});

	return products;
}

export default async function page({
	searchParams,
}: {
	searchParams: { search: string };
}) {
	const search = searchParams.search;

	const products = await searchProducts(search);

	return (
		<>
			<Heading>Resultados de la búsqueda: {searchParams.search}</Heading>

			<div className="flex flex-col lg:flex-row lg:justify-end gap-5 justify-between">
				<ProductsSearchForm />
			</div>

      {products.length ? (
        <ProductTable products={products} />
      ): <p className="text-center text-lg mt-10">No se encontraron productos</p> }

			
		</>
	);
}
