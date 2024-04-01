import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import { SitesList } from "../components/users/SitesList";
import { PageLayout } from "../components/layout/PageLayout";
import { UsersHeader } from "../components/users/UsersHeader";
import { useParams } from "react-router";
import { UsersSiteHeader } from "../components/users/UsersSiteHeader";
import { UsersPortalHeader } from "../components/users/UsersPortalHeader";
import { PortalsList } from "../components/users/PortalsList";
import { UsersList } from "../components/users/UsersList";

export default function Users() {
  const { user } = useAuthContext();
  const { siteId, portalId } = useParams();
  const [data, setData] = useState([]);
  const [site, setSite] = useState(null);
  const [portal, setPortal] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch("/api/sites", {
          headers: {
            "x-access-token": user.token,
          },
        });

        if (response.ok) {
          const result = await response.json();

          setData(result);
        }
      } catch (error) {}
    };

    const fetchPortals = async (siteId) => {
      try {
        const response = await fetch(`/api/portals?siteId=${siteId}`, {
          headers: {
            "x-access-token": user.token,
          },
        });

        if (response.ok) {
          const result = await response.json();

          setData(result);
        }
      } catch (error) {}
    };

    const fetchPortal = async () => {
      try {
        const response = await fetch(`/api/portals/${portalId}`, {
          headers: {
            "x-access-token": user.token,
          },
        });

        if (response.ok) {
          const result = await response.json();

          setPortal(result.portal);
        }
      } catch (error) {}
    };

    const fetchSite = async (siteId) => {
      try {
        const response = await fetch(`/api/sites/${siteId}`, {
          headers: {
            "x-access-token": user.token,
          },
        });

        if (response.ok) {
          const result = await response.json();

          setSite(result);
        }
      } catch (error) {}
    };

    const fetchData = async () => {
      if (!siteId && !portalId) {
        await fetchSites();
      } else if (siteId && !portalId) {
        await fetchPortals(siteId);
        await fetchSite(siteId);
      } else {
        await fetchSite(siteId);
        await fetchPortal(portalId);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar name={"Users"} />
      <PageLayout>
        {!siteId && !portalId && <UsersHeader />}
        {!loading && siteId && !portalId && (
          <UsersSiteHeader siteDomain={site.domain} siteId={siteId} />
        )}
        {!loading && siteId && portalId && (
          <UsersPortalHeader
            siteId={siteId}
            siteDomain={site.domain}
            portalId={portalId}
            portalName={portal.name}
            count={count}
          />
        )}

        {!loading && !siteId && !portalId && <SitesList sites={data} />}
        {!loading && siteId && !portalId && (
          <PortalsList portals={data} siteId={site._id} />
        )}
        {!loading && siteId && portalId && <UsersList portalId={portalId} count={count} setCount={setCount}/>}
      </PageLayout>
    </>
  );
}
