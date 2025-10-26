export const formatTime = (timer: number): string => {
  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
