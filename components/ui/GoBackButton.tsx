'use client'
import { useRouter } from "next/navigation";
export default function GoBackButton() {
  const router = useRouter();
  return (
				<button
          onClick={()=> router.back()} // Redirección a la pagina anterior
					className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bolt hover:bg-amber-300 cursor-pointer"
				>
					Regresar a productos
				</button>
  )
}