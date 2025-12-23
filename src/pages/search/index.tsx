import { ReactNode, useEffect, useState } from "react";
import SearchableLayout from "@/components/searchable-layout";
import Grid from "@/components/grid";
import MovieItem from "@/components/movie-items";
import fetchMovies from "@/lib/fetch-movie";
import { useRouter } from "next/router";
import { MovieData } from "@/types";

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchMovies(q as string);
    setMovies(data);
  };

  useEffect(() => {
    if (q) fetchSearchResult();
    return () => {};
  }, [q]);

  return (
    <Grid>
      {movies.map((item) => (
        <MovieItem key={item.id} {...item} />
      ))}
    </Grid>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
