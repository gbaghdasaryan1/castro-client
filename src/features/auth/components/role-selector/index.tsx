import { FC } from "react";
import styles from "./roleSelector.module.scss";
import { Role } from "@features/auth/types";


type Props = {
  role: Role;
  onChange: (role: Role) => void;
}

export const RoleSelector: FC<Props> = ({ role, onChange }) => (
  <div className={styles.roles}>
    <button
      type="button"
      className={role === "personal" ? styles.active : ""}
      onClick={() => onChange("personal")}
    >
      Personal
    </button>
    <button
      type="button"
      className={role === "agency" ? styles.active : ""}
      onClick={() => onChange("agency")}
    >
      Agency
    </button>
  </div>
);

