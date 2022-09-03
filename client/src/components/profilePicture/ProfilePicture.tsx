import React from "react";
import Avatar from "boring-avatars";
import { useAuth } from "../../contexts/AuthContext";

interface ProfilePictureProps {
  size: number;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  size,
}): JSX.Element => {
  const { currentUser } = useAuth();
  return (
    <Avatar
      size={size}
      name={currentUser?.email as string}
      variant="beam"
      colors={["#BFF6F8", "#87EE90", "#BAFF5D", "#20C71C", "#087F00"]}
    />
  );
};
