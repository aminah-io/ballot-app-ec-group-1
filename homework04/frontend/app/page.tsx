'use client'
import MainComponent from "@/components/mainComponent";
import styles from "./page.module.css";
import "./globals.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <MainComponent></MainComponent>
    </main>
  );
}
