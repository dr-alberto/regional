import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import { TextLink } from "../components/TextLink";

export default function Settings() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [userPlan, setUserPlan] = useState();

  useEffect(() => {
    const fetchUserPlan = async () => {
      fetch("/api/subInfo", {
        headers: {
          "x-access-token": user.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserPlan(data.plan);
        })
        .catch((error) => {});
    };

    const fetchData = async () => {
      await fetchUserPlan();
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar name={"Settings"} />
      <header className="bg-white border-b border-zinc-100">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Settings
          </h1>
        </div>
      </header>
      <main>
        {!loading && (
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h2 className="mb-4 text-lg font-semibold leading-7 text-gray-800">
              Support
            </h2>

            <div className="mt-5">
              Have a question? Email us at:{" "}
              <a href="mailto:info@regionalhq.com" className="text-blue-700">
                info@regionalhq.com
              </a>
            </div>

            <h2 className="mt-10 mb-4 text-lg font-semibold leading-7 text-gray-800">
              Billing
            </h2>

            <div className="mt-5">
              <span className="font-bold">Plan: </span>
              {userPlan === 0 && "No plan selected"}
              {userPlan === 1 && "Startup"}
              {userPlan === 2 && "Expansion"}
              {userPlan === 3 && "Growth"}

              {userPlan === 0 && <TextLink text={"Select plan"} url={"/billing"} />}
              {userPlan !== 0 && <TextLink text={"Manage plan"} url={"/billing"} />}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
