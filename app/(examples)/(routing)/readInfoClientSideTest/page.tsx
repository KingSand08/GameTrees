"use client";

import { useSearchParams } from "next/navigation";

const Page = () => {
    const searchParams = useSearchParams();

    return (
        <>
            <h4 className="text-3xl">This is for Reading Information by Link Component via Client Side</h4>
            {searchParams.get('msg') ? searchParams.get('msg') : null}
        </>
    );
}

export default Page;