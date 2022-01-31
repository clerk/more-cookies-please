import styles from "../styles/Home.module.css";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import MoreCookies from "../components/MoreCookies";

const SignupLink = () => (
  <Link href="/sign-up">
    <a className={styles.cardContent}>
      <img src="/icons/user-plus.svg" />
      <div>
        <h3>Sign up for an account</h3>
        <p>
          Sign up and sign in to explore all the features provided by Clerk
          out-of-the-box
        </p>
      </div>
      <div className={styles.arrow}>
        <img src="/icons/arrow-right.svg" />
      </div>
    </a>
  </Link>
);

const Main = () => (
  <main className={styles.main}>
    <SignedOut>
      <h1 className={styles.title}>Welcome to your new app</h1>
      <p className={styles.description}>
        Sign up for an account to get started
      </p>
      <div className={styles.cards}>
        <div className={styles.card}>
          <SignupLink />
        </div>
      </div>
    </SignedOut>
    <SignedIn>
      <MoreCookies />
    </SignedIn>
  </main>
);

const Footer = () => (
  <footer className={styles.footer}>
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by{" "}
      <img src="/clerk.svg" alt="Clerk.dev" className={styles.logo} />
      +
      <img src="/nextjs.svg" alt="Next.js" className={styles.logo} />
    </a>
  </footer>
);

const Home = () => (
  <div className={styles.container}>
    <Main />
    <Footer />
  </div>
);

export default Home;
