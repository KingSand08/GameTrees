import Link from "next/link"

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
// export const instant = false;

const Page = () => {
    return (
        <div className=" flex flex-col">
            <h4 className="text-3xl">Route to Route Information Example</h4>
            <Link href="/readInfoServerSideTest">
                Open Link SS
            </Link>
            <Link href={{
                pathname: "/readInfoServerSideTest",
                query: { msg: "This is pass data to route" }
            }
            }>
                Send Link SS
            </Link>
            <Link href="/readInfoClientSideTest">
                Open Link CS
            </Link>
            <Link href={{
                pathname: "/readInfoServerSideTest",
                query: { msg: "This is pass data to route" }
            }
            }>
                Send Link CS
            </Link>
        </div >
    )
}

export default Page;