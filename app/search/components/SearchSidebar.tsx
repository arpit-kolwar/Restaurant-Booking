import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";
import Link from "next/link";

interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

async function SearchSidebar({
  searchParams,
  locations,
  cuisines,
}: {
  searchParams: SearchParams;
  locations: Location[];
  cuisines: Cuisine[];
}) {
  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col ">
        <h1 className="mb-2">Region</h1>
        {locations.map((loc) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                city: loc.name,
              },
            }}
            className="font-light text-reg"
          >
            {loc.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((item) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                cuisine: item.name,
              },
            }}
            className="font-light text-reg cursor-pointer"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <button className="border w-full text-reg font-light rounded-l p-2">
            <Link
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  price: PRICE.REGULAR,
                },
              }}
            >
              $
            </Link>
          </button>

          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price: PRICE.REGULAR,
              },
            }}
            className="border-r border-t border-b w-full text-reg font-light p-2"
          >
            $$
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price: PRICE.EXPENSIVE,
              },
            }}
            className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
          >
            $$$
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchSidebar;
