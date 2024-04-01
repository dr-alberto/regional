export const Header = ({ siteId, siteDomain, portalName, portalId }) => {
  return (
    <header className="flex justify-between items-center my-6">
      <div>
        <div className="flex gap-x-2 items-center text-sm">
          <a
            href={`/dashboard`}
            className="text-sm font-bold text-teal-600 hover:text-teal-800"
          >
            Sites
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
          <a
            href={`/sites/${siteId}`}
            className="text-sm font-bold text-teal-600 hover:text-teal-800"
          >
            https://
            {siteDomain}
          </a>
        </div>

        <div className="text-xl">{portalName}</div>
      </div>
      <div className="flex gap-x-2">
        <a
          href={`/test/${portalId}`}
          target="_blank"
          className="h-fit me-3 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Preview
        </a>
        <a
          href={`/portals/${portalId}/edit`}
          className="flex gap-x-2 items-center h-fit rounded-md bg-teal-600 text-white px-2.5 py-1.5 text-sm font-semibold shadow-sm hover:opacity-90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
          Open in editor
        </a>
      </div>
    </header>
  );
};
