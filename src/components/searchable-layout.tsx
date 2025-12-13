import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = (router.query.q as string) ?? "";

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSubmit();
  };

  return (
    <>
      <div className={style.searchbar_container}>
        <input
          type="search"
          placeholder="검색어 입력"
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          aria-label="검색어 입력"
        />
        <button type="submit" onClick={onSubmit}>
          검색
        </button>
      </div>
      {children}
    </>
  );
}
