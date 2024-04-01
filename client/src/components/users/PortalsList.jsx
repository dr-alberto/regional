import DateTimeDisplay from "../DateTimeDisplay";

export const PortalsList = ({ portals, siteId }) => {
  const formatter = Intl.NumberFormat(undefined, { notation: "compact" });

  return (
    <table className="w-full border-t-2">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-800 uppercase">
            Name
          </th>
          <th className="py-3 border-b-2 text-center text-xs font-semibold text-gray-800 uppercase">
            Views
          </th>
          <th className="py-3 border-b-2 text-center text-xs font-semibold text-gray-800 uppercase">
            Signups
          </th>
          <th className="py-3 border-b-2 text-center text-xs font-semibold text-gray-800 uppercase">
            Last updated
          </th>
        </tr>
      </thead>
      <tbody>
        {portals.length > 0 && portals.map((portal, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border-b border-gray-200 text-sm relative px-5 py-3">
                <a
                  className="block h-full w-full absolute top-0 bottom-0 left-0 right-0"
                  href={`/users/${siteId}/${portal._id}`}
                ></a>
                <p class="text-gray-900 whitespace-no-wrap">{portal.name}</p>
              </td>
              <td class="border-b border-gray-200 text-sm relative py-3 text-center">
                <a
                  className="block h-full w-full absolute top-0 bottom-0 left-0 right-0"
                  href={`/users/${siteId}/${portal._id}`}
                ></a>
                <p class="text-gray-900 whitespace-no-wrap">{formatter.format(portal.views)}</p>
              </td>
              <td class="border-b border-gray-200 text-sm relative py-3 text-center">
                <a
                  className="block h-full w-full absolute top-0 bottom-0 left-0 right-0"
                  href={`/users/${siteId}/${portal._id}`}
                ></a>
                <p class="text-gray-900 whitespace-no-wrap">{formatter.format(portal.customers)}</p>
              </td>
              <td class="border-b border-gray-200 text-sm relative py-3 text-center">
                <a
                  className="block h-full w-full absolute top-0 bottom-0 left-0 right-0"
                  href={`/users/${siteId}/${portal._id}`}
                ></a>
                <DateTimeDisplay isoDatetime={portal.lastUpdated}/>
              </td>
            </tr>
          )
        )}
        {portals.length === 0  && (
          <tr className="hover:bg-gray-100">
            <td className="text-center py-2 text-gray-600" colSpan={4}>
              No portals
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
