// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
//⬆ las importaciones de arriba ya no son necesarias por que usamos el hook usePrismaClient

import { prisma } from "@/src/lib/prisma";
import { CategoryIcon } from "../ui/CategoryIcon";
import Logo from "../ui/Logo";
async function getCategories() {
	return await prisma.category.findMany(); // findMany devuelve un array con todos los registros
}

export default async function OrderSidebar() {
	const categories = await getCategories();
	return (
		<aside className="md:w-72 md:h-screen bg-white">
			<Logo />
			<nav className="mt-10">
				{categories.map((category) => (
					<CategoryIcon key={category.id} category={category} />
				))}
			</nav>
		</aside>
	);
}
