import React from "react";
import ProfileForm from "../../components/ProfileForm";

const Profile = ({ alertHandler }) => {
  return (
    <>
      <ProfileForm alertHandler={alertHandler} />
    </>
  );
};

export default Profile;
