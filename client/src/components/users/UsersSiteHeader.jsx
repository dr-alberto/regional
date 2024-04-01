import { ChevronRightIcon } from "@heroicons/react/24/outline";

export const UsersSiteHeader = ({ siteId, siteDomain }) => {
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
        <div className="text-sm text-gray-600">Select a portal</div>
      </div>

      <h1 className="text-2xl font-semibold mt-2 mb-4">Users</h1>
    </header>
  );
};
