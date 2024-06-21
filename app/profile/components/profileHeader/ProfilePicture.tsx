"use client";
import { Avatar } from "@nextui-org/avatar";

const ProfilePicture: React.FC = () => {
  return (
    <div className="profile-picture flex flex-col items-center">
      <Avatar src="/default-profile.png" name="John Doe" size="lg" isBordered color="primary" />
      <style jsx>
        {`.profile-picture { 
        }`}
      </style>
    </div>
  );
};

export default ProfilePicture;
