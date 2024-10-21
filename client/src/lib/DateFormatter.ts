export const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) return ""; // Handle null or undefined input

  const dateObj = typeof date === "string" ? new Date(date) : date; // Convert string to Date object if necessary

  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
};
