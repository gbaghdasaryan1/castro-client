import Head from 'next/head';
import { TeamList } from '@features/about-us';
import styles from './about-us.module.scss';

export default function AboutUsPage() {
  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Meet the team" />
      </Head>
      <main className={styles.page}>
        <h1 className={styles.heading}>Meet the Team</h1>
        <TeamList />
      </main>
    </>
  );
}
