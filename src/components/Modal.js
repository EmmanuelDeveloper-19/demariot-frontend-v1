import React from "react";

export const Modal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Aceptar", cancelText = "Cancelar", onlyConfirm = false, icon = null }) => {

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                {icon && (
                    <div className="modal-icon-container">
                        <span className="modal-icon">{icon}</span>
                    </div>
                )}
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="modal-buttons">
                    {!onlyConfirm && (
                        <button className="btn btn-cancel w-100" onClick={onCancel}>
                            {cancelText}
                        </button>
                    )}
                    <button className="btn btn-primary w-100" onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};