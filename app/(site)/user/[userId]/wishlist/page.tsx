export default async function CustomerWishlist({ params }: { params: Promise<{ userId: string }> }) {

    return (
        <>
            <h1>Wishlist page for (user :: {
                (await params).userId})</h1>
        </>
    );
}