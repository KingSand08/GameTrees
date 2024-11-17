import React from "react";
import DisplayUserData from "@/app/ui/components/db/DisplayUserData";
import { monoton } from "@/app/ui/fonts/fonts";

const Page = async () => {
  return (
    <div className="pt-8">
      <h2 className={`${monoton.className} text-5xl text-center`}>Users of GameTrees</h2>
      <div className="flex flex-col space-y-[8em] pt-[5em]">
        <DisplayUserData />
      </div>
    </div>
  );
};

export default Page;


