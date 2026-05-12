import { FC, useState, useRef } from "react";
import styles from "./photosGrid.module.scss";
import { IconCamera, IconPlus } from "@assets/icons";
import { MAX_PHOTOS } from "@features/profile/constants";
import { useUpdateProfile } from "@features/profile/hooks";
import { uploadImage } from "@features/profile/profile-api";
import { PhotoSlot, UserProfile } from "@features/profile/types";
import { Button } from "@shared/ui/button";

type Props = {
    profile: UserProfile;
}

export const PhotosGrid: FC<Props> = ({ profile }) => {
    const [slots, setSlots] = useState<PhotoSlot[]>(() =>
        Array.from({ length: MAX_PHOTOS }, (_, i) => ({
            existingUrl: profile.images[i] ?? null,
            preview: null,
            file: null,
        }))
    );
    const [uploading, setUploading] = useState(false);
    const [photosError, setPhotosError] = useState<string | null>(null);
    const { mutate: update } = useUpdateProfile();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null]);

    const syncedSlots = slots.map((slot, i) => {
        if (slot.file || slot.preview || slot.existingUrl === null) return slot;
        return { ...slot, existingUrl: profile.images[i] ?? null };
    });

    const hasChanges = syncedSlots.some((s) => s.file !== null) ||
        syncedSlots.some((s, i) => s.existingUrl !== (profile.images[i] ?? null));

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (!f.type.startsWith("image/")) {
            setPhotosError("Please select an image file.");
            return;
        }
        if (f.size > 10 * 1024 * 1024) {
            setPhotosError("Each photo must be under 10 MB.");
            return;
        }
        setPhotosError(null);
        const newPreview = URL.createObjectURL(f);
        setSlots((prev) => {
            const updated = [...prev];
            if (updated[index].preview) URL.revokeObjectURL(updated[index].preview!);
            updated[index] = { ...updated[index], preview: newPreview, file: f };
            return updated;
        });
    };

    const handleRemove = (index: number) => {
        setSlots((prev) => {
            const updated = [...prev];
            if (updated[index].preview) URL.revokeObjectURL(updated[index].preview!);
            updated[index] = { existingUrl: null, preview: null, file: null };
            return updated;
        });
        const ref = inputRefs.current[index];
        if (ref) ref.value = "";
    };

    const handleSave = async () => {
        setUploading(true);
        setPhotosError(null);
        try {
            const urls = await Promise.all(
                syncedSlots.map(async (slot) => {
                    if (slot.file) return await uploadImage(slot.file);
                    return slot.existingUrl;
                })
            );
            const images = urls.filter((u): u is string => Boolean(u));
            update(
                { images },
                {
                    onSuccess: () => {
                        setSlots(
                            urls.map((url) => ({
                                existingUrl: url ?? null,
                                preview: null,
                                file: null,
                            }))
                        );
                    },
                    onError: (err) => setPhotosError(err.message),
                }
            );
        } catch (err: unknown) {
            setPhotosError(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={styles.photosSection}>
            <div className={styles.photosSectionHeader}>
                <span className={styles.fieldLabel}>Photos (up to {MAX_PHOTOS})</span>
                {hasChanges && (
                    <Button onClick={handleSave} loading={uploading}>
                        Save Photos
                    </Button>
                )}
            </div>

            {photosError && <p className={styles.photosError}>{photosError}</p>}

            <div className={styles.photosGrid}>
                {syncedSlots.map((slot, i) => {
                    const displaySrc = slot.preview ?? slot.existingUrl;
                    return (
                        <div key={i} className={styles.photoSlot}>
                            {displaySrc ? (
                                <div className={styles.photoSlotFilled}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={displaySrc}
                                        alt={`Photo ${i + 1}`}
                                        className={styles.photoImg}
                                    />
                                    <button
                                        className={styles.photoRemoveBtn}
                                        onClick={() => handleRemove(i)}
                                        title="Remove"
                                    >
                                        ✕
                                    </button>
                                    <button
                                        className={styles.photoChangeBtn}
                                        onClick={() => inputRefs.current[i]?.click()}
                                        title="Change photo"
                                    >
                                        <IconCamera />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className={styles.photoSlotEmpty}
                                    onClick={() => inputRefs.current[i]?.click()}
                                >
                                    <IconPlus />
                                    <span>Add Photo</span>
                                </button>
                            )}
                            <input
                                ref={(el) => { inputRefs.current[i] = el; }}
                                type="file"
                                accept="image/*"
                                className={styles.hiddenInput}
                                onChange={(e) => handleFileChange(e, i)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
