import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { CreatePromptModal } from "./CreatePromptModal";
import { UpgradePlanModal } from "../UpgradePlanModal";
import { PromptOptions } from "./PromptOptions";
import { FolderPlusIcon, PlusIcon } from "@heroicons/react/24/outline";

export const PromptsSection = ({ portals }) => {
  const { siteId } = useParams();
  const { user } = useAuthContext();
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [openUpgradeModal, setOpenUpgradeModal] = useState(false);
  const [userPlan, setUserPlan] = useState();

  const formatter = Intl.NumberFormat(undefined, { notation: "compact" });

  useEffect(() => {
    const fetchPortals = async () => {
      try {
        const response = await fetch(`/api/prompts?siteId=${siteId}`, {
          headers: {
            "x-access-token": user.token,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setPrompts(result);
        }
      } catch (error) {}
    };

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
      try {
        await fetchPortals();
        await fetchUserPlan();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addPrompt = () => {
    if (
      userPlan === 0 ||
      (userPlan === 1 && prompts.length >= 1) ||
      (userPlan === 2 && prompts.length >= 10)
    ) {
      setOpenUpgradeModal(true);
    } else {
      handlePromptCreation();
    }
  };

  const handlePromptCreation = async () => {
    setOpen(true);
    setErrors({});
  };

  return (
    !isLoading && (
      <div>
        <CreatePromptModal
          portals={portals}
          open={open}
          setOpen={setOpen}
          errors={errors}
          setErrors={setErrors}
        />
        <UpgradePlanModal
          open={openUpgradeModal}
          setOpen={setOpenUpgradeModal}
        ></UpgradePlanModal>
        <div className="flex items-center justify-between mt-10">
          <h1 className="text-2xl font-semibold mt-8 mb-4">Prompts</h1>
          <button
            onClick={addPrompt}
            className="flex gap-x-2 items-center h-fit rounded-md bg-teal-600 text-white px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-teal-600/50 hover:opacity-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={4.5}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new
          </button>
        </div>

        {prompts.length > 0 && (
          <table className="w-full border-t-2">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-800 uppercase">
                  Name
                </th>
                <th className="py-3 border-b-2 text-center text-xs font-semibold text-gray-800 uppercase">
                  Views
                </th>
                <th className="px-5 py-3 border-b-2 text-end text-xs font-semibold text-gray-800 uppercase"></th>
              </tr>
            </thead>
            <tbody>
              {prompts.map((prompt, index) => {
                return (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border-b border-gray-200 text-sm relative px-5 py-3">
                      <a
                        className="block h-full w-full absolute top-0 bottom-0 left-0 right-0"
                        href={`/prompts/${prompt._id}/edit`}
                      ></a>
                      <p class="text-gray-900 whitespace-no-wrap">
                        {prompt.name}
                      </p>
                    </td>
                    <td class="border-b border-gray-200 text-sm relative py-3 text-center">
                      <a
                        className="block h-full w-full absolute top-0 bottom-0 left-0 right-0"
                        href={`/prompts/${prompt._id}/edit`}
                      ></a>
                      <p class="text-gray-900 whitespace-no-wrap">
                        {formatter.format(prompt.views)}
                      </p>
                    </td>
                    <td class="px-5 border-b flex border-gray-200 text-sm">
                      <div className="ms-auto">
                        <PromptOptions prompt={prompt}></PromptOptions>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {prompts.length === 0 && (
          <div className="flex-cols text-center mt-10">
            <FolderPlusIcon className="h-8 w-8 mx-auto" aria-hidden="true" />
            <p className="font-bold mt-2">No prompts</p>
            <p className="text-sm text-gray-600">
              Get started by adding a new prompt
            </p>
            <button
              onClick={addPrompt}
              target="_blank"
              className="mx-auto mt-4 flex gap-x-2 items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
              New prompt
            </button>
          </div>
        )}
      </div>
    )
  );
};
