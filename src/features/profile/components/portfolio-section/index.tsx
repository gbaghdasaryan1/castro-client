import { FC, useState, useEffect } from "react";
import styles from "./portfolioSection.module.scss";
import { useForm, useFieldArray } from "react-hook-form";
import { useUpdateProfile } from "@features/profile/hooks";
import { PortfolioFormData, UserProfile } from "@features/profile/types";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { PhotosGrid } from "../photos-grid";
import Link from "next/link";

type Props = {
    profile: UserProfile;
}

export const PortfolioSection: FC<Props> = ({ profile }) => {
    const [editing, setEditing] = useState(false);
    const { mutate, isPending, isError, error } = useUpdateProfile();
    const { register, handleSubmit, reset, control } =
        useForm<PortfolioFormData>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "socialLinks",
    });

    useEffect(() => {
        if (editing) {
            reset({
                coverLetter: profile.coverLetter ?? "",
                socialLinks: (profile.socialMediaLinks ?? []).map((url) => ({ url })),
            });
        }
    }, [editing]);

    const onSubmit = (data: PortfolioFormData) => {
        mutate(
            {
                coverLetter: data.coverLetter || null,
                socialMediaLinks: data.socialLinks.map((l) => l.url).filter(Boolean),
            },
            { onSuccess: () => setEditing(false) }
        );
    };

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <h3>Portfolio &amp; Bio</h3>
                {!editing && (
                    <button className={styles.editBtn} onClick={() => setEditing(true)}>
                        Edit
                    </button>
                )}
            </div>

            {isError && editing && (
                <div className={styles.errorBanner}>{error?.message}</div>
            )}

            {editing ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.textareaField}>
                        <label className={styles.selectLabel}>Bio / Cover Letter</label>
                        <textarea
                            className={styles.textarea}
                            rows={5}
                            placeholder="Tell people about yourself..."
                            {...register("coverLetter")}
                        />
                    </div>

                    <div className={styles.linksSection}>
                        <div className={styles.linksHeader}>
                            <label className={styles.selectLabel}>Social Media Links</label>
                            <button
                                type="button"
                                className={styles.addLinkBtn}
                                onClick={() => append({ url: "" })}
                            >
                                + Add Link
                            </button>
                        </div>
                        <div className={styles.linksList}>
                            {fields.map((field, i) => (
                                <div key={field.id} className={styles.linkItem}>
                                    <div className={styles.linkInput}>
                                        <Input
                                            placeholder="https://instagram.com/..."
                                            {...register(`socialLinks.${i}.url`)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className={styles.removeLinkBtn}
                                        onClick={() => remove(i)}
                                        title="Remove"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            {fields.length === 0 && (
                                <p className={styles.emptyHint}>
                                    No links yet — click &quot;+ Add Link&quot; to add one.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button
                            type="button"
                            className={styles.cancelBtn}
                            onClick={() => setEditing(false)}
                        >
                            Cancel
                        </button>
                        <Button type="submit" loading={isPending}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            ) : (
                <>
                    <div className={styles.bioBlock}>
                        <span className={styles.fieldLabel}>Bio</span>
                        {profile.coverLetter ? (
                            <p className={styles.bioText}>{profile.coverLetter}</p>
                        ) : (
                            <span className={styles.empty}>Not set</span>
                        )}
                    </div>

                    <div className={styles.linksBlock}>
                        <span className={styles.fieldLabel}>Social Media</span>
                        {profile.socialMediaLinks?.length ? (
                            <ul className={styles.viewLinksList}>
                                {profile.socialMediaLinks.map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.link}
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span className={styles.empty}>No links added</span>
                        )}
                    </div>
                </>
            )}

            <PhotosGrid profile={profile} />
        </div>
    );
};
