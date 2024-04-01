import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { COUNTRIES } from "../../utils/constants";
import { UsersPagination } from "../users/UsersPagination";
import DateTimeDisplay from "../DateTimeDisplay";
import { useNavigate } from "react-router";

export const UsersList = ({ portalId, count, setCount }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);

  useEffect(() => {
    const fetchFormUsers = async () => {
      try {
        const response = await fetch(
          `/api/customers/${portalId}?page=${pageNumber}`,
          {
            headers: {
              "x-access-token": user.token,
            },
          }
        );

        const result = await response.json();

        setUsers(result.customers);
        setCount(result.total);
        setPageSize(result.pageSize);
        setTotalPages(result.totalPages);

        setFrom(pageNumber * pageSize + 1);
        setTo(Math.min((pageNumber + 1) * pageSize, count));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    navigate();
    fetchFormUsers();
  }, [pageNumber]);

  function handlePrevious(e) {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  }

  function handleNext(e) {
    if (pageNumber + 1 < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  }

  function handleFirst(e) {
    setPageNumber(0); 
  }

  function handleLast(e) {
    if (totalPages > 0) {
      setPageNumber(totalPages - 1);
    }
  }

  const countryNameById = (id) => {
    const country = COUNTRIES.filter((c) => c.id === id)[0];

    return country.name;
  };

  const countryImgById = (id) => {
    const country = COUNTRIES.filter((c) => c.id === id)[0];

    return country.img;
  };

  return (
    <>
      <table className="w-full border-t-2">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-800 uppercase">
              Name
            </th>
            <th className="py-3 border-b-2 text-left text-xs font-semibold text-gray-800 uppercase">
              Email
            </th>
            <th className="py-3 border-b-2 text-left text-xs font-semibold text-gray-800 uppercase">
              Country
            </th>
            <th className="py-3 border-b-2 text-left text-xs font-semibold text-gray-800 uppercase">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading && users.length > 0 &&
            users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border-b border-gray-200 text-sm px-5 py-3">
                    <p class="text-gray-900 whitespace-no-wrap">{user.name}</p>
                  </td>
                  <td class="border-b border-gray-200 text-sm py-3 text-left">
                    <p class="text-gray-900 whitespace-no-wrap">{user.email}</p>
                  </td>
                  <td class="border-b border-gray-200 text-sm py-3 flex items-center gap-x-2">
                    <img
                      src={countryImgById(user.country)}
                      className="h-6 w-6 rounded-lg"
                    />
                    <p class="text-gray-900 whitespace-no-wrap">
                      {countryNameById(user.country)}
                    </p>
                  </td>
                  <td class="border-b border-gray-200 text-sm py-3 text-left">
                    <DateTimeDisplay isoDatetime={user.createdAt} />
                  </td>
                </tr>
              )
            )}
            {!loading && users.length === 0  && (
              <tr className="hover:bg-gray-100">
                <td className="text-center py-2 text-gray-600" colSpan={4}>
                  No users
                </td>
              </tr>
            )}
        </tbody>
      </table>
      <UsersPagination
        handleFirst={handleFirst}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        handleLast={handleLast}
        from={from}
        to={to}
        count={count}
      />
    </>
  );
};
