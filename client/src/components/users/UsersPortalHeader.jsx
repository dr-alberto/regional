import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../../hooks/useAuthContext";


export const UsersPortalHeader = ({
  siteId,
  siteDomain,
  portalId,
  portalName,
  count
}) => {

  const { user } = useAuthContext();

  async function downloadCSV(e) {
    if (count > 0) {
      const response = await fetch(`/api/customers/${portalId}/download`, {
        headers: {
          "x-access-token": user.token,
        },
      });
      const blob = await response.blob();
      const link = document.createElement("a");

      link.href = window.URL.createObjectURL(new Blob([blob]));
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <header className="my-6">
      <div className="flex gap-x-2 items-center text-sm">
        <a
          href="/users"
          className="text-sm font-bold text-teal-600 hover:text-teal-800"
        >
          Users
        </a>
        <ChevronRightIcon className="w-3 h-3" />
        <a
          href={`/users/${siteId}`}
          className="text-sm font-bold text-teal-600 hover:text-teal-800"
        >
          https://
          {siteDomain}
        </a>
        <ChevronRightIcon className="w-3 h-3" />
        <a
          href={`/users/${siteId}/${portalId}`}
          className="text-sm font-bold text-teal-600 hover:text-teal-800"
        >
          {portalName}
        </a>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mt-2 mb-4">Users</h1>
        <button
          onClick={downloadCSV}
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Download CSV
        </button>
      </div>
    </header>
  );
};
