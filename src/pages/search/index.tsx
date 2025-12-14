import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import Grid from "@/components/grid";
import MovieItem from "@/components/movie-items";

import dummy from "@/mock/dummy.json";

export default function Page() {
  return (
    <Grid>
      {dummy.map((item) => (
        <MovieItem key={item.id} {...item} />
      ))}
    </Grid>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
