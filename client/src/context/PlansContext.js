import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const PlansContext = createContext();

export const PlansContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  // TODO: On Login: error on plans.startup not present (loading is false *before* the state of plans has been updated)
  const [plans, setPlans] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlansData = () => {
      fetch("/api/config", {
        headers: {
          "x-access-token": user.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPlans({
            startup: {
              yearly: data.yearly.priceStarter,
              monthly: data.monthly.priceStarter,
            },
            expansion: {
              yearly: data.yearly.priceExpansion,
              monthly: data.monthly.priceExpansion,
            },
            growth: {
              yearly: data.yearly.priceGrowth,
              monthly: data.monthly.priceGrowth,
            },
          });
        })
        .catch((error) => {
          console.log("Error loading plans context");
        })
        .finally(() => setLoading(false));
    };

    if (user) {
      fetchPlansData();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    !loading && (
      <PlansContext.Provider value={{ plans }}>
        {children}
      </PlansContext.Provider>
    )
  );
};
