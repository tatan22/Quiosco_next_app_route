import { PrismaClient } from "@prisma/client";
import { categories } from "./data/categories";
import { products } from "./data/products";

// Prisma client cuneta con todos los métodos para interactuar con la base de datos
const prisma = new PrismaClient();

async function main() {
	try {
		await prisma.category.createMany({ data: categories });//createMany crea un multiple registro 
		await prisma.product.createMany({ data: products });
	} catch (error) {
    console.error(error);
  }
}

// Debemos controla la conexión de la base de datos
main()
  .then(async () => {
    await prisma.$disconnect();// Si todo sale bien cerramos la base de datos
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();// Si algo sale mal cerramos la base de datos
    process.exit(1);// Siempre que hay un error en la base de datos se sale
  });
