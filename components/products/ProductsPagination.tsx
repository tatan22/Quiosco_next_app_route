import Link from "next/link";

type ProductsWithCategory = {
	page: number;
	totalPages: number;
};

export default function ProductsPagination({
	page,
	totalPages,
}: ProductsWithCategory) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
	return (
		<nav className="flex justify-center py-10 gap-2">
			{page > 1 && (
				<Link
					href={`/admin/products?page=${page - 1}`}
					className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
				>
					&laquo; Anterior
				</Link>
			)}

      {pages.map(currentPage=> (
        <Link
          key={currentPage}
          href={`/admin/products?page=${currentPage}`}
          className={`${currentPage === page ? "text-amber-500 font-black" :  "text-gray-900" } bg-white px-4 py-2 text-sm ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
        >
          {currentPage}
        </Link>
      ))}
			{page < totalPages && (
				<Link 
          href={`/admin/products?page=${page + 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
          >
					Siguiente &raquo;{" "}
				</Link>
			)}
		</nav>
	);
}
