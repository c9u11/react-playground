export function makeImagePath(id: string, format?: string) {
  if (id === "null") return "";
  return `https://image.tmdb.org/t/p/${format || "original"}/${id}`;
}