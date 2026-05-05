import { useEffect, useRef, useState } from "react";
import styles from "./otp.module.scss";
import Modal from "../Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
};

const OtpModal = ({ isOpen, onClose, onSubmit }: Props) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleClose = () => {
    setOtp(["", "", "", "", "", ""]);
    onClose();
  };

  const handleSubmit = (val: string) => {
    setOtp(["", "", "", "", "", ""]);
    onSubmit(val);
  };

  // auto focus first input
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // numbers only

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move next
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    // auto submit
    if (newOtp.every((v) => v !== "")) {
      handleSubmit(newOtp.join(""));
    }
  };

  const handleKeyDown = (e: any, index: number) => {
    // backspace move previous
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const value = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(value)) return;

    const digits = value.split("");

    const newOtp = [...otp];
    digits.forEach((d, i) => {
      newOtp[i] = d;
    });

    setOtp(newOtp);

    if (digits.length === 6) {
      handleSubmit(value);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className={styles.wrapper}>
        <h2>Enter OTP</h2>
        <p>We sent a 6-digit code</p>

        <div className={styles.inputs}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              inputMode="numeric"
            />
          ))}
        </div>

        <button
          className={styles.button}
          onClick={() => handleSubmit(otp.join(""))}
        >
          Verify
        </button>
      </div>
    </Modal>
  );
};

export default OtpModal;
