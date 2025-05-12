// React
import { Suspense } from 'react';

// Entities
import { Order } from '@repo/api/order/entities/order.entity';

// Enums
import { OrderStatus } from '@repo/api/order/enum/order-status.enum';


async function fetchOrders(): Promise<Order[]> {
  const res = await fetch('http://localhost:3000/orders', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

const showLocalDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const StatusBadge = ({ status }: { status: string }) => {
  let badgeTheme: string;

  switch (status) {
    case OrderStatus.PENDING:
      badgeTheme = "inline-block rounded-full bg-purple-100 px-2 py-1 text-xs leading-4 font-semibold whitespace-nowrap text-purple-800"
      break;
    case OrderStatus.PROCESSING:
      badgeTheme = "inline-block rounded-full bg-blue-100 px-2 py-1 text-xs leading-4 font-semibold whitespace-nowrap text-blue-800"
      break;
    case OrderStatus.SHIPPED:
      badgeTheme = "inline-block rounded-full bg-orange-100 px-2 py-1 text-xs leading-4 font-semibold whitespace-nowrap text-orange-800"
      break
    case OrderStatus.DELIVERED:
      badgeTheme = "inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs leading-4 font-semibold whitespace-nowrap text-emerald-800"
      break;
    case OrderStatus.CANCELLED:
      badgeTheme = "inline-block rounded-full bg-rose-100 px-2 py-1 text-xs leading-4 font-semibold whitespace-nowrap text-rose-800"
      break;
    default:
      badgeTheme = "inline-block rounded-full bg-purple-100 px-2 py-1 text-xs leading-4 font-semibold whitespace-nowrap text-purple-800"
  }

  return (
    <div className={badgeTheme}>
      {status}
    </div>
  )
}

async function OrdersList() {
  const orders = await fetchOrders();

  return (
    <div
      className="flex flex-col rounded-lg border border-neutral-200 bg-white sm:col-span-2 lg:col-span-4"
    >
      <div
        className="flex flex-col items-center justify-between gap-4 border-b border-neutral-100 p-5 text-center sm:flex-row sm:text-start"
      >
        <div>
          <h1 className="mb-0.5 font-semibold">OrderMeister</h1>
          <h2 className="text-sm font-medium text-neutral-600">
            The orders of Westeros.
          </h2>
        </div>
        <div>
          <button

            className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm leading-5 font-semibold text-neutral-800 hover:border-neutral-300 hover:text-neutral-950 active:border-neutral-200 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Order
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="min-w-full overflow-x-auto rounded-sm">
          <table className="min-w-full align-middle text-sm">
            <thead>
              <tr className="border-b-2 border-neutral-100">
                <th
                  className="min-w-[140px] px-3 py-2 text-start text-sm font-semibold tracking-wider text-neutral-700 uppercase"
                >
                  ID
                </th>
                <th
                  className="min-w-[180px] px-3 py-2 text-start text-sm font-semibold tracking-wider text-neutral-700 uppercase"
                >
                  Date
                </th>
                <th
                  className="min-w-[180px] px-3 py-2 text-start text-sm font-semibold tracking-wider text-neutral-700 uppercase"
                >
                  Customer
                </th>
                <th
                  className="min-w-[180px] px-3 py-2 text-start text-sm font-semibold tracking-wider text-neutral-700 uppercase"
                >
                  Products
                </th>
                <th
                  className="px-3 py-2 text-start text-sm font-semibold tracking-wider text-neutral-700 uppercase"
                >
                  Status
                </th>
                <th
                  className="min-w-[100px] p-3 py-2 text-end text-sm font-semibold tracking-wider text-neutral-700 uppercase"
                ></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50"
                >
                  <td
                    className="p-3 text-start font-semibold text-neutral-600"
                  >
                    {order.id}
                  </td>
                  <td className="p-3 text-start text-neutral-600">
                    {showLocalDate(order.createdAt)}
                  </td>
                  <td className="p-3 font-medium text-neutral-600">
                    <button
                      className="underline decoration-neutral-200 decoration-2 underline-offset-4 hover:text-neutral-950 hover:decoration-neutral-300"
                    >{order.shippingAddress.fullName}</button>
                  </td>
                  <td className="p-3 text-start">
                    {order.items.map((item) => item.productName).join(", ")}
                  </td>
                  <td className="p-3 font-medium">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="p-3 text-end font-medium">
                    <button
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm leading-5 font-semibold text-neutral-800 hover:border-neutral-300 hover:text-neutral-950 active:border-neutral-200 cursor-pointer"
                    >
                      <span>Edit</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>

                    </button>
                  </td>
                  <td className="p-3 text-end font-medium">
                    <button
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm leading-5 font-semibold text-neutral-800 hover:border-neutral-300 hover:text-neutral-950 active:border-neutral-200 cursor-pointer"
                    >
                      <span>Delete</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>

                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


export default function OrdersPage() {
  return (
    <div className="p-6">
      <Suspense fallback={<p className="mt-4">Loading...</p>}>
        <OrdersList />
      </Suspense>
    </div>
  );
}
