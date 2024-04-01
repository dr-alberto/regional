import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import WorldMap from "../components/WorldMap";
import { useParams } from "react-router-dom";
import { AnalyticsGrid } from "../components/site/AnalyticsGrid";
import { PageLayout } from "../components/layout/PageLayout";
import { Header } from "../components/viewPortal/Header";

export default function ViewPortal() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [portal, setPortal] = useState([]);
  const [site, setSite] = useState({});
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    views: 0,
    users: 0,
    conversionRate: 0,
  });
  const [countriesData, setCountriesData] = useState({});

  useEffect(() => {
    const fetchOverview = async () => {
      fetch(`/api/portals/${id}/overview`, {
        headers: {
          "x-access-token": user.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setAnalytics({
            views: data.portal.views,
            users: data.portal.customers,
            uniqueCountries: data.countriesCount.length,
          });
          setCountriesData(data.countriesCount);
          setSite(data.site);
          setPortal(data.portal);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchOverview();
  }, []);

  return (
    !loading && (
      <>
        <Navbar name={"Dashboard"} />
        <PageLayout>
          <Header
            siteId={site._id}
            siteDomain={site.domain}
            portalName={portal.name}
            portalId={id}
          />
          <WorldMap data={countriesData}></WorldMap>
          <AnalyticsGrid data={analytics} />
        </PageLayout>
      </>
    )
  );
}
