import { FC, useState, useEffect } from "react";
import styles from "./physicalSection.module.scss";
import { useForm } from "react-hook-form";
import { useUpdateProfile } from "@features/profile/hooks";
import { PhysicalFormData, UserProfile } from "@features/profile/types";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Field } from "../info-field";


type Props = {
    profile: UserProfile;
};

export const PhysicalSection: FC<Props> = ({ profile }) => {
    const [editing, setEditing] = useState(false);
    const { mutate, isPending, isError, error } = useUpdateProfile();
    const { register, handleSubmit, reset } = useForm<PhysicalFormData>();

    useEffect(() => {
        if (editing) {
            reset({
                eyeColor: profile.eyeColor ?? "",
                hairColor: profile.hairColor ?? "",
                height: profile.height ?? "",
                bust: profile.bust?.toString() ?? "",
                waist: profile.waist?.toString() ?? "",
                hips: profile.hips?.toString() ?? "",
                dressSize: profile.dressSize ?? "",
                shoes: profile.shoes ?? "",
            });
        }
    }, [editing]);

    const onSubmit = (data: PhysicalFormData) => {
        mutate(
            {
                eyeColor: data.eyeColor || null,
                hairColor: data.hairColor || null,
                height: data.height || null,
                bust: data.bust ? Number(data.bust) : null,
                waist: data.waist ? Number(data.waist) : null,
                hips: data.hips ? Number(data.hips) : null,
                dressSize: data.dressSize || null,
                shoes: data.shoes || null,
            },
            { onSuccess: () => setEditing(false) }
        );
    };

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <h3>Physical Stats</h3>
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
                        <Input label="Eye Color" {...register("eyeColor")} />
                        <Input label="Hair Color" {...register("hairColor")} />
                        <Input label="Height" placeholder="e.g. 5'8&quot;" {...register("height")} />
                        <Input label="Dress Size" {...register("dressSize")} />
                        <Input label="Shoes" {...register("shoes")} />
                        <Input label="Bust (cm)" type="number" {...register("bust")} />
                        <Input label="Waist (cm)" type="number" {...register("waist")} />
                        <Input label="Hips (cm)" type="number" {...register("hips")} />
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
                    <Field label="Eye Color" value={profile.eyeColor} capitalize />
                    <Field label="Hair Color" value={profile.hairColor} capitalize />
                    <Field label="Height" value={profile.height} />
                    <Field label="Dress Size" value={profile.dressSize} />
                    <Field label="Shoes" value={profile.shoes} />
                    <Field
                        label="Bust"
                        value={profile.bust != null ? `${profile.bust} cm` : null}
                    />
                    <Field
                        label="Waist"
                        value={profile.waist != null ? `${profile.waist} cm` : null}
                    />
                    <Field
                        label="Hips"
                        value={profile.hips != null ? `${profile.hips} cm` : null}
                    />
                </div>
            )}
        </div>
    );
};
