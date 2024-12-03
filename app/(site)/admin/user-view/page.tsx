import React from "react";
import DisplayUserData from "@/app/ui/components/db/DisplayUserData";
import { monoton } from "@/app/ui/fonts/fonts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { getAllUsersWithRolesAndPhotos } from "@/database/queries/user/getAllUsers";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const currentUsername = session?.user.username || "";

  // Fetch all users with roles and photos
  const users = await getAllUsersWithRolesAndPhotos();

  return (
    <div className="pt-8 text-base-content">
      <h2 className={`${monoton.className} text-5xl text-center`}>Users of GameTrees</h2>
      <div className="flex flex-col space-y-[8em] pt-[5em]">
        <DisplayUserData currentUsername={currentUsername} users={users} />
      </div>
    </div>
  );
};

export default Page;
