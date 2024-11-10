const Page = async (props: { searchParams: Promise<{ msg?: string }> }) => {
    const searchParams = await props.searchParams;
    return (
        <>
            <h4 className="text-3xl">This is for Reading Information by Link Component via Sever Side</h4>
            {searchParams.msg ? searchParams.msg : null}
        </>
    );
}

export default Page;