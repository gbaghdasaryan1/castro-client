import { FC, useState, useRef, useEffect, KeyboardEvent, useId } from "react";
import styles from "./select.module.scss";

export type SelectOption = { label: string; value: string };

type Props = {
    label?: string;
    error?: string;
    placeholder?: string;
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    name?: string;
    disabled?: boolean;
};

export const Select: FC<Props> = ({
    label,
    error,
    placeholder = "Select an option",
    options,
    value,
    onChange,
    onBlur,
    name,
    disabled,
}) => {
    const [open, setOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const id = useId();

    const selected = options.find((o) => o.value === value);

    useEffect(() => {
        if (!open) {
            setFocusedIndex(-1);
            return;
        }
        const currentIndex = options.findIndex((o) => o.value === value);
        setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
    }, [open]);

    useEffect(() => {
        if (open && listRef.current && focusedIndex >= 0) {
            const item = listRef.current.children[focusedIndex] as HTMLElement;
            item?.scrollIntoView({ block: "nearest" });
        }
    }, [focusedIndex, open]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
                onBlur?.();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onBlur]);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (disabled) return;
        switch (e.key) {
            case "Enter":
            case " ":
                e.preventDefault();
                if (open && focusedIndex >= 0) {
                    onChange?.(options[focusedIndex].value);
                    setOpen(false);
                    onBlur?.();
                } else {
                    setOpen(true);
                }
                break;
            case "ArrowDown":
                e.preventDefault();
                if (!open) { setOpen(true); break; }
                setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                setFocusedIndex((i) => Math.max(i - 1, 0));
                break;
            case "Escape":
                setOpen(false);
                onBlur?.();
                break;
            case "Tab":
                setOpen(false);
                break;
        }
    };

    const handleSelect = (optionValue: string) => {
        onChange?.(optionValue);
        setOpen(false);
        onBlur?.();
    };

    const triggerClass = [
        styles.trigger,
        open && styles.triggerOpen,
        error && styles.triggerError,
        disabled && styles.triggerDisabled,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={styles.field} ref={containerRef}>
            {label && (
                <label className={styles.label} htmlFor={id}>
                    {label}
                </label>
            )}

            <button
                id={id}
                type="button"
                role="combobox"
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-controls={`${id}-list`}
                className={triggerClass}
                onClick={() => !disabled && setOpen((o) => !o)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                name={name}
            >
                <span className={selected ? styles.selectedText : styles.placeholder}>
                    {selected ? selected.label : placeholder}
                </span>
                <svg
                    className={[styles.chevron, open && styles.chevronOpen].filter(Boolean).join(" ")}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {open && (
                <ul
                    id={`${id}-list`}
                    ref={listRef}
                    role="listbox"
                    className={styles.dropdown}
                >
                    {options.map((option, i) => (
                        <li
                            key={option.value}
                            role="option"
                            aria-selected={option.value === value}
                            className={[
                                styles.option,
                                option.value === value && styles.optionSelected,
                                i === focusedIndex && styles.optionFocused,
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleSelect(option.value)}
                            onMouseEnter={() => setFocusedIndex(i)}
                        >
                            <span>{option.label}</span>
                            {option.value === value && (
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};
