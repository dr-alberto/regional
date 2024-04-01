import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import WorldMap from "../components/WorldMap";
import { useParams } from "react-router-dom";
import { EditSiteModal } from "../components/site/EditSiteModal";
import { PortalsSection } from "../components/site/PortalsSection";
import { PromptsSection } from "../components/site/PromptsSection";
import { AnalyticsGrid } from "../components/site/AnalyticsGrid";
import { PageLayout } from "../components/layout/PageLayout";
import { Header } from "../components/site/Header";

export default function Site() {
  const { siteId } = useParams();
  const { user } = useAuthContext();
  const [portals, setPortals] = useState([]);
  const [site, setSite] = useState({});
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [userPlan, setUserPlan] = useState(null);
  const [analytics, setAnalytics] = useState({
    views: 0,
    users: 0,
    conversionRate: 0,
  });
  const [countriesData, setCountriesData] = useState({});

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

    const fetchOverview = async () => {
      fetch(`/api/portals/overview?siteId=${siteId}`, {
        headers: {
          "x-access-token": user.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setAnalytics({
            views: data.views,
            users: data.submits,
            uniqueCountries: data.countriesCount.length,
          });
          setCountriesData(data.countriesCount);
          setSite(data.site);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchUserPlan();
    fetchOverview();
  }, []);

  const updatePortals = (portals) => {
    setPortals(portals);
  };

  return (
    !loading && (
      <>
        <Navbar name={"Dashboard"} />
        <EditSiteModal
          site={site}
          open={openEdit}
          setOpen={setOpenEdit}
          userPlan={userPlan}
        ></EditSiteModal>
        <PageLayout>
          <Header siteDomain={site.domain} onOpen={(e) => setOpenEdit(true)} />
          <WorldMap data={countriesData}></WorldMap>
          <AnalyticsGrid data={analytics} />
          <PortalsSection portals={portals} updatePortals={updatePortals} />
          <PromptsSection portals={portals}></PromptsSection>
        </PageLayout>
      </>
    )
  );
}
