import React from "react";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
// export const instant = false;

// import DisplayUserData from "@/app/ui/components/db/DisplayUserData";
// import ModifyUserData from "@/app/ui/components/db/ModifyUserData";

const Page = async () => {
  return (
    <div>
      <h2 className="text-2xl">Users of GameTrees</h2>
      <div className="flex flex-col space-y-[8em] pt-[5em]">
        {/* <ModifyUserData /> */}
        {/* <DisplayUserData /> */}
      </div>
    </div>
  );
};

export default Page;


