import fullStar from "../../icons/full-star.png";
import emptyStar from "../../icons/empty-star.png";
import halfStar from "../../icons/half-star.png";
import error from "../../icons/error.png";
import Image from "next/image";
import calculateRatingAvg from "@/utils/calculateRatingAvg";
import { Review } from "@prisma/client";

function Star({ reviews, rating }: { reviews: Review[]; rating?: number }) {
  const ratingValue = rating || calculateRatingAvg(reviews);

  const renderStars = (ratingValue: number) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((ratingValue - i).toFixed(1));
      if (difference >= 1) stars.push(fullStar);
      else if (difference >= 0.2 && difference <= 0.6) stars.push(halfStar);
      else if (difference <= 0.2 && difference >= 0) stars.push(emptyStar);
      else stars.push(emptyStar);
    }
    return stars.map((star) => {
      return <Image src={star} alt="" className="w-4 h-4 mr-1" />;
    });
  };

  return <div className="flex items-center">{renderStars(ratingValue)}</div>;
}
//3.6-0 = 3.6  3.6-1 = 2.6   3.6-2 = 1.6  ,0.6
// 3.6 ###[[]

export default Star;
