import Link from "next/link";

function RestraurantNav({ slug }: { slug: string }) {
  return (
    <div>
      <nav className="flex text-reg border-b pb-2">
        <Link href={`/restaurant/${slug}`} className="mr-7">
          {" "}
          Overview{" "}
        </Link>
        <Link href={`/restaurant/${slug}/menu`} className="mr-7">
          {" "}
          Menu{" "}
        </Link>
      </nav>
    </div>
  );
}

export default RestraurantNav;
