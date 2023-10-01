import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

import { Banner, Categories, BestSell, BeatSpinner } from "../components";

const Home = () => {
  const dataPromise = useLoaderData();

  return (
    <div className="w-full min-h-screen  px-3 sm:px-6 font-montserrat space-y-28">
      <Banner />
      <Categories />
      <Suspense fallback={<BeatSpinner />}>
        <Await resolve={dataPromise.products}>
          {(products) => <BestSell data={products} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default Home;
