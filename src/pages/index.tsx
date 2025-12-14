import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-items";
import styles from "./index.module.css";

import dummy from "@/mock/dummy.json";
import Grid from "@/components/grid";

type Movie = (typeof dummy)[number];

/**
 * 추천 영역용 랜덤 아이템 추출 유틸
 * dummy data 배열에서 랜덤으로 count개 아이템 추출
 * ⚠️ 주의: Math.random()을 사용하므로 컴포넌트 렌더 내부에서 호출하면 hydration mismatch 발생
 * 반드시 SSR 단계에서만 실행
 *
 * @param data 원본 배열 (불변성 유지를 위해 내부에서 복사 처리)
 * @param count 추출할 아이템 개수
 * @returns 랜덤으로 선택된 아이템 배열
 */
const getRandomItems = <T,>(data: T[], count: number): T[] => {
  return [...data].sort(() => Math.random() - 0.5).slice(0, count);
};

/**
 * getServerSideProps
 *
 * 이 함수는 서버에서만 실행됨
 * 여기서 랜덤 결과를 "확정"하면 서버 HTML과 클라이언트 hydration 결과가 100% 동일해짐
 *
 * - Server Render 결과 === Client 첫 렌더 결과
 * - Prop `src` did not match 에러 원천 차단
 */
export async function getServerSideProps() {
  const randomItems = getRandomItems(dummy as Movie[], 3);

  return { props: { randomItems } }; // 이미 확정된 랜덤 결과 반환
}

export default function Home({
  randomItems, // 내부에서 랜덤 로직 실행하지 않고, props로 내려온 결과만 그대로 렌더(hydration 단계에서 계산 차이 발생 여지 없음)
}: {
  randomItems: Movie[];
}) {
  return (
    <div className={styles.container}>
      <section>
        <h2 className={styles.section_title}>지금 가장 추천하는 영화</h2>
        <Grid>
          {randomItems.map((item) => (
            <MovieItem key={item.id} {...item}></MovieItem>
          ))}
        </Grid>
      </section>
      <section>
        <h2 className={styles.section_title}>등록된 모든 영화</h2>
        <Grid columns={5}>
          {dummy.map((item) => (
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
