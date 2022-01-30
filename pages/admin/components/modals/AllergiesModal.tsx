import React from "react";
import AllergiesList from "../AllergiesList";

const AllergiesModal = ({ allergies = [] }: { allergies: string[] }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-semibold text-lg">Allergies List</h1>
      <AllergiesList allergies={allergies} style="modal" />
    </div>
  );
};

export default AllergiesModal;
