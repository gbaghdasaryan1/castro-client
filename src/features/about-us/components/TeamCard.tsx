import type { TeamMember } from '../types';
import { useAboutUsStore } from '../about-us-store';
import styles from './TeamCard.module.scss';

type Props = { member: TeamMember };

export function TeamCard({ member }: Props) {
  const selectedMemberId = useAboutUsStore((s) => s.selectedMemberId);
  const selectMember = useAboutUsStore((s) => s.selectMember);
  const isSelected = selectedMemberId === member.id;

  return (
    <button
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={() => selectMember(isSelected ? null : member.id)}
    >
      <span className={styles.name}>{member.name}</span>
      <span className={styles.role}>{member.role}</span>
    </button>
  );
}
