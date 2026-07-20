import React from "react";
import "./CustomAlert.css";

type AlertVariant = "success" | "error" | "warning" | "info";

interface Props {
  title: string;
  message: string;
  variant?: AlertVariant;
  buttonText?: string;
  onClose: () => void;
}

const iconMap: Record<AlertVariant, string> = {
  success: "OK",
  error: "!",
  warning: "!",
  info: "i",
};

const CustomAlert: React.FC<Props> = ({
  title,
  message,
  variant = "info",
  buttonText = "OK",
  onClose,
}) => {
  return (
    <div className="custom-alert-overlay" onClick={onClose}>
      <div
        className={`custom-alert custom-alert-${variant}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="custom-alert-title"
      >
        <div className="custom-alert-icon" aria-hidden="true">
          {iconMap[variant]}
        </div>

        <div className="custom-alert-content">
          <h3 id="custom-alert-title">{title}</h3>
          <p>{message}</p>
        </div>

        <button className="custom-alert-button" onClick={onClose}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
