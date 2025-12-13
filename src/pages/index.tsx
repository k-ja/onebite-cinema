import { ReactNode } from "react";
import SearchableLayout from "@/component/searchable-layout";

export default function Home() {
  return <></>;
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
