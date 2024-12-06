import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";

export async function getServerSessionAndUpdate(authOptions: AuthOptions, updatedUserData: Record<string, unknown>) {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    return {
        ...session,
        user: {
            ...session.user,
            ...updatedUserData,
        },
    };
}
