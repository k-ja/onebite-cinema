import fetchOneMovie from "@/lib/fetch-one-movie";
import styles from "./[id].module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  return { props: { movie } };
};

export default function Page({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!movie) return null;

  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <div className={styles.container}>
      <div
        className={styles.cover_img_container}
        style={{
          backgroundImage: `url('${posterImgUrl}')`,
        }}>
        <img src={posterImgUrl} alt={title} />
      </div>
      <div className={styles.title}>{title}</div>
      <div>
        {releaseDate} / {genres} / {runtime}분
      </div>
      <div>{company}</div>
      <div className={styles.subTitle}>{subTitle}</div>
      <p>{description}</p>
    </div>
  );
}
