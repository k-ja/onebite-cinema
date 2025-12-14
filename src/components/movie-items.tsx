import Link from "next/link";
import { MovieData } from "@/types";
import styles from "./movie-items.module.css";

export default function MovieItem({ id, title, posterImgUrl }: MovieData) {
  return (
    <Link href={`/movie/${id}`} className={styles.item}>
      <img src={posterImgUrl} alt={title} />
    </Link>
  );
}
