import axios from "axios";
import React, { useMemo } from "react";
import OfferList from "./OfferList";
import { Price } from "@/types/price";

const PricingBox = ({ product }: { product: Price }) => {
  // POST request
  const handleSubscription = async (e: any) => {
    e.preventDefault();
    const { data } = await axios.post(
      "/api/payment",
      {
        priceId: product.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.assign(data);
  };

  const [isPriceString, setPriceString] = React.useState(false);

  const price = React.useMemo(() => {
    if (typeof product.unit_amount === "number") {
      setPriceString(false);
      return (product.unit_amount / 100).toLocaleString("en-US", {
        currency: "USD",
      });
    }
    setPriceString(true);
    return product.unit_amount;
  }, [product]);

  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div
        className="relative z-10 mb-10 overflow-hidden rounded-xl bg-white px-8 py-10 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-14"
        data-wow-delay=".1s"
      >
        {product.nickname === "Premium" && (
          <p className="absolute right-[-50px] top-[60px] inline-block -rotate-90 rounded-bl-md rounded-tl-md bg-primary px-5 py-2 text-base font-medium text-white">
            Recommended
          </p>
        )}
        <span className="mb-5 block text-xl font-medium text-dark dark:text-white">
          {product.nickname}
        </span>
        {isPriceString && (
          <h2 className="mb-5 text-4xl font-semibold text-dark dark:text-white xl:text-[23px] xl:leading-[1.21]">
            <span className="text-xl font-medium">$ </span>
            {<span className="-ml-1 -tracking-[2px]">{price}</span>}
            <p className="text-base font-normal text-body-color dark:text-dark-6">
              {" "}
              (varies based on project scope)
            </p>
          </h2>
        )}
        {!isPriceString && (
          <h2 className="mb-5 text-4xl font-semibold text-dark dark:text-white xl:text-[33px] xl:leading-[1.21]">
            <span className="text-xl font-medium">$ </span>
            {<span className="-ml-1 -tracking-[2px]">{price}</span>}
            <span className="text-base font-normal text-body-color dark:text-dark-6">
              {" "}
              Per Month
            </span>
          </h2>
        )}

        <div className="mb-[50px]">
          <h3 className="mb-2 text-lg font-medium text-dark dark:text-white">
            Features
          </h3>
          <div className="mb-10">
            <ul className="max-sm:pl-5">
              {product?.offers.map((offer, i) => (
                <OfferList key={i} text={offer} />
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full">
          <button
            onClick={handleSubscription}
            className="inline-block rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white transition duration-300 hover:bg-primary/90"
          >
            Purchase Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingBox;
