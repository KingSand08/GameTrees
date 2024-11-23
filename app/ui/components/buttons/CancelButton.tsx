import Link from "next/link";

const CancelButton = ({ props }: { props: { callbackUrl?: string } }) => {
    return (
        <Link
            href={props.callbackUrl ?? "/"}
            className='w-full text-lg border border-red-700 text-center py-2 rounded-md text-red-600 transition hover:bg-red-600 hover:text-white hover:border-transparent active:scale-95'>
            Cancel
        </Link>
    )
}

export default CancelButton