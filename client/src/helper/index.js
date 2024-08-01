export const catchError = (error) => {
  const { response } = error;

  if (response?.data) {
    return response?.data;
  }

  return { error: error.message || error };
};

export const formattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default function getAvgRating(ratingArr) {
  if (ratingArr?.length === 0) return 0;
  const totalReviewCount = ratingArr?.reduce((acc, curr) => {
    acc += curr.rating;
    return acc;
  }, 0);

  const multiplier = Math.pow(10, 1);
  const avgReviewCount =
    Math.round((totalReviewCount / ratingArr?.length) * multiplier) /
    multiplier;

  return avgReviewCount;
}
