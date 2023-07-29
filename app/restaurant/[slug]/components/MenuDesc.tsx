import MenuCard from "./MenuCard";
import { Item } from "@prisma/client";

function MenuDesc({ menu }: { menu: Item[] }) {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        {menu.length > 1 ? (
          <div className="flex flex-wrap justify-between">
            {menu.map((item) => (
              <MenuCard item={item} key={item.id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-between">
            <p>This restaurant does not have a menu</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default MenuDesc;
