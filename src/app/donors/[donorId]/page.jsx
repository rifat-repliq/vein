"use client";

import Loader from "@/components/loaders/Loader";
import Rimap from "@/components/maps/Rimap";
import { getData } from "@/fetchers";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

function DonorDetail({ params }) {
  const { donorId } = params;

  const { isLoading, data, isError } = useQuery({
    queryKey: ["donor", donorId],
    queryFn: () => getData(`/users/${donorId}`),
  });

  // console.log(data);

  if (isLoading) return <Loader />;

  return (
    <main className="container pt-24">
      <div className="">
        <h3 className="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline">
          {`${data.firstName} ${data.lastName}'s`} profile
        </h3>

        <div className="my-5 py-5">
          <div className="md:flex no-wrap gap-4">
            {/* Left Side */}
            <div className="w-full md:w-3/12 border">
              {/* Profile Card */}
              <div className="bg-white p-3 border-t-4 border-red-500">
                <div className="image relative">
                  <Image
                    className="h-auto w-full mx-auto"
                    width={200}
                    height={300}
                    src={data.image}
                    alt={data.firstName}
                    priority={true}
                  />
                  <div className="absolute -top-8 -right-5 w-12 h-12 rounded-full rounded-es-none grid place-items-center bg-red-500 text-white font-bold">
                    {data.bloodGroup}
                  </div>
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                  {data.firstName + " " + data.lastName}
                </h1>
                <h3 className="text-gray-600 font-lg text-semibold leading-6">
                  {data.company.title}
                </h3>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, eligendi dolorum sequi illum qui unde
                  aspernatur non deserunt
                </p>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        Active
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">Nov 07, 2016</span>
                  </li>
                </ul>
              </div>
              {/* End of profile card */}
              <div className="my-4" />
            </div>
            {/* Right Side */}
            <div className="w-full md:w-9/12 h-64 ">
              {/* About Section */}
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">First Name</div>
                      <div className="px-4 py-2">{data.firstName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Last Name</div>
                      <div className="px-4 py-2">{data.lastName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">{data.gender}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">{data.phone}</div>
                    </div>

                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">
                        <a
                          className="text-blue-800"
                          href="mailto:jane@example.com"
                        >
                          {data.email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Birthday</div>
                      <div className="px-4 py-2">{data.birthDate}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Current Address
                      </div>
                      <div className="px-4 py-2">
                        {`${data.address.address}, ${data.address.city}, ${data.address.state}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End of about section */}
              <div className="h-[370px] w-full ring ring-red-300">
                <Rimap
                  isMarkerShown={true}
                  centerPosition={{
                    lat: data.address.coordinates.lat,
                    lng: data.address.coordinates.lng,
                  }}
                  markerPosition={{
                    lat: data.address.coordinates.lat,
                    lng: data.address.coordinates.lng,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DonorDetail;
