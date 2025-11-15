import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProductsSearchForm from "@/components/products/ProductsSearchForm";

async function productsCount() {
	return await prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
	const skip = (page - 1) * pageSize;
	const products = await prisma.product.findMany({
		take: pageSize,
		skip,
		include: {
			category: true,
		},
	});

	return products;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
	searchParams,
}: {
	searchParams?: Promise<{ page?: string }>;
}) {
	const resolvedSearchParams = await searchParams;
	const rawPage = resolvedSearchParams?.page;
	const page = rawPage ? Number(rawPage) : 1;
	const pageSize = 10;

	if (page < 1) redirect("/admin/products");

	const productsData = getProducts(page, pageSize);
	const totalProductsData = productsCount();
	const [products, totalProducts] = await Promise.all([
		productsData,
		totalProductsData,
	]);
	const totalPages = Math.ceil(totalProducts / pageSize);

	if (page > totalPages && totalPages > 0) {
		redirect("/admin/products");
	}

	return (
		<>
			<Heading>Administrar Productos</Heading>

			<div className="flex flex-col lg:flex-row gap-5 justify-between">
				<Link
					href={`/admin/products/new`}
					className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
				>
					Crear Producto
				</Link>
				<ProductsSearchForm />
			</div>

			<ProductTable products={products} />
			<ProductsPagination page={page} totalPages={totalPages} />
		</>
	);
}
