import React, { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder";

const Orders = () => {
  const [orders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[770px]">
          {/* <!-- order item --> */}
          {loading ? (
            <div className="py-9.5 px-4 sm:px-7.5 xl:px-10 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue mx-auto"></div>
              <p className="mt-2 text-dark-4">Loading orders...</p>
            </div>
          ) : orders.length > 0 ? (
            <>
              <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex ">
                <div className="min-w-[111px]">
                  <p className="text-custom-sm text-dark">Order</p>
                </div>
                <div className="min-w-[175px]">
                  <p className="text-custom-sm text-dark">Date</p>
                </div>
                <div className="min-w-[128px]">
                  <p className="text-custom-sm text-dark">Status</p>
                </div>
                <div className="min-w-[213px]">
                  <p className="text-custom-sm text-dark">Items</p>
                </div>
                <div className="min-w-[113px]">
                  <p className="text-custom-sm text-dark">Total</p>
                </div>
                <div className="min-w-[113px]">
                  <p className="text-custom-sm text-dark">Action</p>
                </div>
              </div>
              {orders.map((orderItem: any, key: number) => (
                <SingleOrder key={orderItem.id || key} orderItem={orderItem} smallView={false} />
              ))}
            </>
          ) : (
            <p className="py-9.5 px-4 sm:px-7.5 xl:px-10">
              You don&apos;t have any orders!
            </p>
          )}
        </div>

        {orders.length > 0 &&
          orders.map((orderItem: any, key: number) => (
            <SingleOrder key={orderItem.id || key} orderItem={orderItem} smallView={true} />
          ))}
      </div>
    </>
  );
};

export default Orders;
