import React from "react";
import { FolderCode } from "lucide-react";

export default function LogoHeading() {
  return (
    <h2 className="flex text-primary items-center gap-2 text-lg lg:text-xl font-bold">
      <FolderCode size={28} className="text-primary lg:w-[35px] lg:h-[35px]" />{" "}
      Exam App
    </h2>
  );
}
