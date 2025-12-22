import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import Grid from "@/components/grid";
import MovieItem from "@/components/movie-items";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchMovies from "@/lib/fetch-movie";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q;
  const movies = await fetchMovies(q as string);

  return { props: { movies } };
};

export default function Page({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
