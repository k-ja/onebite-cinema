import { ReactNode } from "react";
import styles from "./grid.module.css";

interface GridPorps {
  columns?: number;
  gap?: number;
  children: ReactNode;
}

// Grid
export default function Grid({ columns = 3, gap = 10, children }: GridPorps) {
  return (
    <div
      className={styles.grid}
      style={
        {
          "--cols": columns,
          "--gap": `${gap}px`,
        } as React.CSSProperties
      }>
      {children}
    </div>
  );
}
