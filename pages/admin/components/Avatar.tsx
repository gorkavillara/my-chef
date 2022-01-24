import React from "react";

type AvatarProps = {
  image: string;
};

const Avatar = ({ image }: AvatarProps) => {
  return (
    <div className="w-12 h-12 rounded-full overflow-hidden">
      <img src={image} alt={image} />
    </div>
  );
};

export default Avatar;
