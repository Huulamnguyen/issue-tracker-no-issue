import React from "react";
interface Props {
  message: string;
}

const AnnouncementBar = ({ message }: Props) => {
  return (
    <div className="bg-red-500 text-white py-3 px-4">
      <div className="container mx-auto">
        <p className="text-center text-sm">{message}</p>
      </div>
    </div>
  );
};

export default AnnouncementBar;
