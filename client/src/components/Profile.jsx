import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchProfileById } from "../state/profileSlice";
import Spinner from "../UI/Spinner";

import { SlLocationPin } from "react-icons/sl";
import { FcBusiness, FcCallback } from "react-icons/fc";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProfileById(id));
  }, [dispatch, id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!profile) {
    return <div>No profile found.</div>;
  }

  const handleFetchReviews = (sellerId) => {
    // Redirect the user to the reviews page with the selected seller's ID
    // Use the react-router-dom's useHistory hook to navigate programmatically
    navigate(`/reviews/${sellerId}`);
  };

  return (
    <>
      <main className="py-4 md:py-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <section className="w-4/5 m-auto mb-12">
            <h1 className="text-lg uppercase sm:text-xl md:text-3xl text-orange-500 font-semibold text-center">
              {profile.name} Detail
            </h1>

            <article className="flex flex-col md:flex-row gap-8 justify-between items-center mt-12 shadow-xl p-8 rounded-sm">
              <img
                className="rounded-full w-40  border-dashed border-2 border-orange-600 hover:shadow-lg sm:rounded-sm"
                src={profile.imgURL}
                alt="Profile"
              />

              <div className="flex-grow flex flex-col">
                <h2 className="text-lg font-semibold">{profile.name}</h2>
                <p className="text-[#757575] my-2">{profile.description}</p>
                <div className="flex justify-between flex-col gap-3 sm:flex-row sm:items-center my-4">
                  <div className="flex items-center">
                    <FcCallback className="text-xl font-semibold text-[#E74133]" />
                    <p className="ml-3 text-[#757575]">{profile.contactNum}</p>
                  </div>
                  <div className="flex items-center">
                    <SlLocationPin className="text-xl font-semibold text-[#E74133]" />
                    <p className="ml-3 text-[#757575]">{profile.address}</p>
                  </div>
                  <div className="flex items-center">
                    <FcBusiness className="text-xl font-semibold text-[#E74133]" />
                    <p className="ml-3 text-[#757575]">{profile.skill}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    to={`/book-service/${profile._id}`}
                    className="bg-[#4280EA] text-white rounded-full py-1 px-4 w-fit hover:bg-[#000000] hover:ease-in duration-200"
                  >
                    Booking
                  </Link>

                  <button
                    className="bg-[#4280EA] text-white rounded-full py-1 px-4 w-fit hover:bg-[#000000] hover:ease-in duration-200"
                    onClick={() => handleFetchReviews(profile._id)}
                  >
                    Reviews
                  </button>
                </div>
              </div>
            </article>
          </section>
        )}
        <hr />
      </main>
    </>
  );
};

export default Profile;
