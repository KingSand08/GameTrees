export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ msg?: string | string[] }>;
}) {
    const { msg } = await searchParams;
    const message = Array.isArray(msg) ? msg[0] : msg;

    return (
        <>
            <h4 className="text-3xl">
                This is for Reading Information by Link Component via Server Side
            </h4>
            {message ?? null}
        </>
    );
}
