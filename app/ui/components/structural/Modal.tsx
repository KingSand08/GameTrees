"use client";

import React, { useEffect, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";

type ModalProps = {
    children: ReactNode;
    onClose?: () => void;
    callbackUrl?: string;
    show?: boolean;
};

const Modal: React.FC<ModalProps> = ({ children, onClose, callbackUrl = "/", show = true }) => {
    const router = useRouter();

    const handleClose = useCallback(() => {
        const modal = document.getElementById("custom_modal") as HTMLDialogElement;
        if (modal) modal.close();

        if (onClose) {
            onClose();
        } else {
            try {
                router.back();
            } catch {
                router.push(callbackUrl);
            }
        }
    }, [onClose, router, callbackUrl]);

    useEffect(() => {
        const modal = document.getElementById("custom_modal") as HTMLDialogElement;
        if (modal && show) {
            modal.showModal();
        }

        return () => {
            if (modal) {
                modal.close();
            }
        };
    }, [show]);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") handleClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [handleClose]);

    return (
        <div autoFocus={false}>
            <dialog id="custom_modal" className="modal">
                <div className="modal-box relative">
                    {/* Close button */}
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={handleClose}
                    >
                        ✕
                    </button>
                    {/* Render children content inside the modal */}
                    {children}
                </div>
            </dialog>
        </div>
    );
};

export default Modal;
