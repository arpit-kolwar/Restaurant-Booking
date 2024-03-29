import Star from "@/app/components/Stars";
import calculateRatingAvg from "@/utils/calculateRatingAvg";
import { Review } from "@prisma/client";

function Rating({ reviews }: { reviews: Review[] }) {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Star reviews={reviews} />
        <p className="text-reg ml-3">
          {calculateRatingAvg(reviews).toFixed(1)}
        </p>
      </div>
      <div>
        <p className="text-reg ml-4">{reviews.length} Reviews</p>
      </div>
    </div>
  );
}

export default Rating;
