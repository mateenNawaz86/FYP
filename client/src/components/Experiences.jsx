import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Experiences = () => {
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/experience", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const jsonData = await response.json();

      setData(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const name = useSelector((state) => state.profile.user);
  return (
    <>
      <main className="py-4 md:py-6">
        <section className="w-4/5 m-auto mb-12">
          <h1 className="text-lg uppercase sm:text-xl md:text-3xl text-orange-500 font-semibold text-center mb-6">
            {name} Experience
          </h1>

          {!data ? (
            <h2 className="text-red-500 font-semibold text-2xl text-center">
              No Experience Yet!
            </h2>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col bg-[#f6f6f6] p-6 rounded-lg shadow-2xl active:shadow-2xl transition-all duration-200 hover:shadow-none"
                  >
                    <div className="flex flex-col sm:flex-row justify-between">
                      <h2 className="text-sm sm:text-lg font-medium text-purple-500">
                        {item.title}
                      </h2>
                      <div className="flex items-center">
                        <p className="mr-2 text-pink-500 text-xs sm:text-base">
                          {item.start}
                        </p>
                        -
                        <p className="ml-2 text-pink-500 text-xs sm:text-base">
                          {item.end}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm sm:text-lg text-orange-500 mt-1 mb-2">
                      {item.companyName}
                    </div>
                    <div className="keys">
                      <h2 className="text-base sm:text-xl text-blue-600 font-medium">
                        Key Responsibilities:
                      </h2>
                      <p className="text-xs sm:text-base">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
        <hr />
      </main>
    </>
  );
};

export default Experiences;
