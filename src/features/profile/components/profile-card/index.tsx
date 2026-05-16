import { FC } from "react";
import styles from "./profileCard.module.scss";
import { UserProfile } from "@features/profile/types";
import classes from "classnames";

type Props = {
    profile: UserProfile;
}

const formatViews = (n: number): string => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
    return `${n}`;
};

export const ProfileCard: FC<Props> = ({ profile }) => {
    const memberSince = new Date(profile.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });

    const displayName =
        profile.firstName || profile.lastName
            ? `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim()
            : profile.email;

    const hasBadges = profile.isPremium || profile.isVerified;

    return (
        <div className={styles.card}>
            <div className={styles.mainImage}>
                <div className={styles.infoOverlay}>

                    {hasBadges && (
                        <div className={styles.badges}>
                            {profile.isPremium && (
                                <span className={classes(styles.badge, styles.premiumBadge)}>Premium</span>
                            )}
                            {profile.isVerified && (
                                <span className={classes(styles.badge, styles.verifiedBadge)}>Verified</span>
                            )}
                        </div>
                    )}

                    <h2 className={styles.profileName}>{displayName}</h2>

                    {profile.location && (
                        <p className={styles.cardLocation}>{profile.location}</p>
                    )}

                    <div className={styles.cardFooter}>
                        <div className={styles.viewsCount}>
                            {formatViews(profile.profileViews)} Views
                        </div>
                        <div className={styles.memberSince}>
                            Since {memberSince}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
