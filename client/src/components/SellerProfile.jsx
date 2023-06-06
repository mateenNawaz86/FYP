import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../UI/Spinner";

import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FcCallback } from "react-icons/fc";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { GiSkills } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const SellerProfile = () => {
  const [profile, setProfile] = useState(null);
  const token = useSelector((state) => state.profile.token);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/profile-detail", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setLoading(true);
      const profileData = await response.json();
      setLoading(false);
      setProfile(profileData);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center text-red-600 font-semibold tracking-wider">
        Profile NOT Found!
      </div>
    );
  }

  const handleEditProfile = () => {
    navigate(`/update-profile`, { state: { profileData: profile } });
  };

  return (
    <main className="py-4 md:py-10">
      <section className="w-4/5 m-auto mb-12">
        <h1 className="text-lg uppercase sm:text-xl md:text-3xl text-orange-500 font-semibold text-center">
          {profile.name} Profile
        </h1>

        <article className="flex flex-col lg:flex-row gap-8 justify-between items-center mt-12 shadow-xl p-8 rounded-sm">
          <img
            src={profile.imgURL}
            alt="Profile"
            className="rounded-full w-52 h-auto border-dashed border-2 border-orange-600 hover:shadow-lg sm:rounded-sm"
          />

          <div className="ml-8">
            <h1 className="text-lg sm:text-3xl font-semibold tracking-wide text-purple-600">
              {profile.name}
            </h1>
            <p className="text-[#757575] text-xs sm:text-base my-3">
              {profile.description}
            </p>
            <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row  justify-between">
              <div className="flex items-center">
                <MdOutlineMarkEmailRead className="text-red-400" />
                <p className="ml-2 text-[#757575]">{profile.email}</p>
              </div>
              <div className="flex items-center">
                <FcCallback />
                <p className="ml-2 text-[#757575]">{profile.contactNum}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row my-2 justify-between">
              <div className="flex items-center">
                <BsFillPersonVcardFill className="text-blue-500" />
                <p className="ml-2 text-[#757575]">{profile.cnicNumber}</p>
              </div>
              <div className="flex items-center">
                <GiSkills className="text-green-400" />
                <p className="ml-2 text-[#757575]">{profile.skill}</p>
              </div>
            </div>
            <div className="flex items-center mb-3">
              <HiOutlineLocationMarker className="text-pink-500" />
              <p className="ml-2 text-[#757575]">{profile.address}</p>
            </div>
            <button
              onClick={handleEditProfile}
              className="bg-[#4280EA] text-white text-lg rounded py-1 px-4 hover:bg-[#000000] hover:ease-in duration-200 "
            >
              Edit
            </button>
          </div>
        </article>
      </section>
      <hr />
    </main>
  );
};

export default SellerProfile;
