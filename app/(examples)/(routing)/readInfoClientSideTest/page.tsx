"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Message() {
    const searchParams = useSearchParams();
    return <>{searchParams.get("msg")}</>;
}

export default function Page() {
    return (
        <>
            <h4 className="text-3xl">
                This is for Reading Information by Link Component via Client Side
            </h4>
            <Suspense fallback={null}>
                <Message />
            </Suspense>
        </>
    );
}
