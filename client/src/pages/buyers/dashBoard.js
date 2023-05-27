import React from "react";
import ActiveOrders from "../../components/ActiveOrders";

const dashBoard = () => {
  return (
    <>
      <main className="py-4 md:py-8">
        <section className="w-4/5 m-auto mb-12">
          <h1 className="text-lg uppercase sm:text-xl md:text-3xl text-orange-500 font-semibold text-center">
            Orders Detail
          </h1>

          <div className="flex flex-col gap-8 my-6">
            <div className="active">
              <h2 className="text-lg font-semibold text-[#4280EA] my-2">
                Active Orders
              </h2>
              <ActiveOrders />
            </div>
            <div className="completed">
              <h2 className="text-lg font-semibold text-green-600 my-2">
                Completed Orders
              </h2>
              <ActiveOrders />
            </div>
            <div className="cancel">
              <h2 className="text-lg font-semibold text-red-600 my-2">
                Cancel Orders
              </h2>
              <ActiveOrders />
            </div>
          </div>
        </section>
        <hr />
      </main>
    </>
  );
};

export default dashBoard;
