import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export const Modal = ({ show = true, onClose, children, className, callbackUrl = "/" }: IProps) => {
    const [isVisible, setIsVisible] = useState(show);
    const router = useRouter();

    const handleClose = useCallback(() => {
        setIsVisible(false);
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
        setIsVisible(show);
    }, [show]);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") handleClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [handleClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
                onClick={handleClose}
            />
            <div
                className={`relative bg-slate-800 rounded-lg shadow-lg transition-transform transform ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"} ${className}`}
                style={{
                    transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
                    width: "45%",

                }}
            >
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    onClick={handleClose}
                >
                    &times;
                </button>
                <div className="p-5">
                    {children}
                </div>
            </div>
        </div>
    );
};
