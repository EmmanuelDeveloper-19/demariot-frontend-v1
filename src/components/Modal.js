import React from "react";
import "../styles/modal.css";

export const Modal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Aceptar", cancelText = "Cancelar", onlyConfirm = false }) => {

    if (!isOpen) return null;

    return(
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="modal-buttons">
                    {!onlyConfirm && (
                        <button className="btn cancel" onClick={onCancel}>
                            {cancelText}
                        </button>
                    )}
                    <button className="btn confirm" onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};