import { useContext } from "react";
import { PlansContext } from "../context/PlansContext";

export const usePlansContext = () => {
  const context = useContext(PlansContext);

  if (!context) {
    throw Error(
      "usePlansContext must be used inside must be used inside a PlansContextProvider"
    );
  }

  return context;
};