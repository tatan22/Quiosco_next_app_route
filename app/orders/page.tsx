"use client";
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import LatestOrderItems from "@/components/order/LatestOrderItems";

export default function OrdersPage() {
	const url = "/orders/api";
	const fetcher = () =>
		fetch(url)
			.then((res) => res.json())
			.then((data) => data);
	const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
		refreshInterval: 60000,
		revalidateIfStale: false, 
	});
	if (isLoading) return <p className="text-center mt-20">Cargando...</p>;

	return (
			<>
				<h1 className="text-center mt-20 text-6xl font-black">
					Ordenes Listas{" "}
				</h1>
				<Logo />
        {(data && data.length) ? (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
              {data.map((order) => (
                <LatestOrderItems key={order.id} order={order} />
              ))}
            </div>
          </div>
        ):<p className="text-center mt-10">No hay ordenes pendientes</p>}
			</>
		);
}
