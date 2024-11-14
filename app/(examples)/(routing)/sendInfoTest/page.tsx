import Link from "next/link"

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