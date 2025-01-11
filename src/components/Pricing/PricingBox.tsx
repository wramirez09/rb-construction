import React, { useMemo } from "react";
import OfferList from "./OfferList";
import { Price } from "@/types/price";

const PricingBox = ({ product }: { product: Price }) => {
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
		<div className="w-full px-4 md:w-1/2 lg:w-2/3">
			<div
				className="relative z-10 mb-10 overflow-hidden rounded-xl bg-white px-8 py-10 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-14"
				data-wow-delay=".1s"
			>
				{product.nickname && (
					<p className="absolute right-[-50px] top-[60px] inline-block -rotate-90 rounded-bl-md rounded-tl-md bg-primary px-5 py-2 text-base font-medium text-white">
						Recommended
					</p>
				)}
				<h1 className="mb-5 block text-xl font-bold font-xlarge text-dark dark:text-white xl:text-[25px]">
					{product.nickname}
				</h1>
				{isPriceString && (
					<h2 className="mb-5 text-4xl font-semibold text-dark dark:text-white xl:text-[23px] xl:leading-[1.21]">
						{/* <span className="text-xl font-medium"></span> */}
						{<span className="-ml-1 ">{price}</span>}
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
						Some of Our Features
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
					<a
						href="/#contact"
						className="inline-block rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white transition duration-300 hover:bg-primary/90"
					>
						Contact Us Now
					</a>
				</div>
			</div>
		</div>
	);
};

export default PricingBox;
