'use client'
import MainComponent from "@/components/mainComponent";
import styles from "./page.module.css";
import "./globals.css";
import { Head } from "next/document";

export default function Home() {
  return (
    <main>
      <MainComponent></MainComponent>
    </main>
  );
}
