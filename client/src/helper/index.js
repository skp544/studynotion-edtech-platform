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
