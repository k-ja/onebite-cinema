import fetchOneMovie from "@/lib/fetch-one-movie";
import styles from "./[id].module.css";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) return { notFound: true };

  return { props: { movie } };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return "로딩중...";
  if (!movie) return "문제가 발생했습니다. 다시 시도하세요.";

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
