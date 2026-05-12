import { FC, useState, useEffect } from "react";
import styles from "./personalSection.module.scss";
import { useForm } from "react-hook-form";
import { useUpdateProfile } from "@features/profile/hooks";
import { UserProfile, UpdateProfileData, PersonalFormData } from "@features/profile/types";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Field } from "../info-field";

type Props = {
    profile: UserProfile;
};

export const PersonalSection: FC<Props> = ({ profile }) => {
    const [editing, setEditing] = useState(false);
    const { mutate, isPending, isError, error } = useUpdateProfile();
    const { register, handleSubmit, reset } = useForm<PersonalFormData>();

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

    const onSubmit = (data: PersonalFormData) => {
        mutate(
            {
                firstName: data.firstName || null,
                lastName: data.lastName || null,
                age: data.age ? Number(data.age) : null,
                location: data.location || null,
                gender: (data.gender || null) as UpdateProfileData["gender"],
            },
            { onSuccess: () => setEditing(false) }
        );
    };

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <h3>Personal Information</h3>
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
                    <div className={styles.formGrid}>
                        <Input label="First Name" {...register("firstName")} />
                        <Input label="Last Name" {...register("lastName")} />
                        <Input label="Age" type="number" min={1} max={120} {...register("age")} />
                        <div className={styles.selectField}>
                            <label className={styles.selectLabel}>Gender</label>
                            <select {...register("gender")} className={styles.select}>
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className={styles.fullSpan}>
                            <Input label="Location" {...register("location")} />
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
                <div className={styles.grid}>
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
