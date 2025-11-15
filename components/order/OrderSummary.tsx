"use client";
import { useMemo } from "react";
import { useStore } from "@/store";
import { ProductDetails } from "./ProductDetails";
import { formatCurrency } from "@/src/utils";
import { createOrderAction } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function OrderSummary() {
	const order = useStore((state) => state.order)
	const clearOrder = useStore((state) => state.clearOrder)
	const total = useMemo(() =>order.reduce((total, item) => total + (item.price * item.quantity), 0 ), [order]);

	const handleCreateOrder = async (formaData: FormData) => {
		const data = {
			name: formaData.get('name') as string,
			total,
			order,
		}
		const result = OrderSchema.safeParse(data);
		if(!result.success){
			result.error.issues.forEach((issue) => {
				toast.error(issue.message, {
					autoClose: 3000
				});
			})
			return //Si no pasa la validación se sale y no se crea el pedido
		}
		const response = await createOrderAction(data);
		if(response?.errors){
			response.errors.forEach((error) => {
				toast.error(error.message, {
					autoClose: 3000
				});
			})
			
		}
		toast.success("Pedido creado con éxito", {
			autoClose: 3000
		})
		clearOrder();
	};

	return (
		<aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
			<h1 className="text-4xl text-center font-black">Mi Pedido</h1>

			{order.length === 0 ? (
				<p className="text-2xl text-center font-bold my-10">El pedido esta Vació</p>
			) : (
				<div className="mt-5">
					{order.map((item) => (
						<ProductDetails key={item.id} item={item} />
					))}
					<p className="text-2xl mt-20 text-center">
						Total a pagar:{" "}
						<span className="font-bold">{formatCurrency(total)}</span>
					</p>

					<form action={handleCreateOrder} className="w-full mt-10 space-y-5">
						<input type="text" placeholder="Tu Nombre" className="bg-white border border-gray-100 p-2 w-full" name="name" id="name" />
						<input type="submit" className="py-2 rounded uppercase text-white font-bold bg-black w-full text-center cursor-pointer" id="submit" value="Confirmar Pedido" />
					</form>

				</div>
			)}
		</aside>
	);
}
