import { ReactNode, useEffect, useState } from "react";
import SearchableLayout from "@/components/searchable-layout";
import Grid from "@/components/grid";
import MovieItem from "@/components/movie-items";
import fetchMovies from "@/lib/fetch-movie";
import { useRouter } from "next/router";
import { MovieData } from "@/types";
import Head from "next/head";

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
    <>
      <Head>
        <title>검색결과 - 한입시네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="검색결과 - 한입시네마" />
        <meta
          property="og:description"
          content="한입시네마에 등록된 영화들을 만나보세요."
        />
      </Head>
      <Grid>
        {movies.map((item) => (
          <MovieItem key={item.id} {...item} />
        ))}
      </Grid>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
