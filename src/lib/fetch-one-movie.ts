import { MovieData } from "@/types";

export default async function fetchOneMovie(
  id: number
): Promise<MovieData | null> {
  const url = `http://onebite-cinema-api-main-swart.vercel.app/movie/${id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error();

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
