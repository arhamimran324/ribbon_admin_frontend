import { format } from "date-fns";

export function applySortFilter<T extends { [key: string]: unknown }>(
  array: T[],
  query: string,
): T[] {
  if (!query) return array;

  // Helper function to normalize and format values
  const normalizeAndFormatValue = (value: unknown): string => {
    if (typeof value === "string" && value.includes("T")) {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        // Check if the date is invalid
        console.error("Invalid date:", value); // Log invalid date for debugging
        return ""; // Return empty string or some default value
      }
      return format(date, "dd-MMM-yyyy").toLowerCase();
    }
    return value ? value.toString().toLowerCase() : "";
  };

  // Recursive helper function for deep search
  const deepSearch = (value: unknown): boolean => {
    if (typeof value === "object" && value !== null) {
      return Object.values(value).some((nestedValue) =>
        deepSearch(nestedValue),
      );
    }
    const normalizedValue = normalizeAndFormatValue(value);
    const normalizedQuery = query.toLowerCase();
    return normalizedValue.includes(normalizedQuery);
  };

  // Filter the array based on the deep search
  return array.filter((row) =>
    Object.values(row).some((value) => deepSearch(value)),
  );
}
