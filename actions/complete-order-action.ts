"use server";
import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";
import { revalidatePath } from "next/cache";
export async function completeOrder(formData: FormData) {
	// const orderId = formaData.get('orderId')!
	//? Como arriba se le paso el ! no es necesario el if
	// if(!orderId) {
	//   console.error('No se pudo actualizar el pedido');
	//   return
	// }

	//? También se puede con un schema de zod
	const data = {
		orderId: formData.get("orderId"),
	};
	const result = OrderIdSchema.safeParse(data);
	if (!result.success) {
		console.error("No se pudo actualizar el pedido");
		return;
	}

	try {
		await prisma.order.update({
			where: {
				// id: +orderId
				id: result.data.orderId,
			},
			data: {
				status: true,
				orderReadyAt: new Date(Date.now()),
			},
		});
		revalidatePath("/admin/orders");
	} catch (error) {
		console.log(error);
	}
}
