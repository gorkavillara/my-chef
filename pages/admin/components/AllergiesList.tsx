import React from "react";

const Allergy = ({ text }: { text: string }) => <span className="bg-red-400 text-xs text-white py-1 px-2 rounded-full">{text}</span>;

const AllergiesList = ({ allergies }: { allergies: string[] }) => {
  return (
    <div className="flex gap-1 flex-wrap">
      {allergies.map((allergy, i) => (
        <Allergy key={i} text={allergy} />
      ))}
    </div>
  );
};

export default AllergiesList;
