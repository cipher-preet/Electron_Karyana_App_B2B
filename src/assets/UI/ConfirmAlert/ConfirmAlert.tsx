import React from "react";
import "./ConfirmAlert.css";

interface Props {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmAlert: React.FC<Props> = ({
  title = "Are you sure?",
  message,
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">

        <h3>{title}</h3>
        <p>{message}</p>

        <div className="confirm-actions">
          <button className="btn cancel" onClick={onCancel}>
            {cancelText}
          </button>

          <button className="btn confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
