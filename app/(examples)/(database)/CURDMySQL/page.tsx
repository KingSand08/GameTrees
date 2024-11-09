import React from "react";
import DisplayUserData from "@/database/DisplayUserData";
import ModifyUserData from "@/database/ModifyUserData";

const Page = async () => {
  return (
    <div>
      <h2 className="text-2xl">MySQL with Server Action in Next.js</h2>
      <ModifyUserData />
      <DisplayUserData />
    </div>
  );
};

export default Page;


