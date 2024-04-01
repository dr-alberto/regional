import { useEffect } from "react";

export default function PaymentSuccess() {
  useEffect(() => {
    window.location.href = "/billing";
  }, []);

  return (
    <>
      Payment success:
      <a href="/billing">Continue</a>
    </>
  );
}