import { FC } from "react";
import styles from "./profileCard.module.scss";
import { UserProfile } from "@features/profile/types";
import { AvatarUpload } from "../avatar-upload";

type Props = {
    profile: UserProfile;
}

export const ProfileCard: FC<Props> = ({ profile }) => {
    const memberSince = new Date(profile.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });

    const displayName =
        profile.firstName || profile.lastName
            ? `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim()
            : profile.email;

    return (
        <div className={styles.card}>
            <AvatarUpload profile={profile} />

            <h2 className={styles.profileName}>{displayName}</h2>

            <div className={styles.badges}>
                <span className={[styles.badge, styles.roleBadge].join(" ")}>
                    {profile.role}
                </span>
                {profile.isPremium && (
                    <span className={[styles.badge, styles.premiumBadge].join(" ")}>
                        ★ Premium
                    </span>
                )}
                {profile.isVerified && (
                    <span className={[styles.badge, styles.verifiedBadge].join(" ")}>
                        ✓ Verified
                    </span>
                )}
            </div>

            {profile.location && (
                <p className={styles.cardLocation}>📍 {profile.location}</p>
            )}

            <div className={styles.statsRow}>
                <div className={styles.stat}>
                    <span className={styles.statValue}>
                        {profile.profileViews.toLocaleString()}
                    </span>
                    <span className={styles.statLabel}>Views</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                    <span className={styles.statValue}>{memberSince}</span>
                    <span className={styles.statLabel}>Member Since</span>
                </div>
            </div>

            {profile.accountType && (
                <div className={styles.accountTypeRow}>
                    <span className={styles.fieldLabel}>Account</span>
                    <span className={styles.fieldValue}>{profile.accountType}</span>
                </div>
            )}
        </div>
    );
};
