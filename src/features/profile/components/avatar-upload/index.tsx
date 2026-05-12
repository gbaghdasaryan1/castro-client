import { FC, useState, useRef } from "react";
import styles from "./avatarUpload.module.scss";
import { IconCamera } from "@assets/icons";
import { useUpdateProfile } from "@features/profile/hooks";
import { uploadImage } from "@features/profile/profile-api";
import { UserProfile } from "@features/profile/types";
import { Button } from "@shared/ui/button";

type Props = {
    profile: UserProfile;
}

export const AvatarUpload: FC<Props> = ({ profile }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { mutate: update } = useUpdateProfile();

    const initials =
        [profile.firstName, profile.lastName]
            .filter(Boolean)
            .map((n) => n![0].toUpperCase())
            .join("") || profile.email[0].toUpperCase();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (!f.type.startsWith("image/")) {
            setUploadError("Please select an image file.");
            return;
        }
        if (f.size > 5 * 1024 * 1024) {
            setUploadError("Image must be under 5 MB.");
            return;
        }
        setUploadError(null);
        setFile(f);
        setPreview(URL.createObjectURL(f));
    };

    const handleSave = async () => {
        if (!file) return;
        setUploading(true);
        setUploadError(null);
        try {
            const url = await uploadImage(file);
            update(
                { profilePicture: url },
                {
                    onSuccess: () => {
                        setPreview(null);
                        setFile(null);
                    },
                    onError: (err) => setUploadError(err.message),
                }
            );
        } catch (err: unknown) {
            setUploadError(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleCancel = () => {
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        setFile(null);
        setUploadError(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const displaySrc = preview ?? profile.profilePicture;

    return (
        <div className={styles.avatarSection}>
            <div
                className={styles.avatarWrap}
                onClick={() => !preview && inputRef.current?.click()}
                title={preview ? undefined : "Change profile photo"}
            >
                {displaySrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={displaySrc} alt="Profile" className={styles.avatar} />
                ) : (
                    <div className={styles.avatarFallback}>{initials}</div>
                )}
                {!preview && (
                    <div className={styles.cameraOverlay}>
                        <IconCamera />
                    </div>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className={styles.hiddenInput}
                onChange={handleFileChange}
            />

            {uploadError && (
                <p className={styles.avatarError}>{uploadError}</p>
            )}

            {preview && (
                <div className={styles.avatarActions}>
                    <button
                        className={styles.cancelBtn}
                        onClick={handleCancel}
                        disabled={uploading}
                    >
                        Cancel
                    </button>
                    <Button onClick={handleSave} loading={uploading}>
                        Save Photo
                    </Button>
                </div>
            )}
        </div>
    );
};
