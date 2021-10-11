import Image from "next/image";
import Layout from "../components/common/Layout";
import Hero from "../components/Home/Hero";
import JoinUs from "../components/Home/JoinUs";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className="mt-80">
        <Hero />
        <JoinUs />
      </div>

      <main>
        <Layout></Layout>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
