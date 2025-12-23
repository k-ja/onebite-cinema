import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-items";
import Grid from "@/components/grid";
import styles from "./index.module.css";
import { InferGetStaticPropsType } from "next";
import fetchMovies from "@/lib/fetch-movie";
import fetchRandomMovies from "@/lib/fetch-random-movie";
import Head from "next/head";

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
    <>
      <Head>
        <title>한입시네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입시네마" />
        <meta
          property="og:description"
          content="한입시네마에 등록된 영화들을 만나보세요."
        />
      </Head>
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
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
