import styles from "./[id].module.css";

// MOCK DATA
const MOCKDATA = {
  id: 9,
  title: "조커: 폴리 아 되",
  releaseDate: "2024-10-01",
  company: "워너 브러더스 코리아㈜",
  genres: ["범죄", "드라마", "뮤지컬"],
  subTitle: "온 세상이 바로 무대",
  description:
    "“더 이상 혼자가 아니야” 세상이란 무대에서 폭주하기 시작한 ‘조커’와 ‘할리 퀸’을 확인하라! 2년 전, 세상을 뒤흔들며 고담시 아이콘으로 자리한 ‘아서 플렉’은 아캄 수용소에 갇혀 최종 재판을 앞둔 무기력한 삶을 살아간다. 그러던 어느 날, 수용소에서 운명적으로 만난 ‘리 퀸젤’은 ‘아서’의 삶을 다시 뒤바꾸며 그의 마음 속에 잠들어 있던 ‘조커’를 깨우고 ‘리’ 역시 각성하며 자신을 ‘할리 퀸’이라 지칭하며 서로에게 깊이 빠져든다. 무고한 시민을 죽인 죄로 재판에 오르게 된 ‘아서’ 그는 최후의 심판대에서 ‘할리 퀸’과 함께 자신, ‘조커’의 이야기를 시작하는데…",
  runtime: 138,
  posterImgUrl:
    "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20240919_160%2F17267100850257nicf_JPEG%2Fmovie_image.jpg",
};

export default function Page() {
  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = MOCKDATA;

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
