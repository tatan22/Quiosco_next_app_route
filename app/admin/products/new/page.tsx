import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";

export default function CreateProductsPages() {
	return (
		<>
			<Heading>Nuevo Producto</Heading>
			{/* Como toma el children lleva apertura y cierre */}
			<GoBackButton />
			<AddProductForm >
				<ProductForm />
			</AddProductForm>
		</>
	);
}
