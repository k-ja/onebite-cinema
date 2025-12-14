import { ReactNode } from "react";
import Link from "next/link";
import styles from "./global-layout.module.css";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          <Link href={"/"}>ONEBITE CINEMA</Link>
        </h1>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
