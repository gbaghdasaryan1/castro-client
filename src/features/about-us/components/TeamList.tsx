import { useTeam } from '../hooks';
import { TeamCard } from './TeamCard';
import styles from './TeamList.module.scss';

export function TeamList() {
  const { data: team, isPending, isError, error } = useTeam();

  if (isPending) return <p className={styles.status}>Loading team…</p>;
  if (isError) return <p className={styles.status}>{error.message}</p>;

  return (
    <ul className={styles.grid}>
      {team.map((member) => (
        <li key={member.id}>
          <TeamCard member={member} />
        </li>
      ))}
    </ul>
  );
}
