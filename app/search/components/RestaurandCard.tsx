import Price from "@/app/components/Price";
import Star from "@/app/components/Stars";
import calculateRatingAvg from "@/utils/calculateRatingAvg";
import { Cuisine, Location, PRICE, Review } from "@prisma/client";

import Link from "next/link";
import React from "react";

interface Restaurant {
  main_image: string;
  id: number;
  name: string;
  cuisine: Cuisine;
  price: PRICE;
  slug: string;
  location: Location;
  reviews: Review[];
}

function RestaurandCard({ restaurant }: { restaurant: Restaurant }) {
  const renderRatingText = () => {
    const rating = calculateRatingAvg(restaurant.reviews);

    if (rating > 4) return "Awesome";
    else if (rating <= 4 && rating > 3) return "Good";
    else if (rating <= 3 && rating > 0) return "Average";
    else return "";
  };

  return (
    <div className="border-b flex pb-5">
      <img src={restaurant.main_image} alt="" className="w-44 h-36 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Star reviews={restaurant.reviews} />
          </div>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
          {/* <p></p> */}
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4">{restaurant.cuisine.name}</p>
            <p className="mr-4">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RestaurandCard;
