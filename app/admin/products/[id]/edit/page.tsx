import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import Heading from "../../../../../components/ui/Heading";
import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";

async function getProducts(id: number) {
	// findUnique busca un único registro
	const product = await prisma.product.findUnique({
		where: {
			id,
		},
	});
	return product;
}
export default async function EditProductsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params; //-- 👈 aquí está la magia
	const product = await getProducts(parseInt(id));
	if (!product) {
		// redirect('/404')
		notFound();
	}
	return (
		<>
			<Heading>
				Editar Producto: <span className="font-bold">{product.name}</span>
			</Heading>
			<GoBackButton />
			<EditProductForm>
				<ProductForm product={product} />
			</EditProductForm>
		</>
	);
}
