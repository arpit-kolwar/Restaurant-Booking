import Header from "./components/Header";
import SearchSidebar from "./components/SearchSidebar";
import RestaurandCard from "./components/RestaurandCard";

import { PRICE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

const fetchRestaurantsByCity = (searchParams: SearchParams) => {
  const where: any = {};

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
    where.location = location;
  }
  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
    where.cuisine = cuisine;
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }

  // prisma.restaurant.findMany({
  //   where: {
  //     location: {
  //       name: {
  //         equals: "toronto",
  //       },
  //     },
  //     cuisine: {
  //       name: {
  //         equals: "mexican",
  //       },
  //     },
  //     price: {
  //       equals: PRICE.CHEAP,
  //     },
  //   },
  // });

  const select = {
    id: true,
    name: true,
    main_image: true,
    cuisine: true,
    price: true,
    slug: true,
    location: true,
    reviews: true,
  };

  return prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchAllLocation = async () => {
  return prisma.location.findMany();
};
const fetchAllCuisine = async () => {
  return prisma.cuisine.findMany();
};

async function page({ searchParams }: { searchParams: SearchParams }) {
  const restaurants = await fetchRestaurantsByCity(searchParams);
  const locations = await fetchAllLocation();
  const cuisines = await fetchAllCuisine();
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start ">
        <SearchSidebar
          searchParams={searchParams}
          locations={locations}
          cuisines={cuisines}
        />
        <div className="w-5/6 ml-4">
          {restaurants.length ? (
            <>
              {restaurants.map((restaurant) => (
                <RestaurandCard restaurant={restaurant} />
              ))}
            </>
          ) : (
            <p>"Sorry no hotels found in this area"</p>
          )}
        </div>
      </div>
    </>
  );
}

export default page;
