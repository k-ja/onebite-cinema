import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-items";
import Grid from "@/components/grid";
import styles from "./index.module.css";
import { InferGetStaticPropsType } from "next";
import fetchMovies from "@/lib/fetch-movie";
import fetchRandomMovies from "@/lib/fetch-random-movie";

export const getStaticProps = async () => {
  const [allMovies, randomMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: { allMovies, randomMovies },
    revalidate: 3,
  };
};

export default function Home({
  allMovies,
  randomMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.container}>
      <section>
        <h2 className={styles.section_title}>지금 가장 추천하는 영화</h2>
        <Grid>
          {randomMovies.map((item) => (
            <MovieItem key={item.id} {...item}></MovieItem>
          ))}
        </Grid>
      </section>
      <section>
        <h2 className={styles.section_title}>등록된 모든 영화</h2>
        <Grid columns={5}>
          {allMovies.map((item) => (
            <MovieItem key={item.id} {...item}></MovieItem>
          ))}
        </Grid>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
