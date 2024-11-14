import React from "react";
import SessionServer from "@/nextauth/SessionServer"
import SessionClient from "@/nextauth/SessionClient"

export default function page() {
    return (
        <div>
            <h1>account settings</h1>
            <div className="mt-8">
                {/* <SessionServer /> */}
                <SessionClient />
            </div>
        </div>
    );
}
