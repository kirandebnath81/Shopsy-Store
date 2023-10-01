import { useContext } from "react";
import { icons } from "../../constants";

import { UserContext } from "../../contexts";

import { EmptyProductsList, OrderedProductCard } from "../../components";

export const Component = () => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { orders } = userDetails;

  if (orders.length === 0) {
    return <EmptyProductsList message="You haven't ordered anything yet" />;
  }

  const toggleAddressView = (value, id) => {
    setUserDetails((prev) => ({
      ...prev,
      orders: prev.orders.map((order) =>
        order.id === id ? { ...order, viewAddress: value } : order
      ),
    }));
  };

  return (
    <div className="w-full font-montserrat space-y-12">
      {orders.map(
        ({ amount, date, address, viewAddress, products, orderInfo, id }) => (
          <div key={id} className="shadow-md rounded-md">
            <div className="flex items-center justify-between flex-wrap bg-rose-50 gap-x-4 gap-y-6 p-3">
              <div>
                <div className="text-xs ss:text-[13px] sm:text-sm ">
                  ORDER PLACED
                </div>
                <div className="text-sm ss:text-[15px] sm:text-base font-medium opacity-80">
                  {date}
                </div>
              </div>
              <div>
                <div className="text-xs ss:text-[13px] sm:text-sm">TOTAL</div>
                <div className="text-sm ss:text-[15px] sm:text-base font-medium opacity-80">
                  &#8377; {amount}
                </div>
              </div>
              <div>
                <div className="text-xs ss:text-[13px] sm:text-sm">SHIP TO</div>
                <div
                  className="relative"
                  onMouseLeave={() => toggleAddressView(false, id)}
                >
                  <div
                    className="font-medium text-sm ss:text-[15px] sm:text-base opacity-80 cursor-pointer text-sky-950 hover:underline flex items-center"
                    onMouseMove={() => toggleAddressView(true, id)}
                  >
                    <div>{address.fullName}</div>
                    <icons.arrowDown />
                  </div>
                  {viewAddress && (
                    <div className="absolute left-0 ss:-left-20 top-5 z-10 w-60 pt-3 ">
                      <div className="p-4 bg-white shadow-lg rounded-md text-sm font-medium text-opacity-70 space-y-1">
                        <div className="font-semibold">{address.fullName}</div>
                        <div>{address.area}</div>
                        <div>
                          {address.city}, {address.state} {address.pincode}{" "}
                        </div>
                        <div>Phone : {address.mobileNo}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs ss:text-[13px] sm:text-sm">
                  {" "}
                  ORDER ID
                </div>
                <div className="text-sm ss:text-[15px] sm:text-base font-medium opacity-80">
                  {orderInfo.razorpay_order_id}
                </div>
              </div>
            </div>

            <div className="w-full mx-auto h-40 overflow-x-auto space-y-12 py-8 px-4 sm:px-10 bg-white">
              {products.map((product) => (
                <OrderedProductCard
                  key={product.id}
                  productData={product}
                  orderDate={date}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

Component.displayName = "Orders";
