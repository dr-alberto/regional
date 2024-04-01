export const SitesList = ({ sites }) => {
  return (
    <table className="w-full border-t-2">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-800 uppercase">
            Domain
          </th>
          <th className="py-3 border-b-2 text-center text-xs font-semibold text-gray-800 uppercase">
            Portals
          </th>
          <th className="py-3 border-b-2 text-center text-xs font-semibold text-gray-800 uppercase">
            Prompts
          </th>
        </tr>
      </thead>
      <tbody>
        {sites.length > 0 &&
          sites.map((site, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border-b border-gray-200 text-sm relative px-5 py-3">
                <a
                  className="block h-full w-full absolute top-0 bottom-0 left-0 right-0"
                  href={`/users/${site._id}`}
                ></a>
                <div className="flex">
                  <span className="text-gray-500">https://</span>
                  <p class="text-gray-900 whitespace-no-wrap">{site.domain}</p>
                </div>
              </td>
              <td class="border-b border-gray-200 text-sm relative py-3 text-center">
                <a
                  className="block h-full w-full absolute top-0 bottom-0 left-0 right-0"
                  href={`/users/${site._id}`}
                ></a>
                <p class="text-gray-900 whitespace-no-wrap">{site.portals}</p>
              </td>
              <td class="border-b border-gray-200 text-sm relative py-3 text-center">
                <a
                  className="block h-full w-full absolute top-0 bottom-0 left-0 right-0"
                  href={`/users/${site._id}`}
                ></a>
                <p class="text-gray-900 whitespace-no-wrap">{site.prompts}</p>
              </td>
            </tr>
          ))}
        {sites.length === 0 && (
          <tr className="hover:bg-gray-100">
            <td className="text-center py-2 text-gray-600" colSpan={4}>
              No sites
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
