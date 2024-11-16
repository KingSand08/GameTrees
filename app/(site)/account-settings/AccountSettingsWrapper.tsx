"use client";

import React, { useState } from "react";
import ClientAccountSettings from "@/app/(site)/account-settings/ClientAccountSettings";

export default function AccountSettingsPageWrapper() {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="flex justify-center items-center">
            {!isEditing ? (
                <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Edit User Account
                </button>
            ) : (
                <div className="rounded-lg shadow-lg p-8 max-w-3xl w-full">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg mb-4 hover:bg-red-600 transition"
                    >
                        Close
                    </button>
                    <ClientAccountSettings />
                </div>
            )}
        </div>
    );
}
