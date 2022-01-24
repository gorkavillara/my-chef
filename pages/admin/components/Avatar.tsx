import React from "react";
import Image from "next/image"

type AvatarProps = {
  image: string;
};

const Avatar = ({ image }: AvatarProps) => {
  return (
    <div className="w-12 h-12 rounded-full overflow-hidden">
      <Image src={image} alt={image} width={200} height={250} layout="intrinsic" />
    </div>
  );
};

export default Avatar;
