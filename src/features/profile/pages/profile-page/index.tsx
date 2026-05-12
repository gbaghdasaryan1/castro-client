import { FC, useState } from "react";
import styles from "./profile.module.scss";
import { useProfile } from "@features/profile/hooks";
import { Tab } from "@features/profile/types";
import { Button } from "@shared/ui/button";
import { PersonalSection } from "@features/profile/components/personal-section";
import { PhysicalSection } from "@features/profile/components/physical-section";
import { PortfolioSection } from "@features/profile/components/portfolio-section";
import { ProfileCard } from "@features/profile/components/profile-card";
import { TABS } from "@features/profile/constants";

export const ProfilePage: FC = () => {
  const { data: profile, isLoading, isError } = useProfile();
  const [activeTab, setActiveTab] = useState<Tab>("info");

  if (isLoading) {
    return (
      <div className={styles.stateWrap}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className={styles.stateWrap}>
        <p className={styles.stateText}>Failed to load profile.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  const visibleTabs = TABS.filter(
    (t) => !t.onlyFor || t.onlyFor === profile.role
  );

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <ProfileCard profile={profile} />
        </aside>

        <div className={styles.main}>
          <div className={styles.tabs}>
            {visibleTabs.map((tab) => (
              <button
                key={tab.id}
                className={[
                  styles.tab,
                  activeTab === tab.id && styles.tabActive,
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "info" && <PersonalSection profile={profile} />}
          {activeTab === "physical" && profile.role === "personal" && (
            <PhysicalSection profile={profile} />
          )}
          {activeTab === "portfolio" && <PortfolioSection profile={profile} />}
        </div>
      </div>
    </div>
  );
};
