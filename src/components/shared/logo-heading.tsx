import React from "react";
import { FolderCode } from "lucide-react";

export default function LogoHeading() {
  return (
    <h2 className="flex text-primary items-center gap-2 text-xl font-bold">
      <FolderCode size={35} className="text-primary" /> Exam App
    </h2>
  );
}
