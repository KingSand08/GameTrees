import React from "react";
// import SessionClient from "@/nextauth/SessionClient"
import SessionServer from "@/nextauth/SessionServer";

export default function page() {
    return (
        <div>
            <h1>account settings</h1>
            <div className="mt-8">
                {/* <SessionServer /> */}
                <SessionServer />
            </div>
        </div>
    );
}
