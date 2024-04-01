import { useState } from "react";
import Navbar from "../components/Navbar";
import { SitesSection } from "../components/dashboard/SitesSection";
import { PageLayout } from "../components/layout/PageLayout";
import { UpgradePlanModal } from "../components/UpgradePlanModal";

export default function Dashboard() {
  const [openUpgradeModal, setOpenUpgradeModal] = useState(false);

  return (
    <>
      <Navbar name={"Dashboard"} />
      <UpgradePlanModal
        open={openUpgradeModal}
        setOpen={setOpenUpgradeModal}
      ></UpgradePlanModal>
      <PageLayout>
        <SitesSection />
      </PageLayout>
    </>
  );
}
