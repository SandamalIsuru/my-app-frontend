import React from "react";

const Card = ({ image, name, email, mobile, address }) => {
  return (
    <div className="flex bg-white p-4 border-b-8 border-disableColor">
      <div className="w-1/3 h-full">
        <img src={image} alt={email} />
      </div>
      <div className="flex flex-col justify-start xxs:text-sm md:text-md w-2/3 h-full ml-2">
        <div className="font-bold mb-2">{name}</div>
        <div className="text-textBlue underline mb-2">{email}</div>
        <div className="text-textBlue underline mb-2">{mobile}</div>
        <div className="">{address}</div>
      </div>
    </div>
  );
};

export default Card;
