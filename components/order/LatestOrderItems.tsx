import { OrderWithProducts } from "@/src/types";

type LatestOrderItemsProps = { order: OrderWithProducts };
export default function LatestOrderItems({ order }: LatestOrderItemsProps) {
  return (
    <div className="bg-white p-5 space-y-5 rounded-lg">
      <p className="text-2xl text-slate-600">
        Cliente: <span className="font-black">{order.name}</span>
      </p>
      <ul role="list" className="divide-y divide-gray-200 border-t corder-gray-200 text-sm fond-medium text-gray-500">
        {order.orderProducts.map((product) => (
          <li
            key={product.id}
            className="flex py-6 text-lg"
            >
              <p> <span className="font-bold">( {product.quantity} )</span> x {product.product.name}</p>

          </li>
        ))}
      </ul>
    </div>
  )
}