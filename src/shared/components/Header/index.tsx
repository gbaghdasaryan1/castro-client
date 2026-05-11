import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./header.module.scss";
import { Button } from "@shared/ui/button";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // close outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return (
    <header className={styles.header}>
      {/* LEFT */}
      <div className={styles.left}>
        <Link href="/" className={styles.logo}>
          WeProCast
        </Link>

        <nav className={styles.nav}>
          <Link href="/discover">Discover</Link>

          <Link href="/curators">Curators</Link>

          <Link href="/membership">Membership</Link>

          <Link href="/about">About</Link>
        </nav>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        {!isAuthenticated ? (
          <Button href="/login">Login</Button>
        ) : (
          <div className={styles.profileWrapper} ref={menuRef}>
            <button
              className={styles.avatar}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              S
            </button>

            {menuOpen && (
              <div className={styles.dropdown}>
                <Link href="/profile">Account</Link>

                <Link href="/settings">Settings</Link>

                <Link href="/membership">Membership</Link>

                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
