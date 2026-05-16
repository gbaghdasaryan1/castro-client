import { FC, useState, useEffect } from "react";
import styles from "./personalSection.module.scss";
import { useForm, Controller } from "react-hook-form";
import { useUpdateProfile } from "@features/profile/hooks";
import { UserProfile, UpdateProfileData, PersonalFormData } from "@features/profile/types";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Select } from "@shared/ui/select";
import { Field } from "../info-field";

const GENDER_OPTIONS = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
];

type Props = {
    profile: UserProfile;
};

export const PersonalSection: FC<Props> = ({ profile }) => {
    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const { mutate, isPending, isError, error } = useUpdateProfile();
    const { register, handleSubmit, reset, control } = useForm<PersonalFormData>();

    useEffect(() => {
        if (editing) {
            reset({
                firstName: profile.firstName ?? "",
                lastName: profile.lastName ?? "",
                age: profile.age?.toString() ?? "",
                location: profile.location ?? "",
                gender: profile.gender ?? "",
            });
        }
    }, [editing]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && editing) setEditing(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [editing]);

    const onSubmit = (data: PersonalFormData) => {
        mutate(
            {
                firstName: data.firstName || null,
                lastName: data.lastName || null,
                age: data.age ? Number(data.age) : null,
                location: data.location || null,
                gender: (data.gender || null) as UpdateProfileData["gender"],
            },
            {
                onSuccess: () => {
                    setEditing(false);
                    setSaved(true);
                    setTimeout(() => setSaved(false), 3000);
                },
            }
        );
    };

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <h3>Personal Information</h3>
                {saved && !editing && (
                    <span className={styles.savedBadge}>Saved</span>
                )}
                {!editing && (
                    <button className={styles.editBtn} onClick={() => { setEditing(true); setSaved(false); }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit
                    </button>
                )}
            </div>

            {isError && editing && (
                <div className={styles.errorBanner}>{error?.message}</div>
            )}

            {editing ? (
                <form onSubmit={handleSubmit(onSubmit)} className={styles.fadeIn}>
                    <div className={styles.grid}>
                        <Input label="First Name" {...register("firstName")} />
                        <Input label="Last Name" {...register("lastName")} />
                        <Input label="Age" type="number" min={1} max={120} {...register("age")} />
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Gender"
                                    placeholder="Select gender"
                                    options={GENDER_OPTIONS}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                />
                            )}
                        />
                        <div className={styles.fullSpan}>
                            <Input label="Location" {...register("location")} />
                        </div>
                    </div>
                    <div className={styles.formActions}>
                        <button
                            type="button"
                            className={styles.cancelBtn}
                            onClick={() => setEditing(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </button>
                        <Button type="submit" loading={isPending}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            ) : (
                <div className={`${styles.grid} ${styles.fadeIn}`}>
                    <Field label="First Name" value={profile.firstName} />
                    <Field label="Last Name" value={profile.lastName} />
                    <Field label="Email" value={profile.email} />
                    <Field label="Age" value={profile.age} />
                    <Field label="Gender" value={profile.gender} capitalize />
                    <Field label="Location" value={profile.location} />
                </div>
            )}
        </div>
    );
};
